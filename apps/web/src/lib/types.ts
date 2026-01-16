export type Role = 'user' | 'assistant' | 'system' | 'tool';

export interface MessageAttachment {
  id: string;
  type: 'image' | 'file';
  name: string;
  url: string;
  previewUrl?: string;
}

export interface SlackPreview {
  channel: string;
  text: string;
  status?: 'draft' | 'posted';
}

export interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  createdAt: number;
  source?: 'web' | 'slack' | 'chrome' | 'agent';
  systemAction?: string;
  attachments?: MessageAttachment[];
  slackPreview?: SlackPreview;
  slackPosted?: boolean;
}

export interface SessionCreateRequest {
  repoUrl: string;
  branch: string;
  installationId?: number | string;
}

export interface SessionCreateResponse {
  sessionId: string;
  status: string;
  sandboxUrl?: string;
  vscodeUrl?: string;
}

export interface SessionStatusResponse {
  session: unknown;
  isExecuting: boolean;
  participants: string[];
}

export interface SessionMessageResponse {
  messages: ChatMessage[];
}

export interface QueueItem {
  id: string;
  userId: string;
  username: string;
  content: string;
  queuedAt: number;
  position: number;
}

export interface RepoSummary {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  clone_url: string;
  owner: {
    login: string;
    avatar_url?: string;
  };
}

export type SessionEvent =
  | { type: 'initial_state'; session: unknown; isExecuting: boolean }
  | { type: 'message'; message: ChatMessage }
  | { type: 'message_chunk'; messageId: string; chunk: string; accumulated: string }
  | { type: 'execution_started'; messageId: string }
  | { type: 'execution_complete'; messageId: string }
  | { type: 'execution_error'; error: string }
  | { type: 'message_queued'; messageId: string; position: number }
  | { type: 'queue_updated'; queue: QueueItem[] }
  | { type: 'participant_joined'; userId: string; username: string; participants: string[] }
  | { type: 'participant_left'; userId: string; participants: string[] }
  | { type: 'user_typing'; userId: string };
