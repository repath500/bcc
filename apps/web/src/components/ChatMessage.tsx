import type { ChatMessage as ChatMessageType } from '@/lib/types';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const roleLabel =
    message.role === 'assistant'
      ? 'Agent'
      : message.role === 'system'
        ? 'System'
        : message.role === 'tool'
          ? 'Tool'
          : 'You';
  const originLabel = message.source
    ? message.source === 'slack'
      ? 'Slack'
      : message.source === 'chrome'
        ? 'Chrome'
        : message.source === 'agent'
          ? 'Agent Relay'
          : 'Web'
    : null;
  return (
    <article className={`message-card role-${message.role} ${isUser ? 'from-user' : ''}`}>
      <div className="message-meta">
        <div className="meta-left">
          <span className="message-role">{roleLabel}</span>
          {originLabel && <span className="message-origin">From {originLabel}</span>}
          {message.slackPosted && <span className="message-badge slack">Posted on Slack</span>}
        </div>
        <span className="message-time">
          {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      {message.systemAction && <div className="message-action">{message.systemAction}</div>}
      {message.content && <p className="message-content">{message.content}</p>}
      {message.attachments && message.attachments.length > 0 && (
        <div className="message-attachments">
          {message.attachments.map((attachment) => (
            <div key={attachment.id} className={`attachment-card ${attachment.type}`}>
              {attachment.type === 'image' ? (
                <img src={attachment.previewUrl ?? attachment.url} alt={attachment.name} />
              ) : (
                <div className="attachment-file">
                  <span className="attachment-name">{attachment.name}</span>
                  <span className="attachment-meta">File attachment</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {message.slackPreview && (
        <div className="slack-preview">
          <p className="slack-title">Post to {message.slackPreview.channel}</p>
          <p className="slack-text">{message.slackPreview.text}</p>
          <div className="slack-actions">
            <span className="message-badge">Preview</span>
            <span className="message-badge">Send to Slack</span>
          </div>
        </div>
      )}
    </article>
  );
}
