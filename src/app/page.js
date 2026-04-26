import Link from "next/link";
import { getTasks } from "./lib/tasks";

const statusLabels = {
  completed: "Done",
  "in-progress": "In Progress",
  pending: "Pending",
};

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(new Date(`${date}T00:00:00`));

const getTaskIcon = (task) => {
  const source = `${task.title} ${task.category}`.toLowerCase();

  if (source.includes("design") || source.includes("ui")) {
    return "design";
  }

  if (source.includes("data") || source.includes("database")) {
    return "data";
  }

  if (source.includes("connect") || source.includes("integration")) {
    return "connect";
  }

  return "build";
};

const TaskAvatarIcon = ({ task }) => {
  const icon = getTaskIcon(task);

  if (icon === "design") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 17.5 16.8 5.7a2.12 2.12 0 1 1 3 3L8 20.5 4 21l.5-4Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.9"
        />
      </svg>
    );
  }

  if (icon === "data") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
        <ellipse
          cx="12"
          cy="6"
          rx="6.5"
          ry="2.8"
          stroke="currentColor"
          strokeWidth="1.9"
        />
        <path
          d="M5.5 6v6c0 1.55 2.91 2.8 6.5 2.8s6.5-1.25 6.5-2.8V6"
          stroke="currentColor"
          strokeWidth="1.9"
        />
        <path
          d="M5.5 12v6c0 1.55 2.91 2.8 6.5 2.8s6.5-1.25 6.5-2.8v-6"
          stroke="currentColor"
          strokeWidth="1.9"
        />
      </svg>
    );
  }

  if (icon === "connect") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
        <path
          d="M9 8.5h-1.5a4 4 0 1 0 0 8H9"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.9"
        />
        <path
          d="M15 15.5h1.5a4 4 0 0 0 0-8H15"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.9"
        />
        <path
          d="M8 12h8"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.9"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 4.75 18.5 8.5V15.5L12 19.25 5.5 15.5V8.5L12 4.75Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.9"
      />
      <path
        d="M9.5 10.5h5M9.5 13.5h5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.9"
      />
    </svg>
  );
};

const MetricIcon = ({ tone }) => {
  if (tone === "green") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
        <path
          d="m6.5 12.5 3.2 3.2 7.8-8.2"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    );
  }

  if (tone === "blue") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 15.5 9.5 11l3 3 6.5-7"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    );
  }

  if (tone === "rose") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 7v5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
        <path
          d="M12 16h.01"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
        <path
          d="M10.2 4.9 4.8 14.2A2 2 0 0 0 6.53 17h10.94a2 2 0 0 0 1.73-2.8l-5.47-9.3a2 2 0 0 0-3.46 0Z"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path
        d="M6.5 8.5h11M6.5 12h11M6.5 15.5h7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <path
        d="M5 5h14v14H5z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

