'use client';

import { useState } from 'react';

interface Session {
  id: string;
  title: string;
  repo: string;
  ticket: string;
  status: 'active' | 'inactive';
  updatedAt: string;
}

interface SidebarProps {
  sessions: Session[];
  selectedSession: string | null;
  onSelectSession: (sessionId: string) => void;
  onNewSession: () => void;
  username: string;
}

export function Sidebar({
  sessions,
  selectedSession,
  onSelectSession,
  onNewSession,
  username
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredSessions = sessions.filter((s) =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const activeSessions = filteredSessions.filter((s) => s.status === 'active');
  const inactiveSessions = filteredSessions.filter((s) => s.status === 'inactive');

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
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

      <input
        type="text"
        className="search-input"
        placeholder="Search sessions..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <button type="button" className="new-session-button" onClick={onNewSession}>
        + New Session
      </button>

      {activeSessions.length > 0 && (
        <div className="session-group">
          <p className="label">Active</p>
          <div className="session-list">
            {activeSessions.map((session) => (
              <button
                key={session.id}
                type="button"
                className={`session-card ${selectedSession === session.id ? 'selected' : ''}`}
                onClick={() => onSelectSession(session.id)}
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
      )}

      {inactiveSessions.length > 0 && (
        <div className="session-group">
          <p className="label">Inactive</p>
          <div className="session-list">
            {inactiveSessions.map((session) => (
              <button
                key={session.id}
                type="button"
                className={`session-card ${selectedSession === session.id ? 'selected' : ''}`}
                onClick={() => onSelectSession(session.id)}
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
      )}
    </aside>
  );
}
