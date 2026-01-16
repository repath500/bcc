export const generateSessionId = (): string =>
  `sess_${crypto.randomUUID().replace(/-/g, '').slice(0, 16)}`;

export const generateMessageId = (): string =>
  `msg_${crypto.randomUUID().replace(/-/g, '').slice(0, 16)}`;
