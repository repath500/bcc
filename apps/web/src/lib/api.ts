import type {
  SessionCreateRequest,
  SessionCreateResponse,
  SessionMessageResponse,
  SessionStatusResponse,
  SessionEvent,
  QueueItem
} from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'http://localhost:8787';
const WS_BASE = API_BASE.replace(/^http/, 'ws');

const withAuthHeaders = (userId: string, username: string) => ({
  'Content-Type': 'application/json',
  'x-user-id': userId,
  'x-username': username
});

export const createSession = async (
  payload: SessionCreateRequest,
  userId: string,
  username: string
): Promise<SessionCreateResponse> => {
  const response = await fetch(`${API_BASE}/api/sessions`, {
    method: 'POST',
    headers: withAuthHeaders(userId, username),
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error('Failed to create session');
  }

  return (await response.json()) as SessionCreateResponse;
};

export const fetchMessages = async (
  sessionId: string,
  userId: string,
  username: string
): Promise<SessionMessageResponse> => {
  const response = await fetch(`${API_BASE}/api/sessions/${sessionId}/messages`, {
    headers: withAuthHeaders(userId, username)
  });

  if (!response.ok) {
    throw new Error('Failed to fetch messages');
  }

  return (await response.json()) as SessionMessageResponse;
};

export const fetchQueue = async (
  sessionId: string,
  userId: string,
  username: string
): Promise<QueueItem[]> => {
  const response = await fetch(`${API_BASE}/api/sessions/${sessionId}/queue`, {
    headers: withAuthHeaders(userId, username)
  });

  if (!response.ok) {
    return [];
  }

  const data = (await response.json()) as { queue: QueueItem[] };
  return data.queue;
};

export const fetchSessionStatus = async (
  sessionId: string,
  userId: string,
  username: string
): Promise<SessionStatusResponse> => {
  const response = await fetch(`${API_BASE}/api/sessions/${sessionId}`, {
    headers: withAuthHeaders(userId, username)
  });

  if (!response.ok) {
    throw new Error('Failed to fetch status');
  }

  return (await response.json()) as SessionStatusResponse;
};

export const sendMessage = async (
  sessionId: string,
  content: string,
  userId: string,
  username: string
): Promise<void> => {
  const response = await fetch(`${API_BASE}/api/sessions/${sessionId}/send`, {
    method: 'POST',
    headers: withAuthHeaders(userId, username),
    body: JSON.stringify({ content })
  });

  if (!response.ok) {
    throw new Error('Failed to send message');
  }
};

export const openSessionSocket = (
  sessionId: string,
  userId: string,
  username: string,
  onEvent: (event: SessionEvent) => void
) => {
  const params = new URLSearchParams({ userId, username });
  const socket = new WebSocket(`${WS_BASE}/ws/session/${sessionId}?${params}`);

  socket.onmessage = (event) => {
    try {
      const payload = JSON.parse(event.data) as SessionEvent;
      onEvent(payload);
    } catch (error) {
      console.warn('Failed to parse websocket payload', error);
    }
  };

  return socket;
};
