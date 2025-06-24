
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Position {
  id: number;
  name: string;
  type: "home_ultra" | "home_super" | "position";
  subtype?: "home" | "approach" | "pick" | "retreat";
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
  rz: number;
}

interface Position3DVisualizationProps {
  positions: Position[];
}

export function Position3DVisualization({ positions }: Position3DVisualizationProps) {
  const getPositionColor = (type: string, subtype?: string) => {
    if (type === "home_ultra") return "#10b981";
    if (type === "home_super") return "#3b82f6";
    if (type === "position") {
      switch (subtype) {
        case "home": return "#8b5cf6";
        case "approach": return "#f59e0b";
        case "pick": return "#ef4444";
        case "retreat": return "#eab308";
        default: return "#6b7280";
      }
    }
    return "#6b7280";
  };

  // Scale positions for visualization
  const scalePosition = (pos: number, axis: 'x' | 'y' | 'z') => {
    const maxRange = 800;
    const minRange = -400;
    const scale = 200 / (maxRange - minRange);
    return pos * scale + 150;
  };

  return (
    <Card className="bg-white border-gray-300 shadow-sm">
      <CardHeader>
        <CardTitle className="text-gray-800">3D Position Map</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative bg-gray-50 rounded-lg p-4" style={{ height: "400px" }}>
          <svg width="100%" height="100%" viewBox="0 0 350 350" className="absolute inset-0">
            {/* Grid background */}
            <defs>
              <pattern id="grid3d" width="25" height="25" patternUnits="userSpaceOnUse">
                <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid3d)" />
            
            {/* Coordinate axes */}
            <g stroke="#374151" strokeWidth="2" opacity="0.7">
              {/* X axis */}
              <line x1="50" y1="300" x2="300" y2="300" />
              <text x="310" y="305" className="text-xs fill-gray-600">X</text>
              
              {/* Y axis */}
              <line x1="50" y1="300" x2="50" y2="50" />
              <text x="45" y="45" className="text-xs fill-gray-600">Y</text>
              
              {/* Z axis (perspective) */}
              <line x1="50" y1="300" x2="150" y2="200" />
              <text x="155" y="195" className="text-xs fill-gray-600">Z</text>
            </g>
            
            {/* Positions */}
            {positions.map((position, index) => {
              const x = scalePosition(position.x, 'x');
              const y = 350 - scalePosition(position.y, 'y');
              const z = scalePosition(position.z, 'z') * 0.3; // Perspective scaling
              const color = getPositionColor(position.type, position.subtype);
              
              return (
                <g key={position.id}>
                  {/* Position point */}
                  <circle
                    cx={x + z}
                    cy={y - z}
                    r="8"
                    fill={color}
                    stroke="#fff"
                    strokeWidth="2"
                    opacity="0.8"
                  />
                  
                  {/* Direction vector */}
                  <g stroke={color} strokeWidth="2" opacity="0.6">
                    <line
                      x1={x + z}
                      y1={y - z}
                      x2={x + z + Math.cos(position.rx * Math.PI / 180) * 20}
                      y2={y - z + Math.sin(position.rx * Math.PI / 180) * 20}
                    />
                    <polygon
                      points={`${x + z + Math.cos(position.rx * Math.PI / 180) * 20},${y - z + Math.sin(position.rx * Math.PI / 180) * 20} ${x + z + Math.cos(position.rx * Math.PI / 180) * 15 - 3},${y - z + Math.sin(position.rx * Math.PI / 180) * 15 - 3} ${x + z + Math.cos(position.rx * Math.PI / 180) * 15 + 3},${y - z + Math.sin(position.rx * Math.PI / 180) * 15 + 3}`}
                      fill={color}
                    />
                  </g>
                  
                  {/* Label */}
                  <text
                    x={x + z}
                    y={y - z - 15}
                    textAnchor="middle"
                    className="text-xs font-semibold fill-gray-700"
                  >
                    {position.name.length > 8 ? position.name.substring(0, 8) + '...' : position.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
        
        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs text-gray-600">Home Ultra</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-xs text-gray-600">Home Super</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-xs text-gray-600">Home</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-xs text-gray-600">Approach</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-xs text-gray-600">Pick</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-xs text-gray-600">Retreat</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
