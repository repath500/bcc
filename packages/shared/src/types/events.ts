import type { Message } from './message';
import type { Participant } from './user';

export interface QueuedMessage {
  id: string;
  userId: string;
  username: string;
  content: string;
  queuedAt: number;
  position: number;
}

export type SessionEvent =
  | { type: 'message'; message: Message }
  | { type: 'message_chunk'; messageId: string; chunk: string; accumulated: string }
  | { type: 'execution_started'; messageId: string }
  | { type: 'execution_complete'; messageId: string }
  | { type: 'execution_error'; error: string }
  | { type: 'message_queued'; messageId: string; position: number }
  | { type: 'queue_updated'; queue: QueuedMessage[] }
  | { type: 'participant_joined'; userId: string; username: string; participants: string[] }
  | { type: 'participant_left'; userId: string; participants: string[] }
  | { type: 'user_typing'; userId: string }
  | { type: 'tool_execution'; tool: string; status: 'started' | 'completed' | 'error' }
  | { type: 'file_changed'; path: string; changeType: 'created' | 'modified' | 'deleted' }
  | { type: 'pr_created'; prUrl: string; prNumber: number }
  | { type: 'pr_updated'; prUrl: string; status: string }
  | { type: 'participants_sync'; participants: Participant[] };
