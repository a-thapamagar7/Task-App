import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Delete01Icon,
  Edit02Icon,
  MoveIcon,
  PinIcon,
} from "@hugeicons/core-free-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TASK_STATUSES } from "@/constants/task-constants";
import type React from "react";
import type { TaskStatus } from "@/types/task.types";

const TaskCard: React.FC<{
  title: string;
  description: string;
  currentStatus: TaskStatus;
  onEdit: () => void;
  onDelete: () => void;
  onMove: (status: TaskStatus) => void;
}> = ({ title, description, currentStatus, onEdit, onDelete, onMove }) => {
  const filteredStatuses = TASK_STATUSES.filter(
    (status) => status.value !== currentStatus,
  );
  return (
    <Card className=" shadow-md">
      <CardHeader>
        <CardTitle className="base">{title}</CardTitle>
      </CardHeader>

      <CardContent className="text-justify text-muted-foreground">
        <CardDescription className="line-clamp-2 text-xs">
          {description}
        </CardDescription>
      </CardContent>

      <CardFooter className="flex justify-between text-xs text-muted-foreground">
        <div className="flex gap-2">
          <Button variant="ghost" onClick={onEdit} aria-label="Edit task">
            <HugeiconsIcon icon={Edit02Icon} className="text-blue-500" />
          </Button>

          <Button variant="ghost" onClick={onDelete} aria-label="Delete task">
            <HugeiconsIcon icon={Delete01Icon} className="text-red-500" />
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" className="p-3">
              Move
              <HugeiconsIcon icon={MoveIcon} />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Status</DropdownMenuLabel>

              {filteredStatuses.map((status) => {
                return (
                  <DropdownMenuItem
                    key={status.value}
                    className="cursor-pointer"
                    onClick={() => onMove(status.value)}
                  >
                    <HugeiconsIcon icon={PinIcon} className={status.color} />
                    {status.label}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
