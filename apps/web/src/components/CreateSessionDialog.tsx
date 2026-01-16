'use client';

import { useState } from 'react';
import type { SessionCreateRequest } from '@/lib/types';

interface CreateSessionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (request: SessionCreateRequest) => Promise<void>;
  isCreating: boolean;
}

export function CreateSessionDialog({
  isOpen,
  onClose,
  onSubmit,
  isCreating
}: CreateSessionDialogProps) {
  const [repoUrl, setRepoUrl] = useState('');
  const [branch, setBranch] = useState('main');
  const [installationId, setInstallationId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      repoUrl,
      branch,
      installationId: installationId ? Number(installationId) : undefined
    });
    setRepoUrl('');
    setBranch('main');
    setInstallationId('');
  };

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h2>Create New Session</h2>
          <button type="button" className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="dialog-form">
          <label className="field">
            <span>Repository URL *</span>
            <input
              type="text"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="https://github.com/owner/repo"
              required
            />
          </label>
          <label className="field">
            <span>Branch</span>
            <input
              type="text"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              placeholder="main"
            />
          </label>
          <label className="field">
            <span>GitHub Installation ID (optional)</span>
            <input
              type="text"
              value={installationId}
              onChange={(e) => setInstallationId(e.target.value)}
              placeholder="12345678"
            />
          </label>
          <div className="dialog-actions">
            <button type="button" className="secondary-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" disabled={!repoUrl || isCreating}>
              {isCreating ? 'Creating...' : 'Create Session'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
