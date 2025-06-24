
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Box, Crosshair, Gauge } from "lucide-react";

export function Status() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Robot Status</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border-gray-300 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-800 flex items-center gap-2">
              <Box size={20} />
              3D Robot Visualization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border border-gray-300">
              <div className="text-center text-gray-500">
                <Box size={64} className="mx-auto mb-4" />
                <p className="text-lg">3D Robot Model</p>
                <p className="text-sm">Interactive visualization will appear here</p>
                <p className="text-xs mt-2">Current pose: [15.2°, -67.8°, 102.3°, -12.1°, 89.7°, 34.5°]</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-white border-gray-300 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-800 flex items-center gap-2">
                <Crosshair size={20} />
                Current Position
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Cartesian (mm)</h4>
                  <div className="space-y-1 font-mono text-sm text-gray-800">
                    <div>X: 456.78</div>
                    <div>Y: 123.45</div>
                    <div>Z: 789.01</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Rotation (°)</h4>
                  <div className="space-y-1 font-mono text-sm text-gray-800">
                    <div>RX: 12.34</div>
                    <div>RY: -45.67</div>
                    <div>RZ: 78.90</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-300 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-800 flex items-center gap-2">
                <Gauge size={20} />
                Joint Positions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: "J1", value: 15.2, limit: 180 },
                  { name: "J2", value: -67.8, limit: 180 },
                  { name: "J3", value: 102.3, limit: 180 },
                  { name: "J4", value: -12.1, limit: 180 },
                  { name: "J5", value: 89.7, limit: 180 },
                  { name: "J6", value: 34.5, limit: 180 }
                ].map((joint) => (
                  <div key={joint.name} className="p-2 bg-gray-50 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">{joint.name}</span>
                      <span className="text-xs font-mono text-gray-800">{joint.value}°</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded">
                      <div 
                        className="h-2 bg-blue-500 rounded"
                        style={{
                          width: `${Math.abs(joint.value) / joint.limit * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-300 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-800">Robot State</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-green-500 text-white">Connected</Badge>
                <Badge className="bg-blue-500 text-white">Idle</Badge>
                <Badge className="bg-orange-500 text-white">Manual Mode</Badge>
                <Badge variant="outline" className="border-gray-300">Safety OK</Badge>
              </div>
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <div>Speed: 50% (25 mm/s)</div>
                <div>Acceleration: 100 mm/s²</div>
                <div>TCP Load: 2.5 kg</div>
                <div>Last Move: 2 minutes ago</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
