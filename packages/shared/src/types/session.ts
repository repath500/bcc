export interface Session {
  id: string;
  userId: string;
  repoUrl: string;
  branch: string;
  sandboxId: string;
  opencodeSessionId: string;
  status: 'initializing' | 'ready' | 'executing' | 'idle' | 'error' | 'closed';
  createdAt: number;
  lastActiveAt: number;
  metadata: SessionMetadata;
}

export interface SessionMetadata {
  repoOwner: string;
  repoName: string;
  installationId: number;
  prNumber?: number;
  prUrl?: string;
  commitCount: number;
  sandboxUrl?: string;
}
