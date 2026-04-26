import tasks from '../data/task.json'

export const getTasks = async () => {
    return tasks
} 

export const postTask = async (newTask) => {
    const normalizedTask = {
        id: tasks.length + 1,
        title: newTask.title?.trim() || "Untitled task",
        description: newTask.description?.trim() || "No description provided.",
        status: newTask.status || "pending",
        priority: newTask.priority || "medium",
        user: newTask.user?.trim() || "Unassigned",
        userRole: newTask.userRole?.trim() || "Team Member",
        category: newTask.category?.trim() || "General",
        dueDate: newTask.dueDate || new Date().toISOString().slice(0, 10),
        estimate: newTask.estimate || "2h",
        progress: Number.isFinite(Number(newTask.progress))
            ? Math.min(Math.max(Number(newTask.progress), 0), 100)
            : 0,
    };

    tasks.push(normalizedTask);
    return {ok: true, message: "Task added successfully"}
}
