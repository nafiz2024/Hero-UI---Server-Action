import TaskCard from "@/component/TaskCard";
import { getTasks } from "../lib/tasks";

const Page = async () => {
  const tasks = await getTasks();
  const completedTasks = tasks.filter((task) => task.status === "completed");
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress");
  const highPriorityTasks = tasks.filter((task) => task.priority === "high");
  const averageProgress = Math.round(
    tasks.reduce((total, task) => total + task.progress, 0) / tasks.length,
  );

  return (
    <main className="tasks-page">
      <section className="tasks-shell">
        <div className="tasks-header">
          <div>
            <p className="tasks-eyebrow">Project Control</p>
            <h1>Task Board</h1>
            <p>Track task status, priority, and assigned team members.</p>
          </div>
          <div className="tasks-header-panel">
            <span>Sprint Progress</span>
            <strong>{averageProgress}%</strong>
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

        <div className="tasks-grid">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Page;
