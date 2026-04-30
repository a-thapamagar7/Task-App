import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import type { Task, TaskStatus } from "@/types/task.types";
import { HugeiconsIcon } from "@hugeicons/react";
import { Pin02Icon } from "@hugeicons/core-free-icons";
import { TASK_STATUSES } from "@/constants/task-constants";

type TaskDialogProps = {
  open: boolean;
  setOpen: (v: boolean) => void;
  mode: "create" | "edit";
  task: Task | null;
  onSubmit: (data: Omit<Task, "id">) => void;
};

const TaskDialog = ({
  open,
  setOpen,
  mode,
  task,
  onSubmit,
}: TaskDialogProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("to_do");

  useEffect(() => {
    if (mode === "edit" && task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
    }

    if (mode === "create") {
      setTitle("");
      setDescription("");
      setStatus("to_do");
    }
  }, [mode, task, open]);

  const handleSubmit = () => {
    if (!title.trim()) return;

    onSubmit({ title, description, status });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create Task" : "Edit Task"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Input
            id="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-10 text-sm!"
          />

          <Textarea
            id="description"
            placeholder="Description"
            value={description}
            className="h-40 text-sm!"
            onChange={(e) => setDescription(e.target.value)}
          />

          <Select
            value={status}
            aria-label="Task Status"
            onValueChange={(v) => setStatus(v as TaskStatus)}
          >
            <SelectTrigger className="w-full h-10! text-sm!">
              <SelectValue className="h-20" />
            </SelectTrigger>
            <SelectContent>
              {TASK_STATUSES.map((status) => {
                return (
                  <SelectItem
                    key={status.value}
                    value={status.value}
                    className="w-full text-sm!"
                  >
                    <HugeiconsIcon icon={Pin02Icon} className={status.color} />
                    {status.label}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>
            {mode === "create" ? "Create" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDialog;
