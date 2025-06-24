
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Video, VideoOff, Navigation, Camera, Target, MapPin, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, RotateCw, RotateUcw, Move3D, Hand, Power, Play, Square } from "lucide-react";
import { RobotControlsSheet } from "./RobotControlsSheet";

export function VideoStreams() {
  const [jointAngles, setJointAngles] = useState([0, 0, 0, 0, 0, 0]);
  const [cartesianPos, setCartesianPos] = useState({ x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0 });
  const [endEffectorState, setEndEffectorState] = useState("open");
  const [isRobotEnabled, setIsRobotEnabled] = useState(true);
  const [isMoving, setIsMoving] = useState(false);

  const handleJointChange = (jointIndex: number, value: number[]) => {
    const newAngles = [...jointAngles];
    newAngles[jointIndex] = value[0];
    setJointAngles(newAngles);
  };

  const handleCartesianChange = (axis: string, value: string) => {
    setCartesianPos(prev => ({
      ...prev,
      [axis]: parseFloat(value) || 0
    }));
  };

  const executeMovement = () => {
    setIsMoving(true);
    setTimeout(() => setIsMoving(false), 2000);
  };

  const handleDirectionalMove = (direction: string, amount: number = 10) => {
    const newPos = { ...cartesianPos };
    switch (direction) {
      case 'x+': newPos.x += amount; break;
      case 'x-': newPos.x -= amount; break;
      case 'y+': newPos.y += amount; break;
      case 'y-': newPos.y -= amount; break;
      case 'z+': newPos.z += amount; break;
      case 'z-': newPos.z -= amount; break;
    }
    setCartesianPos(newPos);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Camera Feeds & Robot Controls</h2>
        <RobotControlsSheet />
      </div>
      
      {/* Camera Feeds Section */}
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

      {/* Robot Controls Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Joint Controls */}
        <Card className="bg-white border-gray-300 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-800 flex items-center gap-2">
              <RotateCw size={20} />
              Joint Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {jointAngles.map((angle, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-gray-700">Joint {index + 1}</Label>
                  <span className="text-sm font-mono text-gray-800 bg-gray-100 px-2 py-1 rounded">
                    {angle.toFixed(1)}°
                  </span>
                </div>
                <Slider
                  value={[angle]}
                  onValueChange={(value) => handleJointChange(index, value)}
                  max={180}
                  min={-180}
                  step={0.1}
                  className="w-full"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Cartesian Controls */}
        <Card className="bg-white border-gray-300 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-800 flex items-center gap-2">
              <Move3D size={20} />
              Cartesian Controls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <Label className="text-gray-700 font-semibold">Position (mm)</Label>
                {['x', 'y', 'z'].map((axis) => (
                  <div key={axis} className="space-y-1">
                    <Label className="text-sm text-gray-600">{axis.toUpperCase()}</Label>
                    <Input
                      type="number"
                      value={cartesianPos[axis as keyof typeof cartesianPos]}
                      onChange={(e) => handleCartesianChange(axis, e.target.value)}
                      className="bg-white border-gray-300 text-gray-800"
                      placeholder="0.0"
                    />
                  </div>
                ))}
              </div>
              
              <div className="space-y-3">
                <Label className="text-gray-700 font-semibold">Rotation (degrees)</Label>
                {['rx', 'ry', 'rz'].map((axis) => (
                  <div key={axis} className="space-y-1">
                    <Label className="text-sm text-gray-600">{axis.toUpperCase()}</Label>
                    <Input
                      type="number"
                      value={cartesianPos[axis as keyof typeof cartesianPos]}
                      onChange={(e) => handleCartesianChange(axis, e.target.value)}
                      className="bg-white border-gray-300 text-gray-800"
                      placeholder="0.0"
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Simple Directional Controls */}
      <Card className="bg-white border-gray-300 shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-800 flex items-center gap-2">
            <Navigation size={20} />
            Simple Movement Controls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* XY Plane */}
            <div className="space-y-3">
              <Label className="text-gray-700 font-semibold">XY Movement</Label>
              <div className="grid grid-cols-3 gap-2 w-32 mx-auto">
                <div></div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-blue-500 text-blue-600 hover:bg-blue-600 hover:text-white"
                  onClick={() => handleDirectionalMove('y+')}
                >
                  <ArrowUp size={16} />
                </Button>
                <div></div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-blue-500 text-blue-600 hover:bg-blue-600 hover:text-white"
                  onClick={() => handleDirectionalMove('x-')}
                >
                  <ArrowLeft size={16} />
                </Button>
                <div className="flex items-center justify-center text-xs text-gray-500">XY</div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-blue-500 text-blue-600 hover:bg-blue-600 hover:text-white"
                  onClick={() => handleDirectionalMove('x+')}
                >
                  <ArrowRight size={16} />
                </Button>
                <div></div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-blue-500 text-blue-600 hover:bg-blue-600 hover:text-white"
                  onClick={() => handleDirectionalMove('y-')}
                >
                  <ArrowDown size={16} />
                </Button>
                <div></div>
              </div>
            </div>

            {/* Z Axis */}
            <div className="space-y-3">
              <Label className="text-gray-700 font-semibold">Z Movement</Label>
              <div className="flex flex-col gap-2 w-20 mx-auto">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-green-500 text-green-600 hover:bg-green-600 hover:text-white"
                  onClick={() => handleDirectionalMove('z+')}
                >
                  <ArrowUp size={16} />
                </Button>
                <div className="flex items-center justify-center text-xs text-gray-500 py-2">Z</div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-green-500 text-green-600 hover:bg-green-600 hover:text-white"
                  onClick={() => handleDirectionalMove('z-')}
                >
                  <ArrowDown size={16} />
                </Button>
              </div>
            </div>

            {/* Rotation */}
            <div className="space-y-3">
              <Label className="text-gray-700 font-semibold">Rotation</Label>
              <div className="flex gap-2 justify-center">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-purple-500 text-purple-600 hover:bg-purple-600 hover:text-white"
                  onClick={() => handleCartesianChange('rz', String(cartesianPos.rz - 10))}
                >
                  <RotateUcw size={16} />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-purple-500 text-purple-600 hover:bg-purple-600 hover:text-white"
                  onClick={() => handleCartesianChange('rz', String(cartesianPos.rz + 10))}
                >
                  <RotateCw size={16} />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* End Effector & System Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* End Effector Controls */}
        <Card className="bg-white border-gray-300 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-800 flex items-center gap-2">
              <Hand size={20} />
              End Effector
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-700">Gripper State</Label>
              <Select value={endEffectorState} onValueChange={setEndEffectorState}>
                <SelectTrigger className="bg-white border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-300">
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="semi-close">Semi-Closed</SelectItem>
                  <SelectItem value="close">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button className="bg-green-600 hover:bg-green-700 text-white flex-1">
                Open
              </Button>
              <Button className="bg-orange-600 hover:bg-orange-700 text-white flex-1">
                Semi
              </Button>
              <Button className="bg-red-600 hover:bg-red-700 text-white flex-1">
                Close
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* System Controls */}
        <Card className="bg-white border-gray-300 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-800 flex items-center gap-2">
              <Power size={20} />
              System Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-gray-700">Robot Enabled</Label>
              <Switch 
                checked={isRobotEnabled} 
                onCheckedChange={setIsRobotEnabled}
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={executeMovement} 
                disabled={isMoving || !isRobotEnabled}
                className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
              >
                <Play size={16} className="mr-2" />
                {isMoving ? "Moving..." : "Execute"}
              </Button>
              <Button 
                variant="outline" 
                className="border-red-500 text-red-600 hover:bg-red-600 hover:text-white"
                disabled={!isRobotEnabled}
              >
                <Square size={16} className="mr-2" />
                Stop
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
