export interface Message {
  id: string;
  sessionId: string;
  userId: string;
  role: 'user' | 'assistant' | 'system' | 'tool';
  content: string;
  type?: 'text' | 'code' | 'diff' | 'screenshot' | 'error' | 'thinking';
  metadata?: MessageMetadata;
  parentId?: string;
  createdAt: number;
}

export interface MessageMetadata {
  toolName?: string;
  toolInput?: Record<string, unknown>;
  toolOutput?: string;
  filePath?: string;
  language?: string;
  diffBefore?: string;
  diffAfter?: string;
  screenshotUrl?: string;
  thinkingContent?: string;
}
