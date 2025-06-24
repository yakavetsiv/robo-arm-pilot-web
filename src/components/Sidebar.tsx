
import { cn } from "@/lib/utils";
import { Home, Video, ClipboardList, FileText, Database } from "lucide-react";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const menuItems = [
    { id: "controls", label: "Robot Controls", icon: Home },
    { id: "tasks", label: "Task Tracking", icon: ClipboardList },
    { id: "logs", label: "Logs", icon: FileText },
    { id: "positions", label: "Position Library", icon: Database },
  ];

  return (
    <div className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold text-cyan-400">RobotArm Control</h1>
        <p className="text-sm text-slate-400 mt-1">Industrial Interface v1.0</p>
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
                    ? "bg-cyan-600 text-white"
                    : "text-slate-300 hover:bg-slate-700 hover:text-white"
                )}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-slate-700">
        <div className="text-xs text-slate-400">
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
