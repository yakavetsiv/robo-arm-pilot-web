
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, VideoOff, Navigation, Camera, Target, MapPin } from "lucide-react";
import { RobotControlsSheet } from "./RobotControlsSheet";

export function VideoStreams() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Camera Feeds</h2>
        <RobotControlsSheet />
      </div>
      
      <Card className="bg-white border-gray-300 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-gray-800">Live Camera Streams</CardTitle>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="border-green-500 text-green-600 hover:bg-green-600 hover:text-white">
                <Video size={16} className="mr-2" />
                Start All
              </Button>
              <Button size="sm" variant="outline" className="border-red-500 text-red-600 hover:bg-red-600 hover:text-white">
                <VideoOff size={16} className="mr-2" />
                Stop All
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-gray-700">Camera 1 - Overview</h4>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-600">Active</span>
                </div>
              </div>
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border border-gray-300">
                <div className="text-center text-gray-500">
                  <Video size={48} className="mx-auto mb-2" />
                  <p className="text-sm">Camera feed will appear here</p>
                  <p className="text-xs">1920x1080 @ 30fps</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white flex-1">
                  <Target size={14} className="mr-1" />
                  Detect AprilTag
                </Button>
                <Button size="sm" variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-600 hover:text-white flex-1">
                  <Navigation size={14} className="mr-1" />
                  Navigate to Tag
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-gray-700">Camera 2 - End Effector</h4>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-xs text-orange-600">Standby</span>
                </div>
              </div>
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border border-gray-300">
                <div className="text-center text-gray-500">
                  <VideoOff size={48} className="mx-auto mb-2" />
                  <p className="text-sm">Camera offline</p>
                  <p className="text-xs">1280x720 @ 15fps</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white flex-1">
                  <Target size={14} className="mr-1" />
                  Detect AprilTag
                </Button>
                <Button size="sm" variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-600 hover:text-white flex-1">
                  <MapPin size={14} className="mr-1" />
                  Set Position
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
