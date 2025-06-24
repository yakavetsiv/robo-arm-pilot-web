
import { cn } from "@/lib/utils";
import { Home, Video, ClipboardList, FileText, Database, Settings, BarChart3, Activity } from "lucide-react";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "status", label: "Robot Status", icon: Activity },
    { id: "controls", label: "Camera Feeds", icon: Video },
    { id: "tasks", label: "Task Tracking", icon: ClipboardList },
    { id: "logs", label: "Logs", icon: FileText },
    { id: "positions", label: "Position Library", icon: Database },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-300 flex flex-col shadow-sm">
      <div className="p-6 border-b border-gray-300">
        <h1 className="text-xl font-bold text-gray-800">RobotArm Control</h1>
        <p className="text-sm text-gray-600 mt-1">Industrial Interface v1.0</p>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors",
                  activeSection === item.id
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-300">
        <div className="text-xs text-gray-600">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Robot Connected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span>Camera 1 Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
