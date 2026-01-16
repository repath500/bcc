import type { ChatMessage as ChatMessageType } from '@/lib/types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from './CodeBlock';

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
      {message.content && (
        <div className="message-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code(props) {
                const { children, className, ...rest } = props;
                const match = /language-(\w+)/.exec(className || '');
                const isInline = !className;
                return !isInline && match ? (
                  <CodeBlock className={className}>{String(children)}</CodeBlock>
                ) : (
                  <code className={className} {...rest}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      )}
      {message.attachments && message.attachments.length > 0 && (
        <div className="message-attachments">
          {message.attachments.map((attachment) => (
            <div key={attachment.id} className={`attachment-card ${attachment.type}`}>
              {attachment.type === 'image' ? (
                <img src={attachment.previewUrl ?? attachment.url} alt={attachment.name} />
              ) : (
                <div className="attachment-file">
                  <div className="file-icon">📄</div>
                  <div>
                    <span className="attachment-name">{attachment.name}</span>
                    <span className="attachment-meta">Code file</span>
                  </div>
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