export default async function Home() {
  const tasks = await getTasks();
  const completedTasks = tasks.filter((task) => task.status === "completed");
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress");
  const openTasks = tasks.filter((task) => task.status !== "completed");
  const highPriorityTasks = tasks.filter((task) => task.priority === "high");
  const averageProgress = tasks.length
    ? Math.round(
        tasks.reduce((total, task) => total + task.progress, 0) / tasks.length,
      )
    : 0;
  const nextTask =
    [...openTasks].sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
    )[0] || tasks[0];
  const visibleTasks = tasks.slice(0, 4);
  const pendingTasks = tasks.filter((task) => task.status === "pending");
  const completionRate = tasks.length
    ? Math.round((completedTasks.length / tasks.length) * 100)
    : 0;
  const workloadNote =
    highPriorityTasks.length > 0
      ? `${highPriorityTasks.length} critical item${
          highPriorityTasks.length > 1 ? "s" : ""
        } need attention`
      : "Priority queue is under control";
  const sprintSignals = [
    {
      label: "Next milestone",
      value: nextTask?.title || "No active task",
    },
    {
      label: "Due soon",
      value: nextTask?.dueDate ? formatDate(nextTask.dueDate) : "TBD",
    },
    {
      label: "Top owner",
      value: nextTask?.user || "Unassigned",
    },
  ];

  const metrics = [
    {
      label: "Total Tasks",
      value: tasks.length,
      detail: `${openTasks.length} still open`,
      tone: "slate",
    },
    {
      label: "Completed",
      value: completedTasks.length,
      detail: `${completedTasks.length}/${tasks.length} shipped`,
      tone: "green",
    },
    {
      label: "In Progress",
      value: inProgressTasks.length,
      detail: "Active workstreams",
      tone: "blue",
    },
    {
      label: "High Priority",
      value: highPriorityTasks.length,
      detail: "Needs close watch",
      tone: "rose",
    },
  ];

  return (
    <div className="home-page">
      <section className="home-shell">
        <div className="home-hero">
          <div className="home-hero-copy">
            <p className="home-eyebrow">Project Workspace</p>
            <h1>Run the sprint from one focused dashboard.</h1>
            <p>
              See priorities, handoffs, and progress at a glance before jumping
              into the full task board.
            </p>
            <div className="home-hero-highlights">
              <article>
                <span>Completion Rate</span>
                <strong>{completionRate}% of board closed</strong>
              </article>
              <article>
                <span>Workload Signal</span>
                <strong>{workloadNote}</strong>
              </article>
            </div>
            <div className="home-actions">
              <Link className="home-primary-action" href="/tasks">
                <span className="home-action-copy">
                  <small className="home-action-kicker">Main Action</small>
                  <span className="home-action-label">View task board</span>
                </span>
                <span className="home-action-icon" aria-hidden="true">
                  &rarr;
                </span>
              </Link>
              <a className="home-secondary-action" href="#today-focus">
                <span className="home-action-copy">
                  <small className="home-action-kicker">Quick Review</small>
                  <span className="home-action-label">Review focus</span>
                </span>
              </a>
            </div>
          </div>

          <aside className="home-progress-panel" aria-label="Sprint progress">
            <div className="home-progress-top">
              <div
                className="home-progress-ring"
                style={{ "--progress": averageProgress }}
              >
                <span>{averageProgress}%</span>
              </div>
              <div className="home-progress-badge">
                <span>Pending Start</span>
                <strong>{pendingTasks.length}</strong>
              </div>
            </div>
            <div>
              <p>Sprint Progress</p>
              <strong>{completedTasks.length} tasks complete</strong>
              <small>{openTasks.length} tasks need follow-through</small>
              <div className="home-progress-insights">
                {sprintSignals.map((signal) => (
                  <article key={signal.label}>
                    <span>{signal.label}</span>
                    <strong>{signal.value}</strong>
                  </article>
                ))}
              </div>
              <div className="home-progress-mini">
                <div>
                  <span>In motion</span>
                  <strong>{inProgressTasks.length}</strong>
                </div>
                <div>
                  <span>High priority</span>
                  <strong>{highPriorityTasks.length}</strong>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="home-metrics" aria-label="Project summary">
          {metrics.map((metric) => (
            <article
              className={`home-metric home-metric-${metric.tone}`}
              key={metric.label}
            >
              <div className="home-metric-top">
                <span>{metric.label}</span>
                <div className={`home-metric-icon home-metric-icon-${metric.tone}`}>
                  <MetricIcon tone={metric.tone} />
                </div>
              </div>
              <strong>{metric.value}</strong>
              <small>{metric.detail}</small>
            </article>
          ))}
        </div>

        <div className="home-content-grid">
          <section className="home-focus" id="today-focus">
            <div className="home-section-heading">
              <span>Today Focus</span>
              <h2>{nextTask.title}</h2>
            </div>
            <div className="home-focus-tags">
              <span className="home-focus-tag home-focus-category">
                {nextTask.category}
              </span>
              <span className={`home-focus-tag home-status-${nextTask.status}`}>
                {statusLabels[nextTask.status]}
              </span>
            </div>
            <p>{nextTask.description}</p>
            <div className="home-focus-meta">
              <div>
                <span>Owner</span>
                <strong>{nextTask.user}</strong>
              </div>
              <div>
                <span>Due</span>
                <strong>{formatDate(nextTask.dueDate)}</strong>
              </div>
              <div>
                <span>Estimate</span>
                <strong>{nextTask.estimate}</strong>
              </div>
            </div>
            <div className="home-progress-track">
              <span style={{ width: `${nextTask.progress}%` }} />
            </div>
            <div className="home-focus-footer">
              <div>
                <span>Progress</span>
                <strong>{nextTask.progress}% complete</strong>
              </div>
              <Link href="/tasks">Open board</Link>
            </div>
          </section>

          <section className="home-task-list" aria-label="Recent tasks">
            <div className="home-list-heading">
              <div>
                <span>Task Queue</span>
                <h2>Recent work</h2>
              </div>
              <Link href="/tasks">All tasks</Link>
            </div>

            <div className="home-task-rows">
              {visibleTasks.map((task) => (
                <article className="home-task-row" key={task.id}>
                  <span className="home-task-avatar">
                    <TaskAvatarIcon task={task} />
                  </span>
                  <div>
                    <h3>{task.title}</h3>
                    <p>{`${task.category} - Due ${formatDate(task.dueDate)}`}</p>
                  </div>
                  <div className="home-task-row-side">
                    <span className={`home-task-status home-status-${task.status}`}>
                      {statusLabels[task.status]}
                    </span>
                    <strong>{task.progress}%</strong>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
