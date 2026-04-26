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
  (name || "Unassigned")
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const formatDate = (date) => {
  if (!date) {
    return "TBD";
  }

  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return "TBD";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(parsedDate);
};

const TaskCard = ({ task }) => {
  const {
    id,
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
  const safeProgress = Math.min(Math.max(Number(progress) || 0, 0), 100);

  return (
    <article className={`task-card task-card-${priority}`}>
      <div className="task-card-top">
        <div className="task-card-top-meta">
          <span className="task-ticket">#{String(id).padStart(2, "0")}</span>
          <span className="task-category">{category}</span>
        </div>
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

        <div className="task-card-insight">
          <span>{safeProgress >= 100 ? "Ready to ship" : "Current owner"}</span>
          <strong>
            {safeProgress >= 100 ? "Completed milestone" : userRole || "Unassigned"}
          </strong>
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
