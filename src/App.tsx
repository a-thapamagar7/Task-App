import "@/App.css";
import TaskHeader from "@/components/task-dashboard/TaskHeader";
import TaskCard from "@/components/task-dashboard/TaskCard";
import { TASK_STATUSES } from "@/constants/task-constants";
import type { TaskStatus } from "@/types/task.types";
import { useTasks } from "./hooks/useTasks";

function App() {
  const { groupedTasks, deleteTask, editTask, moveTask } = useTasks();

  return (
    <div className="px-40 py-20">
      <div className="grid gap-10 grid-cols-1 lg:grid-cols-3">
        {TASK_STATUSES.map((status) => (
          <div key={status.value} className="flex flex-col gap-y-5">
            <TaskHeader
              color={status.background}
              label={status.label}
              value={status.value}
            />

            {groupedTasks[status.value as TaskStatus].map((task) => (
              <TaskCard
                key={task.id}
                title={task.title}
                currentStatus={task.status}
                description={task.description}
                onEdit={() =>
                  editTask(task.id, prompt("New title?") || task.title)
                }
                onDelete={() => deleteTask(task.id)}
                onMove={(newStatus: TaskStatus) => moveTask(task.id, newStatus)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
