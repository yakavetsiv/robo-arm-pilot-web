
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Wifi, Camera, Database, Clock, Zap, MapPin, Gauge } from "lucide-react";

export function Dashboard() {
  // Mock current robot position data
  const currentPosition = {
    cartesian: {
      x: 456.78,
      y: 123.45,
      z: 789.01,
      rx: 12.34,
      ry: -45.67,
      rz: 78.90
    },
    joints: [15.2, -67.8, 102.3, -12.1, 89.7, 34.5]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Robot Control Dashboard</h2>
        <Badge className="bg-green-100 text-green-800 border-green-200 px-3 py-1">
          System Online
        </Badge>
      </div>
      
      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-gray-600">Robot Status</CardTitle>
            <Activity className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">Active</div>
            <Badge className="bg-green-100 text-green-800 border-green-200 mt-2">Connected</Badge>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-gray-600">Connection</CardTitle>
            <Wifi className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">TCP/IP</div>
            <p className="text-xs text-gray-500 mt-2">192.168.1.100:502</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-gray-600">Camera Feeds</CardTitle>
            <Camera className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">2/3</div>
            <p className="text-xs text-gray-500 mt-2">Active feeds</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-gray-600">Positions</CardTitle>
            <Database className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">12</div>
            <p className="text-xs text-gray-500 mt-2">Saved positions</p>
          </CardContent>
        </Card>
      </div>

      {/* Current Position Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <MapPin size={20} className="text-blue-600" />
              Current Robot Position
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Cartesian (mm)</h4>
                <div className="space-y-3">
                  {[
                    { label: 'X', value: currentPosition.cartesian.x, color: 'text-red-600' },
                    { label: 'Y', value: currentPosition.cartesian.y, color: 'text-green-600' },
                    { label: 'Z', value: currentPosition.cartesian.z, color: 'text-blue-600' }
                  ].map(({ label, value, color }) => (
                    <div key={label} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <span className={`font-medium ${color}`}>{label}</span>
                      <span className="font-mono text-sm text-gray-900">{value.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Rotation (°)</h4>
                <div className="space-y-3">
                  {[
                    { label: 'RX', value: currentPosition.cartesian.rx, color: 'text-red-600' },
                    { label: 'RY', value: currentPosition.cartesian.ry, color: 'text-green-600' },
                    { label: 'RZ', value: currentPosition.cartesian.rz, color: 'text-blue-600' }
                  ].map(({ label, value, color }) => (
                    <div key={label} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <span className={`font-medium ${color}`}>{label}</span>
                      <span className="font-mono text-sm text-gray-900">{value.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <Gauge size={20} className="text-purple-600" />
              Joint Positions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {currentPosition.joints.map((joint, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-700">J{index + 1}</span>
                    <span className="text-xs font-mono text-gray-900 bg-white px-2 py-1 rounded">
                      {joint.toFixed(1)}°
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        Math.abs(joint) > 90 ? 'bg-orange-500' : 'bg-blue-500'
                      }`}
                      style={{
                        width: `${Math.min(Math.abs(joint) / 180 * 100, 100)}%`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <Clock size={20} className="text-indigo-600" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { action: 'Position "device1_pick" executed', time: '2 min ago', status: 'success' },
                { action: 'Robot moved to home_ultra', time: '5 min ago', status: 'success' },
                { action: 'New position saved: device2_approach', time: '12 min ago', status: 'info' },
                { action: 'Camera 2 connected', time: '1 hour ago', status: 'success' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'success' ? 'bg-green-500' : 
                      activity.status === 'info' ? 'bg-blue-500' : 'bg-gray-400'
                    }`}></div>
                    <span className="text-sm text-gray-700">{activity.action}</span>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <Zap size={20} className="text-yellow-600" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: 'CPU Usage', value: 60, color: 'bg-green-500' },
                { label: 'Memory Usage', value: 40, color: 'bg-blue-500' },
                { label: 'Network Latency', value: 5, color: 'bg-green-500', unit: 'ms' }
              ].map((metric, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{metric.label}</span>
                  <div className="flex items-center gap-3">
                    {metric.unit !== 'ms' && (
                      <div className="w-24 h-2 bg-gray-200 rounded-full">
                        <div 
                          className={`h-2 ${metric.color} rounded-full transition-all duration-300`}
                          style={{ width: `${metric.value}%` }}
                        ></div>
                      </div>
                    )}
                    <span className="text-xs font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded min-w-[3rem] text-center">
                      {metric.value}{metric.unit || '%'}
                    </span>
                  </div>
                </div>
              ))}
              <div className="pt-2 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Uptime</span>
                  <span className="text-sm font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded">24h 15m</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
