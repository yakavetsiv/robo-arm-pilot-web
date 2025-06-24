
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, VideoOff } from "lucide-react";

export function VideoStreams() {
  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-cyan-400">Camera Feeds</CardTitle>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="border-green-500 text-green-400">
              <Video size={16} className="mr-2" />
              Start All
            </Button>
            <Button size="sm" variant="outline" className="border-red-500 text-red-400">
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
              <h4 className="text-sm font-semibold text-slate-300">Camera 1 - Overview</h4>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-400">Active</span>
              </div>
            </div>
            <div className="aspect-video bg-slate-700 rounded-lg flex items-center justify-center border border-slate-600">
              <div className="text-center text-slate-400">
                <Video size={48} className="mx-auto mb-2" />
                <p className="text-sm">Camera feed will appear here</p>
                <p className="text-xs">1920x1080 @ 30fps</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-slate-300">Camera 2 - End Effector</h4>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-xs text-orange-400">Standby</span>
              </div>
            </div>
            <div className="aspect-video bg-slate-700 rounded-lg flex items-center justify-center border border-slate-600">
              <div className="text-center text-slate-400">
                <VideoOff size={48} className="mx-auto mb-2" />
                <p className="text-sm">Camera offline</p>
                <p className="text-xs">1280x720 @ 15fps</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
