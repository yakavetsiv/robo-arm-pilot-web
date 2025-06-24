
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Square, RotateCcw } from "lucide-react";

export function RobotControls() {
  const [jointAngles, setJointAngles] = useState([0, 0, 0, 0, 0, 0]);
  const [cartesianPos, setCartesianPos] = useState({ x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0 });
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-cyan-400">Robot Controls</h2>
        <div className="flex gap-2">
          <Button 
            onClick={executeMovement} 
            disabled={isMoving}
            className="bg-green-600 hover:bg-green-700"
          >
            <Play size={16} className="mr-2" />
            {isMoving ? "Moving..." : "Execute"}
          </Button>
          <Button variant="outline" className="border-red-500 text-red-400 hover:bg-red-600 hover:text-white">
            <Square size={16} className="mr-2" />
            Stop
          </Button>
          <Button variant="outline" className="border-orange-500 text-orange-400 hover:bg-orange-600 hover:text-white">
            <RotateCcw size={16} className="mr-2" />
            Home
          </Button>
        </div>
      </div>

      <Tabs defaultValue="joints" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-slate-800">
          <TabsTrigger value="joints" className="data-[state=active]:bg-cyan-600">Joint Controls</TabsTrigger>
          <TabsTrigger value="cartesian" className="data-[state=active]:bg-cyan-600">Cartesian Controls</TabsTrigger>
        </TabsList>
        
        <TabsContent value="joints" className="space-y-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-cyan-400">Joint Angles (degrees)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {jointAngles.map((angle, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-slate-300">Joint {index + 1}</Label>
                    <span className="text-sm font-mono text-cyan-400">{angle.toFixed(1)}°</span>
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
        </TabsContent>
        
        <TabsContent value="cartesian" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-cyan-400">Position (mm)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {['x', 'y', 'z'].map((axis) => (
                  <div key={axis} className="space-y-2">
                    <Label className="text-slate-300">{axis.toUpperCase()}</Label>
                    <Input
                      type="number"
                      value={cartesianPos[axis as keyof typeof cartesianPos]}
                      onChange={(e) => handleCartesianChange(axis, e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="0.0"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-cyan-400">Rotation (degrees)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {['rx', 'ry', 'rz'].map((axis) => (
                  <div key={axis} className="space-y-2">
                    <Label className="text-slate-300">{axis.toUpperCase()}</Label>
                    <Input
                      type="number"
                      value={cartesianPos[axis as keyof typeof cartesianPos]}
                      onChange={(e) => handleCartesianChange(axis, e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="0.0"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
