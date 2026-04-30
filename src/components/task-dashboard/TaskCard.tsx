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

const TaskCard: React.FC<{
  title: string;
  description: string;
  onEdit: () => void;
  onDelete: () => void;
  onMove: (status: string) => void;
}> = ({ title, description, onEdit, onDelete, onMove }) => {
  return (
    <Card className="flex-1 shadow-md">
      <CardHeader>
        <CardTitle className="base">{title}</CardTitle>
      </CardHeader>

      <CardContent className="text-justify text-muted-foreground">
        <CardDescription className="line-clamp-4 text-xs">
          {description}
        </CardDescription>
      </CardContent>

      <CardFooter className="flex justify-between text-xs text-muted-foreground">
        <div className="flex gap-2">
          <Button variant="ghost" onClick={onEdit}>
            <HugeiconsIcon icon={Edit02Icon} className="text-blue-500" />
          </Button>

          <Button variant="ghost" onClick={onDelete}>
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

              {TASK_STATUSES.map((status) => (
                <DropdownMenuItem
                  key={status.value}
                  className="cursor-pointer"
                  onClick={() => onMove(status.value)}
                >
                  <HugeiconsIcon
                    icon={PinIcon}
                    className={`text-${status.color}`}
                  />
                  {status.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
