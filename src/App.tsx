import "@/App.css";
import TaskHeader from "@/components/task-dashboard/TaskHeader";
import { TASK_STATUSES } from "@/constants/task-constants";
import TaskCard from "@/components/task-dashboard/TaskCard";
import { v4 as uuidv4 } from "uuid";

function App() {
  const tasks = [
    {
      id: uuidv4(),
      title: "Create a new Landing Page",
      description: "This is a sample task description...",
      status: "to_do",
    },
    {
      id: uuidv4(),
      title: "Create a new Landing Page",
      description: "This is a sample task description...",
      status: "in_progress",
    },
    {
      id: uuidv4(),
      title: "Create a new Landing Page",
      description: "This is a sample task description...",
      status: "done",
    },
  ];
  return (
    <div className="px-40 py-20">
      <div className="grid grid-cols-3 gap-10">
        {TASK_STATUSES.map((status) => (
          <TaskHeader
            key={status.value}
            color={status.color}
            label={status.label}
            value={status.value}
          />
        ))}
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            title={task.title}
            description={task.description}
            onEdit={() => console.log("edit")}
            onDelete={() => console.log("delete")}
            onMove={(status) => console.log(status)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
