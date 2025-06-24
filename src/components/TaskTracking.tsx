
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Play, Square, RotateCcw } from "lucide-react";

export function TaskTracking() {
  const [tasks] = useState([
    {
      id: 1,
      name: "Pick and Place Sequence",
      status: "running",
      progress: 65,
      startTime: "14:30:25",
      estimatedTime: "2:30",
      steps: [
        { name: "Move to approach position", completed: true },
        { name: "Move to pick position", completed: true },
        { name: "Close gripper", completed: true },
        { name: "Move to retreat position", completed: false },
        { name: "Move to place position", completed: false },
        { name: "Open gripper", completed: false },
      ]
    },
    {
      id: 2,
      name: "Calibration Routine",
      status: "completed",
      progress: 100,
      startTime: "14:25:10",
      estimatedTime: "1:45",
      steps: [
        { name: "Home position", completed: true },
        { name: "Joint calibration", completed: true },
        { name: "Tool center point", completed: true },
        { name: "Workspace limits", completed: true },
      ]
    },
    {
      id: 3,
      name: "Quality Inspection",
      status: "pending",
      progress: 0,
      startTime: "-",
      estimatedTime: "3:15",
      steps: [
        { name: "Approach inspection point", completed: false },
        { name: "Capture image", completed: false },
        { name: "Process vision data", completed: false },
        { name: "Make decision", completed: false },
      ]
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running": return "bg-blue-500";
      case "completed": return "bg-green-500";
      case "pending": return "bg-gray-500";
      case "error": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-cyan-400">Task Tracking</h2>
        <div className="flex gap-2">
          <Button className="bg-green-600 hover:bg-green-700">
            <Play size={16} className="mr-2" />
            Start Task
          </Button>
          <Button variant="outline" className="border-red-500 text-red-400 hover:bg-red-600 hover:text-white">
            <Square size={16} className="mr-2" />
            Stop All
          </Button>
          <Button variant="outline" className="border-orange-500 text-orange-400 hover:bg-orange-600 hover:text-white">
            <RotateCcw size={16} className="mr-2" />
            Reset
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {tasks.map((task) => (
          <Card key={task.id} className="bg-slate-800 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-cyan-400">{task.name}</CardTitle>
                <div className="flex items-center gap-4">
                  <Badge className={getStatusColor(task.status)}>
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </Badge>
                  <div className="text-sm text-slate-400">
                    Started: {task.startTime} | ETA: {task.estimatedTime}
                  </div>
                </div>
              </div>
              <Progress value={task.progress} className="w-full" />
              <div className="text-right text-sm text-slate-400">{task.progress}%</div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-slate-300 mb-3">Task Steps:</h4>
                {task.steps.map((step, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${step.completed ? 'bg-green-500' : 'bg-slate-600'}`}></div>
                    <span className={`text-sm ${step.completed ? 'text-green-400' : 'text-slate-400'}`}>
                      {step.name}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
