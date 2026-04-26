import TaskCard from "@/component/TaskCard";
import { getTasks } from "../lib/tasks";
import AddTask from "@/component/AddTask";
import { createTask } from "../lib/actions";

const TaskStatIcon = ({ tone }) => {
  if (tone === "completed") {
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

  if (tone === "progress") {
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

  if (tone === "alert") {
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

const TaskPage = async () => {
  const tasks = await getTasks();
  const completedTasks = tasks.filter((task) => task.status === "completed");
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress");
  const highPriorityTasks = tasks.filter((task) => task.priority === "high");
  const pendingTasks = tasks.filter((task) => task.status === "pending");
  const averageProgress = Math.round(
    tasks.reduce((total, task) => total + task.progress, 0) / tasks.length,
  );

  return (
    <main className="tasks-page">
      <section className="tasks-shell">
        <div className="tasks-header">
          <div className="tasks-header-copy">
            <p className="tasks-eyebrow">Project Control</p>
            <h1>Task Board</h1>
            <p>Track task status, priority, and assigned team members.</p>
            <div className="tasks-header-highlights">
              <div>
                <span>Focus Today</span>
                <strong>{highPriorityTasks.length} critical items active</strong>
              </div>
              <div>
                <span>Queue Health</span>
                <strong>{pendingTasks.length} tasks waiting to start</strong>
              </div>
            </div>
            <div className="tasks-header-actions">
              <AddTask createTask={createTask} />
            </div>
          </div>
          <div className="tasks-header-panel">
            <span>Sprint Progress</span>
            <strong>{averageProgress}%</strong>
            <small>Average completion across the current board.</small>
            <div className="tasks-header-progress">
              <span style={{ width: `${averageProgress}%` }} />
            </div>
          </div>
        </div>

        <div className="tasks-stats">
          <article className="task-stat task-stat-total">
            <div className="task-stat-top">
              <span>Total Tasks</span>
              <span className="task-stat-icon task-stat-icon-total">
                <TaskStatIcon tone="total" />
              </span>
            </div>
            <strong>{tasks.length}</strong>
            <small>{pendingTasks.length} waiting in queue</small>
          </article>
          <article className="task-stat task-stat-completed">
            <div className="task-stat-top">
              <span>Completed</span>
              <span className="task-stat-icon task-stat-icon-completed">
                <TaskStatIcon tone="completed" />
              </span>
            </div>
            <strong>{completedTasks.length}</strong>
            <small>{completedTasks.length}/{tasks.length} delivered</small>
          </article>
          <article className="task-stat task-stat-progress">
            <div className="task-stat-top">
              <span>In Progress</span>
              <span className="task-stat-icon task-stat-icon-progress">
                <TaskStatIcon tone="progress" />
              </span>
            </div>
            <strong>{inProgressTasks.length}</strong>
            <small>Active execution now</small>
          </article>
          <article className="task-stat task-stat-alert">
            <div className="task-stat-top">
              <span>High Priority</span>
              <span className="task-stat-icon task-stat-icon-alert">
                <TaskStatIcon tone="alert" />
              </span>
            </div>
            <strong>{highPriorityTasks.length}</strong>
            <small>Needs close attention</small>
          </article>
        </div>

        <div className="tasks-board-heading">
          <div>
            <span>Live Workflow</span>
            <h2>Team Task Pipeline</h2>
          </div>
          <p>
            A clearer view of ownership, momentum, and deadlines across the
            board.
          </p>
        </div>

        <div className="tasks-grid">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default TaskPage;
