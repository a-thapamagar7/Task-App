import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type React from "react";

const TaskHeader: React.FC<{ color: string; label: string; value: string }> = ({
  color,
  label,
  value,
}) => {
  return (
    <div className="flex w-full items-center">
      <div className={`w-1 h-2/3 ${color}`} />
      <Card key={value} className="flex-1 col-span-1 shadow-md">
        <CardHeader>
          <CardTitle className="font-semibold">{label}</CardTitle>
          <CardAction className="text-sm text-muted-foreground">
            <HugeiconsIcon icon={PlusSignIcon} className="h-5 w-5" />
          </CardAction>
        </CardHeader>
      </Card>
    </div>
  );
};

export default TaskHeader;
