'use client';

interface WorkspacePanelProps {
  sandboxUrl?: string | null;
  vscodeUrl?: string | null;
}

export function WorkspacePanel({ sandboxUrl, vscodeUrl }: WorkspacePanelProps) {
  if (!sandboxUrl && !vscodeUrl) {
    return (
      <div className="workspace-panel">
        <div className="workspace-empty">
          <p className="empty-icon">🚀</p>
          <h3>No Active Workspace</h3>
          <p>Create a session to see your work in progress here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="workspace-panel">
      <div className="workspace-header">
        <h3>Work in Progress</h3>
        <div className="workspace-actions">
          {sandboxUrl && (
            <a href={sandboxUrl} target="_blank" rel="noreferrer" className="workspace-link">
              Open in OpenCode
            </a>
          )}
          {vscodeUrl && (
            <a href={vscodeUrl} target="_blank" rel="noreferrer" className="workspace-link">
              Open in VS Code
            </a>
          )}
        </div>
      </div>
      {sandboxUrl && (
        <iframe
          src={sandboxUrl}
          className="workspace-iframe"
          title="Workspace Preview"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      )}
    </div>
  );
}
