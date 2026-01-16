export interface User {
  id: string;
  email: string;
  username: string;
  avatarUrl?: string;
  githubId?: string;
  slackId?: string;
}

export interface Participant {
  userId: string;
  username: string;
  avatarUrl?: string;
  joinedAt: number;
  lastActiveAt: number;
  isTyping?: boolean;
}
