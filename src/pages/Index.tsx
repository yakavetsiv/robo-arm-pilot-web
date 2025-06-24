
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { RobotControls } from "@/components/RobotControls";
import { VideoStreams } from "@/components/VideoStreams";
import { TaskTracking } from "@/components/TaskTracking";
import { Logs } from "@/components/Logs";
import { PositionLibrary } from "@/components/PositionLibrary";

const Index = () => {
  const [activeSection, setActiveSection] = useState("controls");

  const renderActiveSection = () => {
    switch (activeSection) {
      case "controls":
        return (
          <div className="space-y-6">
            <RobotControls />
            <VideoStreams />
          </div>
        );
      case "tasks":
        return <TaskTracking />;
      case "logs":
        return <Logs />;
      case "positions":
        return <PositionLibrary />;
      default:
        return <RobotControls />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
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
