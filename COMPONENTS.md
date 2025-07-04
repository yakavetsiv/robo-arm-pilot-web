# Component Documentation

This document provides detailed information about each component in the Robot Control Interface, including their purpose, props, state management, and usage examples.

## Core Application Components

### Dashboard.tsx

**Purpose**: Main dashboard providing overview of robot status and quick access to controls.

**Features**:
- Current robot position display (joints and Cartesian)
- Robot status indicators
- Quick action cards
- System health monitoring

**State Management**:
```typescript
const [robotStatus, setRobotStatus] = useState({
  isConnected: true,
  currentPosition: {
    joints: [0, 0, 0, 0, 0, 0],
    cartesian: { x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0 }
  },
  isMoving: false,
  errors: []
});
```

**Key Functions**:
- `refreshStatus()`: Updates robot status from API
- `handleQuickAction(action)`: Executes predefined robot actions

**Usage Example**:
```tsx
<Dashboard 
  onNavigateToControl={() => navigate('/controls')}
  onEmergencyStop={() => emergencyStop()}
/>
```

---

### VideoStreams.tsx

**Purpose**: Camera feeds display and comprehensive robot control interface.

**Features**:
- Live camera stream display (2 cameras)
- AprilTag detection and navigation
- Joint angle controls (6 joints, -180° to +180°)
- Cartesian position controls (X, Y, Z, RX, RY, RZ)
- Simple directional movement (arrow controls)
- End effector state management
- System enable/disable controls

**State Management**:
```typescript
const [jointAngles, setJointAngles] = useState([0, 0, 0, 0, 0, 0]);
const [cartesianPos, setCartesianPos] = useState({ 
  x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0 
});
const [endEffectorState, setEndEffectorState] = useState("open");
const [isRobotEnabled, setIsRobotEnabled] = useState(true);
const [isMoving, setIsMoving] = useState(false);
```

**Key Functions**:
- `handleJointChange(jointIndex, value)`: Updates individual joint angles
- `handleCartesianChange(axis, value)`: Updates Cartesian coordinates
- `handleDirectionalMove(direction, amount)`: Simple directional movement
- `executeMovement()`: Sends movement commands to robot
- `handleAprilTagDetection(cameraId)`: Triggers AprilTag detection
- `navigateToTag(tagId)`: Navigates robot to detected tag

**Props Interface**:
```typescript
interface VideoStreamsProps {
  onPositionUpdate?: (position: RobotPosition) => void;
  onError?: (error: string) => void;
  enabledFeatures?: {
    aprilTagDetection: boolean;
    manualControl: boolean;
    emergencyStop: boolean;
  };
}
```

---

### Settings.tsx

**Purpose**: Configuration interface for robots, cameras, and system settings.

**Features**:
- Robot selection and configuration
- Multi-camera setup with driver selection
- Stream configuration (RGB, depth, stereo)
- Communication protocol settings
- System parameters

**State Management**:
```typescript
const [selectedRobot, setSelectedRobot] = useState("");
const [cameras, setCameras] = useState([
  {
    id: "1",
    name: "Overview Camera",
    driver: "realsense",
    protocol: "tcp",
    address: "192.168.1.100",
    port: 8080,
    streams: { rgb: true, depth: false }
  }
]);
const [robots, setRobots] = useState([
  { id: "1", name: "UR5e", axes: 6, type: "collaborative" }
]);
```

**Key Functions**:
- `addCamera()`: Adds new camera configuration
- `updateCameraConfig(id, config)`: Updates camera settings
- `deleteCamera(id)`: Removes camera configuration
- `saveSettings()`: Persists configuration changes
- `testCameraConnection(id)`: Tests camera connectivity

**Camera Configuration Interface**:
```typescript
interface CameraConfig {
  id: string;
  name: string;
  driver: 'realsense' | 'kinect' | 'webcam' | 'custom';
  protocol: 'tcp' | 'udp' | 'usb' | 'ethernet';
  address: string;
  port?: number;
  streams: {
    rgb: boolean;
    depth: boolean;
    left?: boolean;
    right?: boolean;
  };
  resolution: {
    width: number;
    height: number;
    fps: number;
  };
}
```

---

### Status.tsx

**Purpose**: Real-time robot status monitoring and health display.

**Features**:
- 2D robot visualization with joint angles
- System health indicators
- Error reporting and alerts
- Connection status monitoring

**State Management**:
```typescript
const [robotHealth, setRobotHealth] = useState({
  overall: "good",
  joints: Array(6).fill("good"),
  communication: "connected",
  errors: [],
  warnings: []
});
```

**Integration with Robot2DVisualization**:
```tsx
<Robot2DVisualization 
  jointAngles={robotStatus.joints}
  isMoving={robotStatus.isMoving}
  highlightErrors={robotHealth.joints}
/>
```

---

### TaskTracking.tsx

**Purpose**: Task execution monitoring and performance analytics.

**Features**:
- Task execution history
- Performance statistics
- Individual task timing
- Success/failure tracking
- Task queue management

