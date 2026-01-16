'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  createSession,
  fetchMessages,
  fetchQueue,
  fetchSessionStatus,
  openSessionSocket,
  sendMessage
} from '@/lib/api';
import type { ChatMessage, QueueItem, SessionEvent } from '@/lib/types';
import { ChatInput } from '@/components/ChatInput';
import { ChatMessage as ChatBubble } from '@/components/ChatMessage';

const randomName = () => {
  const adjectives = ['Brisk', 'Bright', 'Sharp', 'Curious', 'Bold', 'Swift'];
  const nouns = ['Fox', 'Falcon', 'Tiger', 'Orchid', 'Comet', 'Harbor'];
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${
    nouns[Math.floor(Math.random() * nouns.length)]
  }`;
};

const demoSessions = [
  {
    id: 'session-alpha',
    title: 'Trip editing UX flow with screenshots',
    repo: 'ramp/inspect-web',
    ticket: 'web-agent-idle-1578',
    status: 'active',
    updatedAt: '2d'
  },
  {
    id: 'session-beta',
    title: 'Update disclaimer text in Ramp Assist',
    repo: 'ramp/assist',
    ticket: 'web-47724',
    status: 'active',
    updatedAt: '4d'
  },
  {
    id: 'session-gamma',
    title: 'Investigate Celery worker retry loop',
    repo: 'ramp/core',
    ticket: 'core-7501',
    status: 'inactive',
    updatedAt: '6d'
  },
  {
    id: 'session-delta',
    title: 'Listing AI Alpha feature flags',
    repo: 'ramp/alpha',
    ticket: 'web-76009',
    status: 'inactive',
    updatedAt: '12d'
  }
];

const demoMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    role: 'assistant',
    content: 'Exploring other features in the app to document UX flows and test for visual bugs with edge cases.',
    createdAt: Date.now() - 1000 * 60 * 12,
    source: 'agent'
  },
  {
    id: 'msg-2',
    role: 'system',
    content: '',
    createdAt: Date.now() - 1000 * 60 * 11,
    systemAction: 'Chrome devtools take snapshot'
  },
  {
    id: 'msg-3',
    role: 'assistant',
    content: 'I am on the Bill Pay page. Capturing a snapshot and then exploring editing a bill.',
    createdAt: Date.now() - 1000 * 60 * 10,
    attachments: [
      {
        id: 'att-1',
        type: 'image',
        name: 'screenshot-bill-pay.png',
        url: 'https://placehold.co/720x420/png?text=Screenshot'
      }
    ]
  },
  {
    id: 'msg-4',
    role: 'assistant',
    content: 'Posting the snapshot to Slack with a quick summary and next steps.',
    createdAt: Date.now() - 1000 * 60 * 8,
    slackPreview: {
      channel: '#inspect-updates',
      text: 'Captured Bill Pay flow. Next: edit a bill with edge-case amounts.'
    }
  },
  {
    id: 'msg-5',
    role: 'user',
    content: 'Keep exploring, and capture any bug-worthy UI states.',
    createdAt: Date.now() - 1000 * 60 * 5,
    source: 'web'
  }
];

const demoQueue: QueueItem[] = [
  {
    id: 'queue-1',
    userId: 'user-1',
    username: 'Riya',
    content: 'Audit recent UX flows and collect snapshots.',
    queuedAt: Date.now() - 1000 * 60 * 2,
    position: 1
  }
];

const metricCards = [
  { label: 'Merges past week', value: '1,307', trend: '+12%' },
  { label: 'Authors past week', value: '202', trend: '+8%' },
  { label: 'Humans past week', value: '275', trend: '+4%' },
  { label: 'Merge rate', value: '94%', trend: '+2%' }
];

const automationEvents = [
  { id: 'auto-1', label: 'Chrome devtools click', time: '2m ago' },
  { id: 'auto-2', label: 'Chrome devtools take snapshot', time: '4m ago' },
  { id: 'auto-3', label: 'Chrome devtools wait for idle', time: '6m ago' }
];

const taskChecklist = [
  { id: 'task-1', label: 'Explore Bill Pay feature and document flows', done: true },
  { id: 'task-2', label: 'Test edge cases with unusual data', done: false },
  { id: 'task-3', label: 'Report any visual bugs', done: false }
];

const projectTags = ['Ramp Inspect', 'Payments', 'UX Review'];

const filePaths = ['apps/web/src/app/page.tsx', 'packages/api/src/routes/sessions.ts'];

export default function Home() {
  const socketRef = useRef<WebSocket | null>(null);
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [branch, setBranch] = useState('main');
  const [installationId, setInstallationId] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [status, setStatus] = useState('Idle');
  const [sandboxUrl, setSandboxUrl] = useState<string | null>(null);
  const [vscodeUrl, setVscodeUrl] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionQuery, setSessionQuery] = useState('');
  const [selectedSession, setSelectedSession] = useState<string>('session-alpha');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedId = window.localStorage.getItem('inspect_user_id');
    const storedName = window.localStorage.getItem('inspect_username');
    const nextId = storedId ?? `user_${crypto.randomUUID().slice(0, 8)}`;
    const nextName = storedName ?? randomName();
    window.localStorage.setItem('inspect_user_id', nextId);
    window.localStorage.setItem('inspect_username', nextName);
    setUserId(nextId);
    setUsername(nextName);
  }, []);

  const ready = useMemo(() => Boolean(userId && username), [userId, username]);

  const refreshQueue = async (currentSessionId = sessionId) => {
    if (!currentSessionId || !ready) return;
    const items = await fetchQueue(currentSessionId, userId, username);
    setQueue(items);
  };

  const applyEvent = (event: SessionEvent) => {
    if (event.type === 'message') {
      setMessages((prev) => [...prev, event.message]);
    }

    if (event.type === 'message_chunk') {
      setMessages((prev) => {
        const index = prev.findIndex((msg) => msg.id === event.messageId);
        if (index === -1) {
          return [
            ...prev,
            { id: event.messageId, role: 'assistant', content: event.accumulated, createdAt: Date.now() }
          ];
        }
        const next = [...prev];
        next[index] = { ...next[index], content: event.accumulated };
        return next;
      });
    }

    if (event.type === 'execution_started') {
      setIsExecuting(true);
      setStatus('Executing');
    }

    if (event.type === 'execution_complete') {
      setIsExecuting(false);
      setStatus('Ready');
    }

    if (event.type === 'execution_error') {
      setIsExecuting(false);
      setStatus('Error');
      setError(event.error);
    }

    if (event.type === 'message_queued' || event.type === 'queue_updated') {
      refreshQueue();
    }

    if (event.type === 'initial_state') {
      setIsExecuting(event.isExecuting);
    }
  };

  const handleCreateSession = async () => {
    if (!ready) return;
    setIsCreating(true);
    setError(null);
    setStatus('Starting');

    try {
      const payload = {
        repoUrl,
        branch,
        installationId: installationId ? Number(installationId) : undefined
      };

      const response = await createSession(payload, userId, username);
      setSessionId(response.sessionId);
      setSandboxUrl(response.sandboxUrl ?? null);
      setVscodeUrl(response.vscodeUrl ?? null);
      setStatus(response.status ?? 'ready');

      const messageResponse = await fetchMessages(response.sessionId, userId, username);
      setMessages(messageResponse.messages);

      await refreshQueue(response.sessionId);

      const socket = openSessionSocket(response.sessionId, userId, username, applyEvent);
      socketRef.current?.close();
      socketRef.current = socket;

      const statusResponse = await fetchSessionStatus(response.sessionId, userId, username);
      setIsExecuting(statusResponse.isExecuting);
    } catch (err) {
      setError((err as Error).message);
      setStatus('Error');
    } finally {
      setIsCreating(false);
    }
  };

  const handleSend = async (content: string) => {
    if (!sessionId) return;
    setError(null);
    await sendMessage(sessionId, content, userId, username);
  };

  useEffect(() => {
    if (!sessionId || !ready) return;
    const socket = openSessionSocket(sessionId, userId, username, applyEvent);
    socketRef.current?.close();
    socketRef.current = socket;

    const interval = window.setInterval(() => refreshQueue(sessionId), 5000);

    return () => {
      socket.close();
      window.clearInterval(interval);
    };
  }, [sessionId, ready, userId, username]);

  const filteredSessions = demoSessions.filter((session) =>
    session.title.toLowerCase().includes(sessionQuery.toLowerCase())
  );
  const chatMessages = messages.length > 0 ? messages : demoMessages;
  const queueItems = queue.length > 0 ? queue : demoQueue;

  return (
    <main className="page">
      <aside className="panel session-panel">
        <div className="session-header">
          <div>
            <p className="eyebrow">Inspect</p>
            <h1>Sessions</h1>
          </div>
          <div className="operator-chip">
            <span className="avatar" />
            <div>
              <p className="label">Operator</p>
              <p className="value">{username || '...'}</p>
            </div>
          </div>
        </div>
        <label className="field search-field">
          <span>Search sessions</span>
          <input
            value={sessionQuery}
            onChange={(event) => setSessionQuery(event.target.value)}
            placeholder="Search sessions..."
          />
        </label>
        <div className="session-group">
          <p className="label">Active</p>
          <div className="session-list">
            {filteredSessions
              .filter((session) => session.status === 'active')
              .map((session) => (
                <button
                  key={session.id}
                  type="button"
                  className={`session-card ${selectedSession === session.id ? 'selected' : ''}`}
                  onClick={() => setSelectedSession(session.id)}
                >
                  <div>
                    <p className="session-title">{session.title}</p>
                    <p className="session-meta">{session.repo}</p>
                  </div>
                  <div className="session-meta-right">
                    <span className="session-ticket">{session.ticket}</span>
                    <span className="session-time">{session.updatedAt}</span>
                  </div>
                </button>
              ))}
          </div>
        </div>
        <div className="session-group">
          <p className="label">Inactive</p>
          <div className="session-list">
            {filteredSessions
              .filter((session) => session.status === 'inactive')
              .map((session) => (
                <button
                  key={session.id}
                  type="button"
                  className={`session-card ${selectedSession === session.id ? 'selected' : ''}`}
                  onClick={() => setSelectedSession(session.id)}
                >
                  <div>
                    <p className="session-title">{session.title}</p>
                    <p className="session-meta">{session.repo}</p>
                  </div>
                  <div className="session-meta-right">
                    <span className="session-ticket">{session.ticket}</span>
                    <span className="session-time">{session.updatedAt}</span>
                  </div>
                </button>
              ))}
          </div>
        </div>
      </aside>

      <section className="panel main-panel">
        <header className="main-header">
          <div>
            <p className="eyebrow">Live Session</p>
            <h2>Trip editing UX flow with screenshots</h2>
            <p className="hero-subtitle">
              Inspect agents working across web, Slack, and Chrome with full execution visibility.
            </p>
          </div>
          <div className="status-pill-row">
            <div>
              <p className="label">Session</p>
              <p className="value">{sessionId ?? 'Not started'}</p>
            </div>
            <div className={`status-pill ${isExecuting ? 'live' : ''}`}>
              {isExecuting ? 'Executing' : status}
            </div>
          </div>
        </header>

        <div className="metric-grid">
          {metricCards.map((metric) => (
            <article key={metric.label} className="metric-card">
              <p className="label">{metric.label}</p>
              <p className="metric-value">{metric.value}</p>
              <div className="metric-trend">
                <span>{metric.trend}</span>
                <div className="metric-chart" />
              </div>
            </article>
          ))}
          <article className="metric-card highlight">
            <p className="label">Humans prompting</p>
            <p className="metric-value">18</p>
            <p className="metric-note">Live counter</p>
          </article>
        </div>

        <section className="chat-panel">
          <header className="panel-header">
            <div>
              <p className="label">Conversation</p>
              <h3>Agent stream</h3>
            </div>
            <div className="chat-actions">
              <button type="button" className="ghost-button">
                Capture screenshot
              </button>
              <button type="button" className="ghost-button">
                Post to Slack
              </button>
            </div>
          </header>
          <div className="chat-stream">
            {chatMessages.map((message) => (
              <ChatBubble key={message.id} message={message} />
            ))}
          </div>
          <div className="chat-controls">
            <ChatInput disabled={!sessionId} onSend={handleSend} />
            <div className="input-tools">
              <button type="button" className="icon-button">
                🎙️ Voice
              </button>
              <button type="button" className="icon-button">
                📎 Attach
              </button>
              <button type="button" className="icon-button">
                ⚡ Build agent
              </button>
            </div>
          </div>
        </section>

        <section className="automation-panel">
          <header className="panel-header">
            <div>
              <p className="label">Browser automation</p>
              <h3>Devtools actions</h3>
            </div>
            <span className="status-pill live">Live</span>
          </header>
          <div className="automation-list">
            {automationEvents.map((event) => (
              <div key={event.id} className="automation-item">
                <span className="automation-dot" />
                <div>
                  <p className="automation-label">{event.label}</p>
                  <p className="automation-time">{event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>

      <aside className="panel sidebar-panel">
        <div className="sidebar-block">
          <p className="label">Model + mode</p>
          <div className="select-row">
            <button type="button" className="pill">Claude Opus 4.5</button>
            <button type="button" className="pill secondary">Build Agent</button>
          </div>
        </div>

        <div className="sidebar-block">
          <p className="label">Participants</p>
          <div className="participant-list">
            {['Riya', 'Tom', 'Inspect Bot'].map((name) => (
              <div key={name} className="participant">
                <span className="avatar" />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="sidebar-block">
          <p className="label">Branch / PR</p>
          <div className="meta-card">
            <p>branch: {branch}</p>
            <p>PR: ramp/inspect-web#77214</p>
            <p>repo: ramp/inspect-web</p>
          </div>
        </div>

        <div className="sidebar-block">
          <p className="label">Task checklist</p>
          <div className="checklist">
            {taskChecklist.map((task) => (
              <label key={task.id} className="check-row">
                <input type="checkbox" checked={task.done} readOnly />
                <span>{task.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="sidebar-block">
          <p className="label">Project tags</p>
          <div className="tag-row">
            {projectTags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="sidebar-block">
          <p className="label">Touched files</p>
          <div className="file-list">
            {filePaths.map((path) => (
              <span key={path} className="file-chip">
                {path}
              </span>
            ))}
          </div>
        </div>

        <div className="sidebar-block">
          <p className="label">Queue</p>
          <div className="queue-list compact">
            {queueItems.map((item) => (
              <article key={item.id} className="queue-item">
                <span className="queue-position">#{item.position}</span>
                <div>
                  <p className="queue-content">{item.content}</p>
                  <p className="queue-meta">{item.username}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="sidebar-block">
          <p className="label">Sandbox controls</p>
          <div className="form-grid">
            <label className="field">
              <span>Repository URL</span>
              <input
                value={repoUrl}
                onChange={(event) => setRepoUrl(event.target.value)}
                placeholder="https://github.com/owner/repo"
              />
            </label>
            <label className="field">
              <span>Branch</span>
              <input value={branch} onChange={(event) => setBranch(event.target.value)} />
            </label>
            <label className="field">
              <span>GitHub Installation ID</span>
              <input
                value={installationId}
                onChange={(event) => setInstallationId(event.target.value)}
                placeholder="12345678"
              />
            </label>
          </div>
          <div className="actions">
            <button type="button" onClick={handleCreateSession} disabled={!repoUrl || isCreating}>
              {isCreating ? 'Starting...' : 'Start Session'}
            </button>
            <div className="links">
              {sandboxUrl && (
                <a href={sandboxUrl} target="_blank" rel="noreferrer">
                  Open OpenCode
                </a>
              )}
              {vscodeUrl && (
                <a href={vscodeUrl} target="_blank" rel="noreferrer">
                  Open VS Code
                </a>
              )}
            </div>
          </div>
          {error && <p className="error">{error}</p>}
        </div>
      </aside>
    </main>
  );
}
