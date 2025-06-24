
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Wifi, Camera, Database, Clock, Zap } from "lucide-react";

export function Dashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border-gray-300 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Robot Status</CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">Active</div>
            <Badge className="bg-green-500 text-white mt-2">Connected</Badge>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-300 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Connection</CardTitle>
            <Wifi className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">TCP/IP</div>
            <p className="text-xs text-gray-500 mt-2">192.168.1.100:502</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-300 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Camera Feeds</CardTitle>
            <Camera className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">2/3</div>
            <p className="text-xs text-gray-500 mt-2">Active feeds</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-300 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Positions</CardTitle>
            <Database className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">12</div>
            <p className="text-xs text-gray-500 mt-2">Saved positions</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border-gray-300 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-800 flex items-center gap-2">
              <Clock size={20} />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm text-gray-700">Position "device1_pick" executed</span>
                <span className="text-xs text-gray-500">2 min ago</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm text-gray-700">Robot moved to home_ultra</span>
                <span className="text-xs text-gray-500">5 min ago</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm text-gray-700">New position saved: device2_approach</span>
                <span className="text-xs text-gray-500">12 min ago</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm text-gray-700">Camera 2 connected</span>
                <span className="text-xs text-gray-500">1 hour ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-300 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-800 flex items-center gap-2">
              <Zap size={20} />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">CPU Usage</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-gray-200 rounded">
                    <div className="w-3/5 h-2 bg-green-500 rounded"></div>
                  </div>
                  <span className="text-xs text-gray-500">60%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Memory Usage</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-gray-200 rounded">
                    <div className="w-2/5 h-2 bg-blue-500 rounded"></div>
                  </div>
                  <span className="text-xs text-gray-500">40%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Network Latency</span>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-500 text-white">5ms</Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Uptime</span>
                <span className="text-sm font-mono text-gray-800">24h 15m</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
