
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Square, RotateCcw, Settings } from "lucide-react";

export function RobotControlsSheet() {
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
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Settings size={16} className="mr-2" />
          Robot Controls
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[500px] bg-white border-gray-300 text-gray-800 overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-gray-800">Robot Controls</SheetTitle>
        </SheetHeader>
        
        <div className="space-y-4 mt-6">
          <div className="flex gap-2">
            <Button 
              onClick={executeMovement} 
              disabled={isMoving}
              className="bg-green-600 hover:bg-green-700 text-white flex-1"
            >
              <Play size={16} className="mr-2" />
              {isMoving ? "Moving..." : "Execute"}
            </Button>
            <Button variant="outline" className="border-red-500 text-red-600 hover:bg-red-600 hover:text-white">
              <Square size={16} className="mr-2" />
              Stop
            </Button>
            <Button variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-600 hover:text-white">
              <RotateCcw size={16} className="mr-2" />
              Home
            </Button>
          </div>

          <Tabs defaultValue="joints" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-100">
              <TabsTrigger value="joints" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Joint Controls</TabsTrigger>
              <TabsTrigger value="cartesian" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Cartesian Controls</TabsTrigger>
            </TabsList>
            
            <TabsContent value="joints" className="space-y-4">
              <Card className="bg-white border-gray-300">
                <CardHeader>
                  <CardTitle className="text-gray-800">Joint Angles (degrees)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {jointAngles.map((angle, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-gray-700">Joint {index + 1}</Label>
                        <span className="text-sm font-mono text-gray-800">{angle.toFixed(1)}°</span>
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
              <div className="grid grid-cols-1 gap-4">
                <Card className="bg-white border-gray-300">
                  <CardHeader>
                    <CardTitle className="text-gray-800">Position (mm)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {['x', 'y', 'z'].map((axis) => (
                      <div key={axis} className="space-y-2">
                        <Label className="text-gray-700">{axis.toUpperCase()}</Label>
                        <Input
                          type="number"
                          value={cartesianPos[axis as keyof typeof cartesianPos]}
                          onChange={(e) => handleCartesianChange(axis, e.target.value)}
                          className="bg-gray-50 border-gray-300 text-gray-800"
                          placeholder="0.0"
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
                
                <Card className="bg-white border-gray-300">
                  <CardHeader>
                    <CardTitle className="text-gray-800">Rotation (degrees)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {['rx', 'ry', 'rz'].map((axis) => (
                      <div key={axis} className="space-y-2">
                        <Label className="text-gray-700">{axis.toUpperCase()}</Label>
                        <Input
                          type="number"
                          value={cartesianPos[axis as keyof typeof cartesianPos]}
                          onChange={(e) => handleCartesianChange(axis, e.target.value)}
                          className="bg-gray-50 border-gray-300 text-gray-800"
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
      </SheetContent>
    </Sheet>
  );
}
