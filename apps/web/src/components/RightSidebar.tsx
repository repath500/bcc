'use client';

interface Task {
  id: string;
  label: string;
  done: boolean;
}

interface RightSidebarProps {
  tasks: Task[];
  projectTags: string[];
  filePaths: string[];
  model?: string;
  branch?: string;
}

export function RightSidebar({
  tasks,
  projectTags,
  filePaths,
  model = 'Claude Opus 4.5',
  branch = 'Draft'
}: RightSidebarProps) {
  return (
    <aside className="right-sidebar">
      <div className="sidebar-section">
        <p className="label">Tasks</p>
        <div className="checklist">
          {tasks.map((task) => (
            <div key={task.id} className="check-row">
              <input type="checkbox" checked={task.done} readOnly />
              <span>{task.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <p className="label">Model</p>
        <div className="info-row">
          <span className="icon">🤖</span>
          <span>{model}</span>
        </div>
      </div>

      <div className="sidebar-section">
        <p className="label">Branch</p>
        <div className="info-row">
          <span className="icon">🌿</span>
          <span>{branch}</span>
        </div>
      </div>

      <div className="sidebar-section">
        <p className="label">Project Tags</p>
        <div className="tag-row">
          {projectTags.map((tag, idx) => (
            <span key={idx} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <p className="label">Files</p>
        <div className="file-list">
          {filePaths.map((path, idx) => (
            <div key={idx} className="file-chip">
              {path}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
