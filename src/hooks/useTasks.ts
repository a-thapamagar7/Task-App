import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { Task, TaskStatus } from "@/types/task.types";
import { loadTasks, saveTasks } from "@/utils/localStorage.helper";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = loadTasks();

    return stored.length ? stored : [];
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

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const editTask = (id: string, title: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, title } : task)),
    );
  };

  const moveTask = (id: string, status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status } : task)),
    );
  };

  const addTask = (task: Omit<Task, "id">) => {
    setTasks((prev) => [...prev, { id: uuidv4(), ...task }]);
  };

  return {
    tasks,
    groupedTasks,
    deleteTask,
    editTask,
    moveTask,
    addTask,
  };
}
