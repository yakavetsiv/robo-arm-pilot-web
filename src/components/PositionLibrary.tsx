
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash, Camera } from "lucide-react";

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
  joints: number[];
  created: string;
}

export function PositionLibrary() {
  const [positions, setPositions] = useState<Position[]>([
    {
      id: 1,
      name: "home_ultra",
      type: "home_ultra",
      x: 400, y: 0, z: 600,
      rx: 0, ry: 0, rz: 0,
      joints: [0, -90, 90, 0, 90, 0],
      created: "2024-06-24 10:30"
    },
    {
      id: 2,
      name: "home_super",
      type: "home_super",
      x: 350, y: 50, z: 650,
      rx: 0, ry: 0, rz: 0,
      joints: [10, -85, 85, 0, 95, 10],
      created: "2024-06-24 10:35"
    },
    {
      id: 3,
      name: "device1_home",
      type: "position",
      subtype: "home",
      x: 200, y: 300, z: 400,
      rx: 180, ry: 0, rz: 0,
      joints: [45, -60, 120, 0, 60, 45],
      created: "2024-06-24 11:15"
    }
  ]);

  const [editingPosition, setEditingPosition] = useState<Position | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPosition, setNewPosition] = useState({
    name: "",
    type: "home_ultra" as "home_ultra" | "home_super" | "position",
    subtype: "home" as "home" | "approach" | "pick" | "retreat",
    x: 0, y: 0, z: 0,
    rx: 0, ry: 0, rz: 0,
    joints: [0, 0, 0, 0, 0, 0]
  });

  const getTypeColor = (type: string, subtype?: string) => {
    if (type === "home_ultra") return "bg-green-500";
    if (type === "home_super") return "bg-blue-500";
    if (type === "position") {
      switch (subtype) {
        case "home": return "bg-purple-500";
        case "approach": return "bg-orange-500";
        case "pick": return "bg-red-500";
        case "retreat": return "bg-yellow-500";
        default: return "bg-gray-500";
      }
    }
    return "bg-gray-500";
  };

  const deletePosition = (id: number) => {
    setPositions(positions.filter(p => p.id !== id));
  };

  const savePosition = () => {
    if (editingPosition) {
      setPositions(positions.map(p => p.id === editingPosition.id ? { ...editingPosition } : p));
    } else {
      const id = Math.max(...positions.map(p => p.id), 0) + 1;
      const positionData: Position = {
        ...newPosition,
        id,
        created: new Date().toLocaleString(),
        subtype: newPosition.type === "position" ? newPosition.subtype : undefined
      };
      setPositions([...positions, positionData]);
    }
    setIsDialogOpen(false);
    setEditingPosition(null);
    setNewPosition({
      name: "",
      type: "home_ultra",
      subtype: "home",
      x: 0, y: 0, z: 0,
      rx: 0, ry: 0, rz: 0,
      joints: [0, 0, 0, 0, 0, 0]
    });
  };

  const getCurrentPosition = () => {
    // Mock current robot position
    setNewPosition({
      ...newPosition,
      x: 123.4, y: 567.8, z: 890.1,
      rx: 12.3, ry: -45.6, rz: 78.9,
      joints: [15.2, -67.8, 102.3, -12.1, 89.7, 34.5]
    });
  };

  const findAprilTagPosition = () => {
    // Mock April tag detection
    setNewPosition({
      ...newPosition,
      x: 250.0, y: 180.0, z: 420.0,
      rx: 0, ry: 0, rz: 90,
      joints: [30.0, -45.0, 90.0, 0, 45.0, 30.0]
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Position Library</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Plus size={16} className="mr-2" />
              Add Position
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-white border-gray-300 text-gray-800">
            <DialogHeader>
              <DialogTitle className="text-gray-800">
                {editingPosition ? "Edit Position" : "Add New Position"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <Label>Position Name</Label>
                  <Input
                    value={editingPosition?.name || newPosition.name}
                    onChange={(e) => editingPosition 
                      ? setEditingPosition({...editingPosition, name: e.target.value})
                      : setNewPosition({...newPosition, name: e.target.value})
                    }
                    className="bg-gray-50 border-gray-300"
                    placeholder="e.g., device1_pick"
                  />
                </div>
                <div>
                  <Label>Position Type</Label>
                  <Select
                    value={editingPosition?.type || newPosition.type}
                    onValueChange={(value: "home_ultra" | "home_super" | "position") => 
                      editingPosition 
                        ? setEditingPosition({...editingPosition, type: value})
                        : setNewPosition({...newPosition, type: value})
                    }
                  >
                    <SelectTrigger className="bg-gray-50 border-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-300">
                      <SelectItem value="home_ultra">Home Ultra</SelectItem>
                      <SelectItem value="home_super">Home Super</SelectItem>
                      <SelectItem value="position">Position</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {((editingPosition?.type || newPosition.type) === "position") && (
                  <div>
                    <Label>Position Subtype</Label>
                    <Select
                      value={editingPosition?.subtype || newPosition.subtype}
                      onValueChange={(value: "home" | "approach" | "pick" | "retreat") => 
                        editingPosition 
                          ? setEditingPosition({...editingPosition, subtype: value})
                          : setNewPosition({...newPosition, subtype: value})
                      }
                    >
                      <SelectTrigger className="bg-gray-50 border-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-300">
                        <SelectItem value="home">Home</SelectItem>
                        <SelectItem value="approach">Approach</SelectItem>
                        <SelectItem value="pick">Pick</SelectItem>
                        <SelectItem value="retreat">Retreat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div className="space-y-2">
                  <Label>Cartesian Position (mm)</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['x', 'y', 'z'] as const).map(axis => (
                      <Input
                        key={axis}
                        type="number"
                        placeholder={axis.toUpperCase()}
                        value={editingPosition ? editingPosition[axis].toString() : newPosition[axis].toString()}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value) || 0;
                          editingPosition 
                            ? setEditingPosition({...editingPosition, [axis]: value})
                            : setNewPosition({...newPosition, [axis]: value});
                        }}
                        className="bg-gray-50 border-gray-300"
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Rotation (degrees)</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['rx', 'ry', 'rz'] as const).map(axis => (
                      <Input
                        key={axis}
                        type="number"
                        placeholder={axis.toUpperCase()}
                        value={editingPosition ? editingPosition[axis].toString() : newPosition[axis].toString()}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value) || 0;
                          editingPosition 
                            ? setEditingPosition({...editingPosition, [axis]: value})
                            : setNewPosition({...newPosition, [axis]: value});
                        }}
                        className="bg-gray-50 border-gray-300"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Button onClick={getCurrentPosition} size="sm" variant="outline" className="flex-1 border-gray-300">
                    Current Position
                  </Button>
                  <Button onClick={findAprilTagPosition} size="sm" variant="outline" className="flex-1 border-gray-300">
                    <Camera size={16} className="mr-1" />
                    April Tag
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label>Joint Angles (degrees)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {(editingPosition?.joints || newPosition.joints).map((joint, index) => (
                      <Input
                        key={index}
                        type="number"
                        placeholder={`J${index + 1}`}
                        value={joint.toString()}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value) || 0;
                          const currentJoints = editingPosition?.joints || newPosition.joints;
                          const newJoints = [...currentJoints];
                          newJoints[index] = value;
                          editingPosition 
                            ? setEditingPosition({...editingPosition, joints: newJoints})
                            : setNewPosition({...newPosition, joints: newJoints});
                        }}
                        className="bg-gray-50 border-gray-300"
                      />
                    ))}
                  </div>
                </div>
                <Button onClick={savePosition} className="w-full bg-green-600 hover:bg-green-700 text-white">
                  {editingPosition ? "Update Position" : "Save Position"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {positions.map((position) => (
          <Card key={position.id} className="bg-white border-gray-300 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-gray-800 text-lg">{position.name}</CardTitle>
                <div className="flex gap-2">
                  <Badge className={getTypeColor(position.type, position.subtype)}>
                    {position.type}
                  </Badge>
                  {position.subtype && (
                    <Badge variant="outline" className="border-gray-300">
                      {position.subtype}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">Position:</span>
                  <div className="font-mono text-xs text-gray-800">
                    X: {position.x}<br/>
                    Y: {position.y}<br/>
                    Z: {position.z}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Rotation:</span>
                  <div className="font-mono text-xs text-gray-800">
                    RX: {position.rx}<br/>
                    RY: {position.ry}<br/>
                    RZ: {position.rz}
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                Created: {position.created}
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  onClick={() => {
                    setEditingPosition(position);
                    setIsDialogOpen(true);
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Edit size={14} className="mr-1" />
                  Edit
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => deletePosition(position.id)}
                  className="border-red-500 text-red-600 hover:bg-red-600 hover:text-white"
                >
                  <Trash size={14} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
