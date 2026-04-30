import "./App.css";
import TaskHeader from "./components/task-dashboard/TaskHeader";
import { TASK_STATUSES } from "./constants/taskConstants";

function App() {
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
      </div>
    </div>
  );
}

export default App;
