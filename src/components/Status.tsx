
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Box, Crosshair, Gauge, Activity, Zap } from "lucide-react";
import { Robot2DVisualization } from "./Robot2DVisualization";

export function Status() {
  const currentPosition = {
    cartesian: { x: 456.78, y: 123.45, z: 789.01, rx: 12.34, ry: -45.67, rz: 78.90 },
    joints: [15.2, -67.8, 102.3, -12.1, 89.7, 34.5]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Robot Status</h2>
        <div className="flex gap-2">
          <Badge className="bg-green-100 text-green-800 border-green-200">Connected</Badge>
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">Idle</Badge>
        </div>
      </div>
      
      {/* 2D Robot Visualization */}
      <Robot2DVisualization joints={currentPosition.joints} robotType="6-axis" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <Crosshair size={20} className="text-blue-600" />
              Current Position
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide">Cartesian (mm)</h4>
                <div className="space-y-2">
                  {[
                    { label: 'X', value: currentPosition.cartesian.x, color: 'text-red-600' },
                    { label: 'Y', value: currentPosition.cartesian.y, color: 'text-green-600' },
                    { label: 'Z', value: currentPosition.cartesian.z, color: 'text-blue-600' }
                  ].map(({ label, value, color }) => (
                    <div key={label} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className={`font-medium ${color}`}>{label}</span>
                      <span className="font-mono text-sm text-gray-900">{value.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide">Rotation (°)</h4>
                <div className="space-y-2">
                  {[
                    { label: 'RX', value: currentPosition.cartesian.rx, color: 'text-red-600' },
                    { label: 'RY', value: currentPosition.cartesian.ry, color: 'text-green-600' },
                    { label: 'RZ', value: currentPosition.cartesian.rz, color: 'text-blue-600' }
                  ].map(({ label, value, color }) => (
                    <div key={label} className="flex justify-between items-center p-2 bg-gray-50 rounded">
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
              <Activity size={20} className="text-green-600" />
              Robot State
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-green-100 text-green-800 border-green-200">Connected</Badge>
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">Idle</Badge>
                <Badge className="bg-orange-100 text-orange-800 border-orange-200">Manual Mode</Badge>
                <Badge className="bg-gray-100 text-gray-800 border-gray-200">Safety OK</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Speed:</span>
                    <span className="font-medium text-gray-900">50% (25 mm/s)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Acceleration:</span>
                    <span className="font-medium text-gray-900">100 mm/s²</span>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">TCP Load:</span>
                    <span className="font-medium text-gray-900">2.5 kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Move:</span>
                    <span className="font-medium text-gray-900">2 min ago</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <Zap size={20} className="text-yellow-600" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: 'Position Accuracy', value: 95, unit: '%', color: 'bg-green-500' },
                { label: 'Movement Speed', value: 75, unit: '%', color: 'bg-blue-500' },
                { label: 'Joint Health', value: 88, unit: '%', color: 'bg-green-500' },
                { label: 'System Load', value: 45, unit: '%', color: 'bg-yellow-500' }
              ].map((metric, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{metric.label}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div 
                        className={`h-2 ${metric.color} rounded-full transition-all duration-300`}
                        style={{ width: `${metric.value}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded min-w-[3rem] text-center">
                      {metric.value}{metric.unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