**State Management**:
```typescript
const [tasks, setTasks] = useState<Task[]>([]);
const [statistics, setStatistics] = useState({
  totalTasks: 0,
  completedTasks: 0,
  averageTime: 0,
  successRate: 0,
  tasksToday: 0
});
const [currentTask, setCurrentTask] = useState<Task | null>(null);
```

**Task Interface**:
```typescript
interface Task {
  id: string;
  name: string;
  type: 'movement' | 'pickup' | 'place' | 'scan';
  status: 'pending' | 'running' | 'completed' | 'failed';
  startTime?: Date;
  endTime?: Date;
  duration?: number;
  progress: number;
  parameters: Record<string, any>;
}
```

**Key Functions**:
- `startTask(task)`: Initiates task execution
- `updateTaskProgress(taskId, progress)`: Updates task progress
- `completeTask(taskId, result)`: Marks task as completed
- `calculateStatistics()`: Computes performance metrics

---

### Logs.tsx

**Purpose**: System log display and filtering.

**Features**:
- Real-time log streaming
- Log level filtering (Error, Warning, Info, Debug)
- Search and filtering capabilities
- Export functionality

**State Management**:
```typescript
const [logs, setLogs] = useState<LogEntry[]>([]);
const [filter, setFilter] = useState({
  level: "all",
  search: "",
  dateRange: { start: null, end: null }
});
```

**Log Entry Interface**:
```typescript
interface LogEntry {
  id: string;
  timestamp: Date;
  level: 'error' | 'warning' | 'info' | 'debug';
  message: string;
  source: string;
  details?: Record<string, any>;
}
```

---

### PositionLibrary.tsx

**Purpose**: Position management with 3D visualization and hierarchical relationships.

**Features**:
- Position list/grid view toggle
- Position creation and editing
- Grouped child positions for approach sequences
- 3D position visualization
- Position search and filtering

**State Management**:
```typescript
const [positions, setPositions] = useState<Position[]>([]);
const [viewMode, setViewMode] = useState<"list" | "grid">("list");
const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
const [editingPosition, setEditingPosition] = useState<Position | null>(null);
```

**Position Interface**:
```typescript
interface Position {
  id: string;
  name: string;
  type: 'fixed' | 'approach' | 'departure' | 'intermediate';
  coordinates: CartesianPosition;
  joints?: JointAngles;
  parentId?: string;
  children?: Position[];
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    description?: string;
  };
}
```

**Approach Position Handling**:
- Automatically creates 4 child positions: Pre-approach, Approach, Work, Departure
- Groups related positions visually
- Manages sequence relationships

---

## Visualization Components

### Position3DVisualization.tsx

**Purpose**: Interactive 3D visualization of robot positions and workspace.

**Features**:
- 3D coordinate system display
- Position markers with direction vectors
- Interactive camera controls
- Spatial relationship visualization
- Workspace boundary display

**Props Interface**:
```typescript
interface Position3DVisualizationProps {
  positions: Position[];
  selectedPosition?: string;
  onPositionSelect?: (positionId: string) => void;
  showVectors?: boolean;
  showWorkspace?: boolean;
  workspaceBounds?: {
    x: [number, number];
    y: [number, number];
    z: [number, number];
  };
}
```

**3D Rendering Features**:
- WebGL-based rendering for performance
- Configurable viewing angles
- Zoom and pan controls
- Position highlighting
- Vector direction indicators

---

### Robot2DVisualization.tsx

**Purpose**: 2D representation of robot arm showing joint angles and configuration.

**Features**:
- Real-time joint angle display
- Link visualization
- Base and end-effector indicators
- Joint limit visualization
- Movement animation

**Props Interface**:
```typescript
interface Robot2DVisualizationProps {
  jointAngles: number[];
  isMoving?: boolean;
  highlightJoint?: number;
  showLimits?: boolean;
  onJointClick?: (jointIndex: number) => void;
}
```

**Visualization Elements**:
- Joint circles with angle indicators
- Link lines connecting joints
- Base coordinate system
- End-effector position marker
- Joint limit indicators (red zones)

---

## Control Components

### RobotControls.tsx

**Purpose**: Comprehensive robot control interface.

**Features**:
- Joint angle sliders
- Cartesian position inputs
- Quick movement buttons
- Safety controls

**State Management**:
```typescript
const [controlMode, setControlMode] = useState<'joint' | 'cartesian'>('joint');
const [safetyLimits, setSafetyLimits] = useState({
  maxSpeed: 100,
  maxAcceleration: 50,
  workspaceLimits: { /* ... */ }
});
```

---

### RobotControlsSheet.tsx

**Purpose**: Mobile-optimized robot controls in a slide-out sheet.

**Features**:
- Touch-friendly controls
- Swipe gestures
- Simplified interface for mobile
- Essential controls only

**Usage**:
```tsx
<RobotControlsSheet 
  isOpen={showMobileControls}
  onClose={() => setShowMobileControls(false)}
  jointAngles={jointAngles}
  onJointChange={handleJointChange}
/>
```

