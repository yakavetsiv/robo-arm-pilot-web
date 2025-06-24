
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { VideoStreams } from "@/components/VideoStreams";
import { TaskTracking } from "@/components/TaskTracking";
import { Logs } from "@/components/Logs";
import { PositionLibrary } from "@/components/PositionLibrary";
import { Dashboard } from "@/components/Dashboard";
import { Settings } from "@/components/Settings";
import { Status } from "@/components/Status";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderActiveSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "status":
        return <Status />;
      case "controls":
        return <VideoStreams />;
      case "tasks":
        return <TaskTracking />;
      case "logs":
        return <Logs />;
      case "positions":
        return <PositionLibrary />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {renderActiveSection()}
        </div>
      </main>
    </div>
  );
};

export default Index;
