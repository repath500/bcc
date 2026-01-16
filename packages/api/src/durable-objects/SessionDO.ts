import type { Message, QueuedMessage, Session } from '@inspect/shared';
import { generateMessageId } from '@inspect/shared';
import type { Env } from '../types';

interface ConnectionMeta {
  userId: string;
  username: string;
}

export class SessionDO {
  private ctx: DurableObjectState;
  private env: Env;
  private connections = new Map<WebSocket, ConnectionMeta>();
  private session: Session | null = null;
  private isExecuting = false;

  constructor(ctx: DurableObjectState, env: Env) {
    this.ctx = ctx;
    this.env = env;

    this.ctx.blockConcurrencyWhile(async () => {
      await this.initializeDatabase();
      await this.loadSessionState();
    });
  }

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (request.headers.get('Upgrade') === 'websocket') {
      return this.handleWebSocket(request);
    }

    switch (url.pathname) {
      case '/initialize':
        return this.handleInitialize(request);
      case '/messages':
        return this.handleGetMessages(request);
      case '/send':
        return this.handleSendMessage(request);
      case '/status':
        return this.handleStatus();
      case '/queue':
        return this.handleQueue();
      case '/stop':
        return this.handleStop();
      case '/close':
        return this.handleClose();
      default:
        return new Response('Not found', { status: 404 });
    }
  }

  async webSocketMessage(ws: WebSocket, message: string | ArrayBuffer): Promise<void> {
    const meta = this.connections.get(ws);
    if (!meta) return;

    const payload = JSON.parse(message as string) as {
      type: string;
      content?: string;
      files?: string[];
    };

    if (payload.type === 'send_message') {
      await this.handleIncomingMessage(meta.userId, meta.username, payload.content ?? '', payload.files);
    }

    if (payload.type === 'typing') {
      this.broadcastToOthers(meta.userId, { type: 'user_typing', userId: meta.userId });
    }
  }

  async webSocketClose(ws: WebSocket): Promise<void> {
    const meta = this.connections.get(ws);
    if (!meta) return;

    this.connections.delete(ws);
    this.broadcast({ type: 'participant_left', userId: meta.userId, participants: this.getParticipantIds() });
  }

  private async initializeDatabase(): Promise<void> {
    await this.ctx.storage.sql.exec(`
      CREATE TABLE IF NOT EXISTS messages (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        role TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at INTEGER NOT NULL,
        parent_id TEXT
      );

      CREATE TABLE IF NOT EXISTS queued_messages (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        username TEXT NOT NULL,
        content TEXT NOT NULL,
        files TEXT,
        queued_at INTEGER NOT NULL,
        status TEXT DEFAULT 'pending'
      );

      CREATE TABLE IF NOT EXISTS session_meta (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      );
    `);
  }

  private async loadSessionState(): Promise<void> {
    const result = this.ctx.storage.sql
      .exec<{ value: string }>('SELECT value FROM session_meta WHERE key = ?', 'session')
      .toArray();

    if (result.length > 0) {
      this.session = JSON.parse(result[0].value);
    }
  }

  private async handleInitialize(request: Request): Promise<Response> {
    const body = (await request.json()) as {
      sessionId: string;
      userId: string;
      repoUrl: string;
      branch: string;
      sandboxId: string;
      sandboxUrl?: string;
      opencodeSessionId: string;
      installationId?: number;
    };

    const installationId = typeof body.installationId === 'number' ? body.installationId : 0;

    this.session = {
      id: body.sessionId,
      userId: body.userId,
      repoUrl: body.repoUrl,
      branch: body.branch,
      sandboxId: body.sandboxId,
      opencodeSessionId: body.opencodeSessionId,
      status: 'ready',
      createdAt: Date.now(),
      lastActiveAt: Date.now(),
      metadata: {
        repoOwner: body.repoUrl?.split('/')[3] ?? '',
        repoName: body.repoUrl?.split('/')[4] ?? '',
        installationId,
        commitCount: 0,
        sandboxUrl: body.sandboxUrl
      }
    };

    await this.saveSession();

    return Response.json({ success: true, session: this.session });
  }

  private async handleWebSocket(request: Request): Promise<Response> {
    const pair = new WebSocketPair();
    const [client, server] = Object.values(pair);

    const userId = request.headers.get('X-User-ID') ?? 'anonymous';
    const username = request.headers.get('X-Username') ?? 'Anonymous';

    this.ctx.acceptWebSocket(server);
    this.connections.set(server, { userId, username });

    this.broadcast({ type: 'participant_joined', userId, username, participants: this.getParticipantIds() });

    this.sendInitialState(server);

    return new Response(null, { status: 101, webSocket: client });
  }

  private async handleGetMessages(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const limit = Number(url.searchParams.get('limit') ?? '100');

    const rows = this.ctx.storage.sql
      .exec<{
        id: string;
        userId: string;
        role: Message['role'];
        content: string;
        createdAt: number;
        parentId?: string | null;
      }>(
        'SELECT id, user_id as userId, role, content, created_at as createdAt, parent_id as parentId FROM messages ORDER BY created_at DESC LIMIT ?',
        limit
      )
      .toArray()
      .reverse();

    const messages = rows.map((row) => ({
      ...row,
      sessionId: this.session?.id ?? ''
    }));

    return Response.json({ messages });
  }

  private async handleSendMessage(request: Request): Promise<Response> {
    const body = (await request.json()) as {
      userId: string;
      username: string;
      content: string;
      files?: string[];
    };
    await this.handleIncomingMessage(body.userId, body.username, body.content, body.files);

    return Response.json({ queued: this.isExecuting });
  }

  private handleStatus(): Response {
    return Response.json({
      session: this.session,
      isExecuting: this.isExecuting,
      participants: this.getParticipantIds()
    });
  }

  private handleQueue(): Response {
    const queue = this.ctx.storage.sql
      .exec<{ id: string; userId: string; username: string; content: string; queuedAt: number }>(
        "SELECT id, user_id as userId, username, content, queued_at as queuedAt FROM queued_messages WHERE status = 'pending' ORDER BY queued_at"
      )
      .toArray()
      .map((item, index) => ({ ...item, position: index + 1 }));

    return Response.json({ queue });
  }

  private handleStop(): Response {
    this.isExecuting = false;
    return Response.json({ success: true });
  }

  private async handleClose(): Promise<Response> {
    for (const ws of this.connections.keys()) {
      ws.close(1000, 'Session closed');
    }
    this.connections.clear();

    if (this.session) {
      this.session.status = 'closed';
      await this.saveSession();
    }

    return Response.json({ success: true });
  }

  private async handleIncomingMessage(
    userId: string,
    username: string,
    content: string,
    files?: string[]
  ): Promise<void> {
    const messageId = generateMessageId();
    const createdAt = Date.now();

    await this.ctx.storage.sql.exec(
      `INSERT INTO messages (id, user_id, role, content, created_at) VALUES (?, ?, 'user', ?, ?)`
    , messageId, userId, content, createdAt);

    this.broadcast({
      type: 'message',
      message: {
        id: messageId,
        sessionId: this.session?.id ?? '',
        userId,
        role: 'user',
        content,
        createdAt
      }
    });

    if (this.isExecuting) {
      await this.queueMessage(messageId, userId, username, content, files);
      return;
    }

    await this.executeMessage(messageId, content, files);
  }

  private async executeMessage(messageId: string, content: string, files?: string[]): Promise<void> {
    if (!this.session?.metadata.sandboxUrl) return;

    this.isExecuting = true;
    this.broadcast({ type: 'execution_started', messageId });

    try {
      const sandboxUrl = this.session.metadata.sandboxUrl;
      const auth = btoa(`opencode:${this.env.OPENCODE_SERVER_PASSWORD}`);

      const response = await fetch(
        `${sandboxUrl}/session/${this.session.opencodeSessionId}/message`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${auth}`,
            'x-opencode-directory': '/workspace'
          },
          body: JSON.stringify({
            agent: 'build',
            parts: [
              { type: 'text', text: content },
              ...(files ?? []).map((file) => ({ type: 'file', path: file }))
            ]
          })
        }
      );

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      const assistantId = generateMessageId();
      let assistantContent = '';

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        assistantContent += chunk;

        this.broadcast({
          type: 'message_chunk',
          messageId: assistantId,
          chunk,
          accumulated: assistantContent
        });
      }

      await this.ctx.storage.sql.exec(
        `INSERT INTO messages (id, user_id, role, content, created_at, parent_id) VALUES (?, 'assistant', 'assistant', ?, ?, ?)`
      , assistantId, assistantContent, Date.now(), messageId);

      this.broadcast({ type: 'execution_complete', messageId: assistantId });
    } catch (error) {
      this.broadcast({ type: 'execution_error', error: (error as Error).message });
    } finally {
      this.isExecuting = false;
      await this.processQueuedMessages();
    }
  }

  private async queueMessage(
    messageId: string,
    userId: string,
    username: string,
    content: string,
    files?: string[]
  ): Promise<void> {
    await this.ctx.storage.sql.exec(
      `INSERT INTO queued_messages (id, user_id, username, content, files, queued_at) VALUES (?, ?, ?, ?, ?, ?)`
    , messageId, userId, username, content, JSON.stringify(files ?? []), Date.now());

    const count = this.ctx.storage.sql
      .exec<{ count: number }>("SELECT COUNT(*) as count FROM queued_messages WHERE status = 'pending'")
      .toArray()[0]?.count ?? 1;

    this.broadcast({ type: 'message_queued', messageId, position: count });
  }

  private async processQueuedMessages(): Promise<void> {
    const next = this.ctx.storage.sql
      .exec<{ id: string; user_id: string; content: string; files: string }>(
        "SELECT id, user_id, content, files FROM queued_messages WHERE status = 'pending' ORDER BY queued_at LIMIT 1"
      )
      .toArray();

    if (next.length === 0) return;

    await this.ctx.storage.sql.exec(
      "UPDATE queued_messages SET status = 'processing' WHERE id = ?",
      next[0].id
    );

    await this.executeMessage(next[0].id, next[0].content, JSON.parse(next[0].files ?? '[]'));

    await this.ctx.storage.sql.exec(
      "UPDATE queued_messages SET status = 'complete' WHERE id = ?",
      next[0].id
    );
  }

  private async saveSession(): Promise<void> {
    if (!this.session) return;

    await this.ctx.storage.sql.exec(
      `INSERT OR REPLACE INTO session_meta (key, value) VALUES ('session', ?)`
    , JSON.stringify(this.session));
  }

  private sendInitialState(ws: WebSocket): void {
    ws.send(
      JSON.stringify({
        type: 'initial_state',
        session: this.session,
        isExecuting: this.isExecuting
      })
    );
  }

  private getParticipantIds(): string[] {
    return Array.from(this.connections.values()).map((meta) => meta.userId);
  }

  private broadcast(payload: unknown): void {
    const message = JSON.stringify(payload);
    for (const ws of this.connections.keys()) {
      ws.send(message);
    }
  }

  private broadcastToOthers(userId: string, payload: unknown): void {
    const message = JSON.stringify(payload);
    for (const [ws, meta] of this.connections.entries()) {
      if (meta.userId !== userId) {
        ws.send(message);
      }
    }
  }
}
