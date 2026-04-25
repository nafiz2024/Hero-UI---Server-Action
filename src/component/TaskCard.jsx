const statusMeta = {
  completed: {
    label: "Completed",
    className: "task-status task-status-completed",
  },
  "in-progress": {
    label: "In Progress",
    className: "task-status task-status-progress",
  },
  pending: {
    label: "Pending",
    className: "task-status task-status-pending",
  },
};

const priorityMeta = {
  high: {
    label: "High Priority",
    className: "task-priority task-priority-high",
  },
  medium: {
    label: "Medium Priority",
    className: "task-priority task-priority-medium",
  },
  low: {
    label: "Low Priority",
    className: "task-priority task-priority-low",
  },
};

const getInitials = (name) =>
  name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(new Date(`${date}T00:00:00`));

const TaskCard = ({ task }) => {
  const {
    title,
    description,
    status,
    priority,
    user,
    userRole,
    category,
    dueDate,
    estimate,
    progress,
  } = task;
  const currentStatus = statusMeta[status] || statusMeta.pending;
  const currentPriority = priorityMeta[priority] || priorityMeta.medium;
  const safeProgress = Math.min(Math.max(progress || 0, 0), 100);

  return (
    <article className={`task-card task-card-${priority}`}>
      <div className="task-card-top">
        <span className="task-category">{category}</span>
        <span className={currentStatus.className}>{currentStatus.label}</span>
      </div>

      <div className="task-card-body">
        <span className={currentPriority.className}>{currentPriority.label}</span>
        <h2>{title}</h2>
        <p>{description}</p>

        <dl className="task-details">
          <div>
            <dt>Due Date</dt>
            <dd>{formatDate(dueDate)}</dd>
          </div>
          <div>
            <dt>Estimate</dt>
            <dd>{estimate}</dd>
          </div>
        </dl>

        <div className="task-progress">
          <div className="task-progress-label">
            <span>Progress</span>
            <strong>{safeProgress}%</strong>
          </div>
          <div className="task-progress-track">
            <span style={{ width: `${safeProgress}%` }} />
          </div>
        </div>
      </div>

      <div className="task-card-footer">
        <div className="task-assignee">
          <span className="task-avatar">{getInitials(user)}</span>
          <div className="task-user">
            <span>Assigned To</span>
            <strong>{user}</strong>
            <small>{userRole}</small>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TaskCard;
