import type { TaskStatus } from "@/types/task.types";

const TASK_STATUSES: {
  label: string;
  value: TaskStatus;
  color: string;
  background: string;
}[] = [
  {
    label: "To Do",
    value: "to_do",
    color: "text-blue-500",
    background: "bg-blue-500",
  },
  {
    label: "In Progress",
    value: "in_progress",
    color: "text-yellow-500",
    background: "bg-yellow-500",
  },
  {
    label: "Done",
    value: "done",
    color: "text-green-500",
    background: "bg-green-500",
  },
];

export { TASK_STATUSES };
