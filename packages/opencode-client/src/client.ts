export interface OpenCodeClientOptions {
  baseUrl: string;
  password: string;
  directory?: string;
}

export interface OpenCodeMessageOptions {
  sessionId: string;
  content: string;
  files?: string[];
  agent?: string;
}

export class OpenCodeClient {
  private baseUrl: string;
  private authHeader: string;
  private directory: string;

  constructor(options: OpenCodeClientOptions) {
    this.baseUrl = options.baseUrl.replace(/\/$/, '');
    this.authHeader = `Basic ${btoa(`opencode:${options.password}`)}`;
    this.directory = options.directory ?? '/workspace';
  }

  async createSession(): Promise<{ id: string }> {
    const response = await fetch(`${this.baseUrl}/session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.authHeader
      },
      body: JSON.stringify({})
    });

    if (!response.ok) {
      throw new Error(`OpenCode session create failed: ${response.status}`);
    }

    return (await response.json()) as { id: string };
  }

  async *streamMessage(options: OpenCodeMessageOptions): AsyncGenerator<string> {
    const response = await fetch(`${this.baseUrl}/session/${options.sessionId}/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.authHeader,
        'x-opencode-directory': this.directory
      },
      body: JSON.stringify({
        agent: options.agent ?? 'build',
        parts: [
          { type: 'text', text: options.content },
          ...(options.files ?? []).map((file) => ({ type: 'file', path: file }))
        ]
      })
    });

    if (!response.ok || !response.body) {
      throw new Error(`OpenCode message failed: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      yield decoder.decode(value);
    }
  }

  async sendMessage(options: OpenCodeMessageOptions): Promise<string> {
    let output = '';
    for await (const chunk of this.streamMessage(options)) {
      output += chunk;
    }
    return output;
  }
}
