import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type React from "react";

const TaskHeader: React.FC<{
  color: string;
  label: string;
  value: string;
  count: number;
}> = ({ color, label, value, count }) => {
  return (
    <div className="flex w-full items-center">
      <div className={`w-1 h-2/3 ${color}`} />
      <Card key={value} className="flex-1 col-span-1 shadow-md">
        <CardHeader>
          <CardTitle className="font-semibold">
            {label}{" "}
            <span className={`text-white px-2 py-1 ml-2 rounded ${color}`}>
              {count}
            </span>
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

export default TaskHeader;
