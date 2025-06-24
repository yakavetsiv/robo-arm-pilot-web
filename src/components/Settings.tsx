
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Settings as SettingsIcon, Wifi, Usb } from "lucide-react";

export function Settings() {
  const [robotDriver, setRobotDriver] = useState("universal_robots");
  const [connectionType, setConnectionType] = useState("tcp");
  const [tcpSettings, setTcpSettings] = useState({
    host: "192.168.1.100",
    port: "502"
  });
  const [comSettings, setComSettings] = useState({
    port: "COM3",
    baudRate: "115200"
  });

  const robotDrivers = [
    { value: "universal_robots", label: "Universal Robots (UR)", description: "UR3, UR5, UR10, UR16 series" },
    { value: "kuka", label: "KUKA", description: "KR series, LBR iiwa" },
    { value: "abb", label: "ABB", description: "IRB series" },
    { value: "fanuc", label: "FANUC", description: "LR Mate, M-10iA series" },
    { value: "denso", label: "DENSO", description: "VS series" },
    { value: "custom", label: "Custom Driver", description: "Generic/Custom implementation" }
  ];

  const comPorts = ["COM1", "COM2", "COM3", "COM4", "COM5", "COM6", "COM7", "COM8"];
  const baudRates = ["9600", "19200", "38400", "57600", "115200", "230400"];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <SettingsIcon size={24} className="text-gray-700" />
        <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border-gray-300 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-800">Robot Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-gray-700">Robot Driver</Label>
              <Select value={robotDriver} onValueChange={setRobotDriver}>
                <SelectTrigger className="bg-gray-50 border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-300">
                  {robotDrivers.map((driver) => (
                    <SelectItem key={driver.value} value={driver.value}>
                      <div>
                        <div className="font-medium">{driver.label}</div>
                        <div className="text-xs text-gray-500">{driver.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-gray-700">Connection Type</Label>
              <div className="flex gap-2 mt-2">
                <Button
                  variant={connectionType === "tcp" ? "default" : "outline"}
                  onClick={() => setConnectionType("tcp")}
                  className={connectionType === "tcp" ? "bg-blue-600 text-white" : "border-gray-300"}
                >
                  <Wifi size={16} className="mr-2" />
                  TCP/IP
                </Button>
                <Button
                  variant={connectionType === "com" ? "default" : "outline"}
                  onClick={() => setConnectionType("com")}
                  className={connectionType === "com" ? "bg-blue-600 text-white" : "border-gray-300"}
                >
                  <Usb size={16} className="mr-2" />
                  COM Port
                </Button>
              </div>
            </div>

            {connectionType === "tcp" && (
              <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-800">TCP/IP Settings</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-gray-700">Host/IP Address</Label>
                    <Input
                      value={tcpSettings.host}
                      onChange={(e) => setTcpSettings({...tcpSettings, host: e.target.value})}
                      placeholder="192.168.1.100"
                      className="bg-white border-gray-300"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700">Port</Label>
                    <Input
                      value={tcpSettings.port}
                      onChange={(e) => setTcpSettings({...tcpSettings, port: e.target.value})}
                      placeholder="502"
                      className="bg-white border-gray-300"
                    />
                  </div>
                </div>
              </div>
            )}

            {connectionType === "com" && (
              <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-800">COM Port Settings</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-gray-700">COM Port</Label>
                    <Select value={comSettings.port} onValueChange={(value) => setComSettings({...comSettings, port: value})}>
                      <SelectTrigger className="bg-white border-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-300">
                        {comPorts.map((port) => (
                          <SelectItem key={port} value={port}>{port}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-gray-700">Baud Rate</Label>
                    <Select value={comSettings.baudRate} onValueChange={(value) => setComSettings({...comSettings, baudRate: value})}>
                      <SelectTrigger className="bg-white border-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-300">
                        {baudRates.map((rate) => (
                          <SelectItem key={rate} value={rate}>{rate}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-4">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Save Configuration
              </Button>
              <Button variant="outline" className="border-gray-300">
                Test Connection
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-300 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-800">Connection Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div>
                <div className="font-medium text-green-800">Robot Connection</div>
                <div className="text-sm text-green-600">Connected via TCP/IP</div>
              </div>
              <Badge className="bg-green-500 text-white">Active</Badge>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-gray-800">Connection Details</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <div>Driver: {robotDrivers.find(d => d.value === robotDriver)?.label}</div>
                <div>Type: {connectionType === "tcp" ? "TCP/IP" :  "COM Port"}</div>
                <div>
                  Address: {connectionType === "tcp" 
                    ? `${tcpSettings.host}:${tcpSettings.port}` 
                    : `${comSettings.port} @ ${comSettings.baudRate}`
                  }
                </div>
                <div>Latency: 5ms</div>
                <div>Uptime: 24h 15m</div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h4 className="font-medium text-gray-800 mb-2">Quick Actions</h4>
              <div className="flex flex-col gap-2">
                <Button variant="outline" size="sm" className="border-gray-300 justify-start">
                  Restart Connection
                </Button>
                <Button variant="outline" size="sm" className="border-gray-300 justify-start">
                  Reset to Factory Settings
                </Button>
                <Button variant="outline" size="sm" className="border-gray-300 justify-start">
                  Export Configuration
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
