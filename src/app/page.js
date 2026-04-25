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

const getInitials = (name) =>
  name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

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
            <div className="home-actions">
              <Link className="home-primary-action" href="/tasks">
                View task board
              </Link>
              <a className="home-secondary-action" href="#today-focus">
                Review focus
              </a>
            </div>
          </div>

          <aside className="home-progress-panel" aria-label="Sprint progress">
            <div
              className="home-progress-ring"
              style={{ "--progress": averageProgress }}
            >
              <span>{averageProgress}%</span>
            </div>
            <div>
              <p>Sprint Progress</p>
              <strong>{completedTasks.length} tasks complete</strong>
              <small>{openTasks.length} tasks need follow-through</small>
            </div>
          </aside>
        </div>

        <div className="home-metrics" aria-label="Project summary">
          {metrics.map((metric) => (
            <article
              className={`home-metric home-metric-${metric.tone}`}
              key={metric.label}
            >
              <span>{metric.label}</span>
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
                  <span className="home-task-avatar">{getInitials(task.user)}</span>
                  <div>
                    <h3>{task.title}</h3>
                    <p>{task.category}</p>
                  </div>
                  <span className={`home-task-status home-status-${task.status}`}>
                    {statusLabels[task.status]}
                  </span>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
