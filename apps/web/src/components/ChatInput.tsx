'use client';

import { useState } from 'react';

interface ChatInputProps {
  disabled?: boolean;
  onSend: (content: string) => Promise<void> | void;
}

export function ChatInput({ disabled, onSend }: ChatInputProps) {
  const [value, setValue] = useState('');

  const handleSend = async () => {
    if (!value.trim()) return;
    const next = value;
    setValue('');
    await onSend(next);
  };

  return (
    <div className="chat-input">
      <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Describe the change or ask the agent to act..."
        rows={3}
        disabled={disabled}
      />
      <button type="button" onClick={handleSend} disabled={disabled || !value.trim()}>
        Send
      </button>
    </div>
  );
}
