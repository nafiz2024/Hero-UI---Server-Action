import { revalidatePath } from "next/cache";
import { postTask } from "./tasks";

export const createTask = async (formData) => {
    'use server'
    const newTask = Object.fromEntries(formData.entries());

    const res = await postTask(newTask);

    if(res.ok){
        revalidatePath("/tasks");
    };

    return res;
}
