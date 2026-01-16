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
import type { ChatMessage, QueueItem, SessionEvent, SessionCreateRequest } from '@/lib/types';
import { ChatInput } from '@/components/ChatInput';
import { ChatMessage as ChatBubble } from '@/components/ChatMessage';
import { Sidebar } from '@/components/Sidebar';
import { CreateSessionDialog } from '@/components/CreateSessionDialog';
import { WorkspacePanel } from '@/components/WorkspacePanel';
import { RightSidebar } from '@/components/RightSidebar';
import { AnalyticsDashboard } from '@/components/AnalyticsDashboard';

interface Session {
  id: string;
  title: string;
  repo: string;
  ticket: string;
  status: 'active' | 'inactive';
  updatedAt: string;
}

const randomName = () => {
  const adjectives = ['Brisk', 'Bright', 'Sharp', 'Curious', 'Bold', 'Swift'];
  const nouns = ['Fox', 'Falcon', 'Tiger', 'Orchid', 'Comet', 'Harbor'];
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${
    nouns[Math.floor(Math.random() * nouns.length)]
  }`;
};

const demoSessions: Session[] = [
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

const metricCards = [
  { label: 'Merges past week', value: '1,307', trend: '+12%' },
  { label: 'Authors past week', value: '202', trend: '+8%' },
  { label: 'Humans past week', value: '275', trend: '+4%' },
  { label: 'Merge rate', value: '94%', trend: '+2%' }
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
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [, setQueue] = useState<QueueItem[]>([]);
  const [status, setStatus] = useState('Idle');
  const [sandboxUrl, setSandboxUrl] = useState<string | null>(null);
  const [vscodeUrl, setVscodeUrl] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [, setError] = useState<string | null>(null);
  const [sessionQuery] = useState('');
  const [selectedSession, setSelectedSession] = useState<string>('session-alpha');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'chat' | 'split' | 'ide'>('chat');
  const [sessions, setSessions] = useState(demoSessions);
  const [showAnalytics, setShowAnalytics] = useState(false);

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

  const handleCreateSession = async (payload: SessionCreateRequest) => {
    if (!ready) return;
    setIsCreating(true);
    setError(null);
    setStatus('Starting');

    try {
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

      const newSession = {
        id: response.sessionId,
        title: `Session ${response.sessionId.slice(0, 8)}`,
        repo: payload.repoUrl.split('/').slice(-2).join('/'),
        ticket: 'new',
        status: 'active' as const,
        updatedAt: 'now'
      };
      setSessions((prev) => [newSession, ...prev]);
      setSelectedSession(response.sessionId);
      setIsDialogOpen(false);
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

  const filteredSessions = sessions.filter((session) =>
    session.title.toLowerCase().includes(sessionQuery.toLowerCase())
  );
  const chatMessages = messages.length > 0 ? messages : demoMessages;

  const handleSelectSession = (sessionId: string) => {
    setSelectedSession(sessionId);
  };

  const handleNewSession = () => {
    setIsDialogOpen(true);
  };

  const currentSession = sessions.find((s) => s.id === selectedSession);
  const sessionTitle = currentSession?.title || 'Trip editing UX flow with screenshots';

  return (
    <main className="app-layout">
      <Sidebar
        sessions={filteredSessions}
        selectedSession={selectedSession}
        onSelectSession={handleSelectSession}
        onNewSession={handleNewSession}
        username={username}
      />

      <CreateSessionDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleCreateSession}
        isCreating={isCreating}
      />

      <div className="main-content">
        <header className="app-header">
          <div>
            <p className="eyebrow">Live Session</p>
            <h2>{sessionTitle}</h2>
          </div>
          <div className="header-actions">
            <button
              type="button"
              className="icon-button"
              onClick={() => setShowAnalytics(!showAnalytics)}
            >
              📊 Analytics
            </button>
            <div className="view-toggle">
              <button
                type="button"
                className={`toggle-button ${viewMode === 'chat' ? 'active' : ''}`}
                onClick={() => setViewMode('chat')}
              >
                Chat
              </button>
              <button
                type="button"
                className={`toggle-button ${viewMode === 'split' ? 'active' : ''}`}
                onClick={() => setViewMode('split')}
              >
                Split View
              </button>
              <button
                type="button"
                className={`toggle-button ${viewMode === 'ide' ? 'active' : ''}`}
                onClick={() => setViewMode('ide')}
              >
                IDE
              </button>
            </div>
            <div className={`status-pill ${isExecuting ? 'live' : ''}`}>
              {isExecuting ? 'Executing' : status}
            </div>
          </div>
        </header>

        {showAnalytics && <AnalyticsDashboard metrics={metricCards} />}

        <div className={`content-area ${viewMode === 'split' ? 'split-mode' : viewMode === 'ide' ? 'ide-mode' : ''}`}>
          {viewMode === 'split' && (
            <WorkspacePanel sandboxUrl={sandboxUrl} vscodeUrl={vscodeUrl} />
          )}

          <section className="chat-panel">
            <header className="panel-header">
              <div>
                <p className="label">Conversation</p>
                <h3>Agent stream</h3>
              </div>
              <div className="chat-actions">
                <button type="button" className="ghost-button">
                  📸 Capture screenshot
                </button>
                <button type="button" className="ghost-button">
                  📤 Post to Slack
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
            </div>
          </section>

          {viewMode === 'ide' && (
            <RightSidebar
              tasks={taskChecklist}
              projectTags={projectTags}
              filePaths={filePaths}
            />
          )}
        </div>
      </div>
    </main>
  );
}