---

## Navigation Components

### Sidebar.tsx

**Purpose**: Main navigation sidebar with responsive behavior.

**Features**:
- Collapsible design
- Active route highlighting
- Mobile-responsive
- Quick access buttons

**Navigation Items**:
```typescript
const navigationItems = [
  { title: "Dashboard", href: "/", icon: Home },
  { title: "Camera & Controls", href: "/controls", icon: Camera },
  { title: "Status", href: "/status", icon: Activity },
  { title: "Tasks", href: "/tasks", icon: CheckSquare },
  { title: "Positions", href: "/positions", icon: MapPin },
  { title: "Logs", href: "/logs", icon: FileText },
  { title: "Settings", href: "/settings", icon: Settings }
];
```

---

## UI Components (Shadcn/ui)

### Button Variants

**Available Variants**:
```typescript
// Primary action button
<Button variant="default">Execute Movement</Button>

// Secondary action
<Button variant="secondary">Save Position</Button>

// Outline button
<Button variant="outline">Cancel</Button>

// Destructive action
<Button variant="destructive">Emergency Stop</Button>

// Ghost button
<Button variant="ghost">Reset</Button>
```

**Size Options**:
```typescript
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
```

### Form Components

**Input with Validation**:
```tsx
<Label htmlFor="joint-angle">Joint 1 Angle</Label>
<Input
  id="joint-angle"
  type="number"
  min="-180"
  max="180"
  value={jointAngles[0]}
  onChange={(e) => handleJointChange(0, parseFloat(e.target.value))}
  className={errors.joint1 ? "border-destructive" : ""}
/>
{errors.joint1 && (
  <p className="text-sm text-destructive">{errors.joint1}</p>
)}
```

**Select Dropdown**:
```tsx
<Select value={selectedRobot} onValueChange={setSelectedRobot}>
  <SelectTrigger>
    <SelectValue placeholder="Select a robot" />
  </SelectTrigger>
  <SelectContent>
    {robots.map((robot) => (
      <SelectItem key={robot.id} value={robot.id}>
        {robot.name} ({robot.axes} axes)
      </SelectItem>
    ))}
  </SelectContent>
</Select>
```

**Slider Control**:
```tsx
<Slider
  value={[jointAngles[jointIndex]]}
  onValueChange={(value) => handleJointChange(jointIndex, value[0])}
  max={180}
  min={-180}
  step={0.1}
  className="w-full"
/>
```

### Layout Components

**Card Container**:
```tsx
<Card className="bg-card border-border">
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <Camera size={20} />
      Camera Controls
    </CardTitle>
  </CardHeader>
  <CardContent>
    {/* Card content */}
  </CardContent>
</Card>
```

**Sheet (Mobile Drawer)**:
```tsx
<Sheet open={isOpen} onOpenChange={setIsOpen}>
  <SheetTrigger asChild>
    <Button variant="outline">Open Controls</Button>
  </SheetTrigger>
  <SheetContent side="bottom" className="h-[90vh]">
    <SheetHeader>
      <SheetTitle>Robot Controls</SheetTitle>
    </SheetHeader>
    <div className="py-4">
      {/* Sheet content */}
    </div>
  </SheetContent>
</Sheet>
```

### Feedback Components

**Toast Notifications**:
```tsx
import { toast } from "sonner";

// Success message
toast.success("Robot movement completed successfully");

// Error message
toast.error("Failed to connect to robot: " + errorMessage);

// Warning message
toast.warning("Joint angle approaching limit");

// Info message
toast.info("Position saved to library");
```

**Alert Dialog**:
```tsx
<AlertDialog open={showEmergencyDialog} onOpenChange={setShowEmergencyDialog}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Emergency Stop</AlertDialogTitle>
      <AlertDialogDescription>
        This will immediately stop all robot movement. Continue?
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction 
        onClick={handleEmergencyStop}
        className="bg-destructive text-destructive-foreground"
      >
        Emergency Stop
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

## Component Integration Patterns

### Props Drilling Prevention

**Using Compound Components**:
```tsx
<RobotControlPanel>
  <RobotControlPanel.JointControls />
  <RobotControlPanel.CartesianControls />
  <RobotControlPanel.SafetyControls />
</RobotControlPanel>
```

**Context for Shared State**:
```tsx
const RobotContext = createContext();

export const RobotProvider = ({ children }) => {
  const [robotState, setRobotState] = useState(initialState);
  
  return (
    <RobotContext.Provider value={{ robotState, setRobotState }}>
      {children}
    </RobotContext.Provider>
  );
};

export const useRobot = () => useContext(RobotContext);
```

### Error Boundaries

**Component-Level Error Handling**:
```tsx
const withErrorBoundary = (Component) => {
  return (props) => (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Component {...props} />
    </ErrorBoundary>
  );
};

export default withErrorBoundary(RobotControls);
```

This comprehensive component documentation provides the foundation for understanding, maintaining, and extending the robot control interface.