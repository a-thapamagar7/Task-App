import "@/App.css";
import TaskHeader from "@/components/task-dashboard/TaskHeader";
import TaskCard from "@/components/task-dashboard/TaskCard";
import TaskDialog from "@/components/task-dashboard/TaskDialog";
import { TASK_STATUSES } from "@/constants/task-constants";
import type { Task, TaskStatus } from "@/types/task.types";
import { useTasks } from "@/hooks/useTasks";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

function App() {
  const { addTask, editTask, deleteTask, moveTask, tasks } = useTasks();

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 200);

    return () => clearTimeout(timer);
  }, [search]);

  const selectedTask = tasks.find((t) => t.id === editingTaskId) || null;

  const handleCreate = () => {
    setMode("create");
    setEditingTaskId(null);
    setOpen(true);
  };

  const handleEdit = (id: string) => {
    setMode("edit");
    setEditingTaskId(id);
    setOpen(true);
  };

  const filteredTasks = tasks.filter((task) => {
    const q = debouncedSearch.toLowerCase();

    if (!q) return true;

    return (
      task.title.toLowerCase().includes(q) ||
      task.description.toLowerCase().includes(q)
    );
  });

  const groupedTasks: Record<TaskStatus, Task[]> = {
    to_do: [],
    in_progress: [],
    done: [],
  };

  for (const task of filteredTasks) {
    groupedTasks[task.status].push(task);
  }

  return (
    <div className="flex flex-col px-40 py-20 gap-y-5">
      <div className="text-2xl font-bold">Task Dashboard</div>
      <div className="flex justify-between">
        <Input
          placeholder="Search tasks..."
          className="w-1/3 h-10 text-base!"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-black text-white rounded"
        >
          + Add Task
        </button>
      </div>

      <div className="grid gap-10 grid-cols-1 lg:grid-cols-3">
        {TASK_STATUSES.map((status) => (
          <div key={status.value} className="flex flex-col gap-y-5">
            <TaskHeader
              color={status.background}
              label={status.label}
              value={status.value}
              count={groupedTasks[status.value as TaskStatus].length}
            />

            {groupedTasks[status.value as TaskStatus].map((task) => (
              <TaskCard
                key={task.id}
                title={task.title}
                currentStatus={task.status}
                description={task.description}
                onEdit={() => handleEdit(task.id)}
                onDelete={() => deleteTask(task.id)}
                onMove={(newStatus: TaskStatus) => moveTask(task.id, newStatus)}
              />
            ))}
          </div>
        ))}
      </div>

      <TaskDialog
        open={open}
        setOpen={setOpen}
        mode={mode}
        task={selectedTask}
        onSubmit={(data) => {
          if (mode === "create") addTask(data);
          else if (editingTaskId) editTask(editingTaskId, data);
        }}
      />
    </div>
  );
}

export default App;
