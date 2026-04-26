import TaskCard from "@/component/TaskCard";
import { getTasks } from "../lib/tasks";
import AddTask from "@/component/AddTask";
import { createTask } from "../lib/actions";

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
            <span>Total Tasks</span>
            <strong>{tasks.length}</strong>
          </article>
          <article className="task-stat task-stat-completed">
            <span>Completed</span>
            <strong>{completedTasks.length}</strong>
          </article>
          <article className="task-stat task-stat-progress">
            <span>In Progress</span>
            <strong>{inProgressTasks.length}</strong>
          </article>
          <article className="task-stat task-stat-alert">
            <span>High Priority</span>
            <strong>{highPriorityTasks.length}</strong>
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
