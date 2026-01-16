export const validateSessionId = (id: string): boolean => /^sess_[a-z0-9]{12,}$/i.test(id);

export const parseRepoUrl = (url: string): { owner: string; repo: string } | null => {
  const match = url.match(/github\.com[/:]([^/]+)\/([^/.]+)/i);
  if (!match) return null;
  return { owner: match[1], repo: match[2].replace('.git', '') };
};
