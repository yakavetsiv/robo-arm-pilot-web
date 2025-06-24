
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Robot2DVisualizationProps {
  joints: number[];
  robotType?: "5-axis" | "6-axis";
}

export function Robot2DVisualization({ joints, robotType = "6-axis" }: Robot2DVisualizationProps) {
  const activeJoints = robotType === "5-axis" ? joints.slice(0, 5) : joints;
  
  // Calculate positions for robot arm visualization
  const armSegments = activeJoints.map((angle, index) => {
    const length = 40 - (index * 5); // Decreasing segment lengths
    const totalAngle = activeJoints.slice(0, index + 1).reduce((sum, a) => sum + a, 0);
    return {
      angle: totalAngle,
      length,
      jointAngle: angle
    };
  });

  const getJointColor = (angle: number) => {
    const absAngle = Math.abs(angle);
    if (absAngle > 150) return "text-red-600 bg-red-100";
    if (absAngle > 90) return "text-orange-600 bg-orange-100";
    return "text-green-600 bg-green-100";
  };

  return (
    <Card className="bg-white border-gray-200 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-gray-900 flex items-center gap-2">
            Robot Arm Visualization
          </CardTitle>
          <Badge variant="outline" className="border-gray-300 text-gray-600">
            {robotType}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* 2D Robot Visualization */}
          <div className="flex-1">
            <div className="relative bg-gray-50 rounded-lg p-8" style={{ height: "300px" }}>
              <svg 
                width="100%" 
                height="100%" 
                viewBox="0 0 300 250" 
                className="absolute inset-0"
              >
                {/* Grid background */}
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                {/* Base */}
                <circle cx="150" cy="200" r="15" fill="#4b5563" />
                <rect x="140" y="200" width="20" height="30" fill="#6b7280" />
                
                {/* Robot arm segments */}
                {armSegments.map((segment, index) => {
                  const prevSegments = armSegments.slice(0, index);
                  let x = 150;
                  let y = 200;
                  
                  // Calculate cumulative position
                  prevSegments.forEach(prevSeg => {
                    x += Math.cos((prevSeg.angle - 90) * Math.PI / 180) * prevSeg.length;
                    y += Math.sin((prevSeg.angle - 90) * Math.PI / 180) * prevSeg.length;
                  });
                  
                  const endX = x + Math.cos((segment.angle - 90) * Math.PI / 180) * segment.length;
                  const endY = y + Math.sin((segment.angle - 90) * Math.PI / 180) * segment.length;
                  
                  return (
                    <g key={index}>
                      {/* Arm segment */}
                      <line 
                        x1={x} 
                        y1={y} 
                        x2={endX} 
                        y2={endY} 
                        stroke="#374151" 
                        strokeWidth="6"
                        strokeLinecap="round"
                      />
                      {/* Joint */}
                      <circle 
                        cx={x} 
                        cy={y} 
                        r="8" 
                        fill="#1f2937" 
                        stroke="#fff" 
                        strokeWidth="2"
                      />
                      {/* Joint label */}
                      <text 
                        x={x} 
                        y={y - 15} 
                        textAnchor="middle" 
                        className="text-xs font-semibold fill-gray-700"
                      >
                        J{index + 1}
                      </text>
                      {/* End effector for last segment */}
                      {index === armSegments.length - 1 && (
                        <circle 
                          cx={endX} 
                          cy={endY} 
                          r="6" 
                          fill="#ef4444" 
                          stroke="#fff" 
                          strokeWidth="2"
                        />
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
          
          {/* Joint Status Panel */}
          <div className="w-full lg:w-80">
            <h4 className="font-semibold text-gray-700 mb-4 text-sm uppercase tracking-wide">Joint Status</h4>
            <div className="space-y-3">
              {activeJoints.map((joint, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${getJointColor(joint).split(' ')[1]}`}></div>
                    <span className="font-medium text-gray-700">Joint {index + 1}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${getJointColor(joint)}`}>
                      {joint.toFixed(1)}°
                    </span>
                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          Math.abs(joint) > 150 ? 'bg-red-500' : 
                          Math.abs(joint) > 90 ? 'bg-orange-500' : 'bg-green-500'
                        }`}
                        style={{
                          width: `${Math.min(Math.abs(joint) / 180 * 100, 100)}%`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Robot Health Indicators */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h5 className="font-semibold text-gray-700 mb-3 text-sm">Status Indicators</h5>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Overall Health</span>
                  <Badge className="bg-green-100 text-green-800 border-green-200">Good</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Range of Motion</span>
                  <span className="text-gray-900 font-mono">85%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Joint Stress</span>
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Medium</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
