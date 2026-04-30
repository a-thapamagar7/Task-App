import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { Task, TaskStatus } from "@/types/task.types";
import { loadTasks, saveTasks } from "@/utils/localStorage.helper";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = loadTasks();
    return stored.length
      ? stored
      : [
          {
            id: uuidv4(),
            title: "Create a new Landing Page",
            description: "This is a sample task description...",
            status: "to_do",
          },
        ];
  });

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const groupedTasks: Record<TaskStatus, Task[]> = {
    to_do: [],
    in_progress: [],
    done: [],
  };

  for (const task of tasks) {
    groupedTasks[task.status].push(task);
  }

  const addTask = (data: Omit<Task, "id">) => {
    setTasks((prev) => [...prev, { id: uuidv4(), ...data }]);
  };

  const editTask = (id: string, data: Omit<Task, "id">) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const moveTask = (id: string, status: TaskStatus) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  };

  return {
    tasks,
    groupedTasks,
    addTask,
    editTask,
    deleteTask,
    moveTask,
  };
}
