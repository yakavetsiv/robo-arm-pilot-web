import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FileText, Trash } from "lucide-react";

export function Logs() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  const [logs] = useState([
    {
      id: 1,
      timestamp: "2024-06-24 14:32:15",
      level: "info",
      source: "Robot Controller",
      message: "Movement to position [100, 200, 300] completed successfully"
    },
    {
      id: 2,
      timestamp: "2024-06-24 14:31:45",
      level: "warning",
      source: "Vision System",
      message: "April tag detection confidence below threshold (0.75)"
    },
    {
      id: 3,
      timestamp: "2024-06-24 14:31:20",
      level: "error",
      source: "Gripper",
      message: "Failed to establish connection with gripper controller"
    },
    {
      id: 4,
      timestamp: "2024-06-24 14:30:55",
      level: "info",
      source: "Task Manager",
      message: "Task 'Pick and Place Sequence' started by user"
    },
    {
      id: 5,
      timestamp: "2024-06-24 14:30:30",
      level: "info",
      source: "System",
      message: "Robot arm initialization completed"
    },
    {
      id: 6,
      timestamp: "2024-06-24 14:30:10",
      level: "info",
      source: "Camera",
      message: "Camera 1 stream started (1920x1080 @ 30fps)"
    },
    {
      id: 7,
      timestamp: "2024-06-24 14:29:45",
      level: "warning",
      source: "Safety System",
      message: "Workspace boundary violation detected - movement restricted"
    },
    {
      id: 8,
      timestamp: "2024-06-24 14:29:20",
      level: "info",
      source: "Position Library",
      message: "Position 'home_ultra' loaded successfully"
    }
  ]);

  const getLevelColor = (level: string) => {
    switch (level) {
      case "error": return "bg-red-500";
      case "warning": return "bg-orange-500";
      case "info": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesFilter = filter === "all" || log.level === filter;
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.source.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">System Logs</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="border-red-500 text-red-600 hover:bg-red-600 hover:text-white">
            <Trash size={16} className="mr-2" />
            Clear Logs
          </Button>
          <Button variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-600 hover:text-white">
            <FileText size={16} className="mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Card className="bg-white border-gray-300 shadow-sm">
        <CardHeader>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-50 border-gray-300"
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-40 bg-gray-50 border-gray-300">
                <SelectValue placeholder="Filter by level" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300">
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-96 overflow-auto">
            {filteredLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <Badge className={getLevelColor(log.level)}>
                  {log.level.toUpperCase()}
                </Badge>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-mono text-gray-600">{log.timestamp}</span>
                    <span className="text-sm text-blue-600">[{log.source}]</span>
                  </div>
                  <p className="text-sm text-gray-800">{log.message}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
