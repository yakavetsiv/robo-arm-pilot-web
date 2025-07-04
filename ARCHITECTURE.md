# Architecture Documentation

## System Overview

The Robot Control Interface is a single-page application (SPA) built with React and TypeScript, designed to provide real-time control and monitoring of industrial robots through a modern web interface.

## Technology Stack

### Frontend Framework
- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Strong typing for better developer experience and code quality
- **Vite**: Fast build tool and development server

### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/ui**: Pre-built, customizable React components
- **Lucide React**: Modern icon library
- **Custom Design System**: Consistent theming through CSS variables

### Routing & Navigation
- **React Router DOM**: Client-side routing
- **Sidebar Navigation**: Collapsible sidebar with mobile support

### State Management
- **React Hooks**: useState, useEffect, useCallback, useMemo
- **Local Component State**: Each component manages its own state
- **Prop Drilling**: For simple parent-child communication
- **Context API**: For global theme and settings (when needed)

## Application Architecture

### Component Hierarchy

```
App.tsx
├── Sidebar.tsx
└── Routes
    ├── Index.tsx (Main Page)
    │   ├── Dashboard.tsx
    │   ├── VideoStreams.tsx
    │   ├── Status.tsx
    │   ├── TaskTracking.tsx
    │   ├── Logs.tsx
    │   ├── PositionLibrary.tsx
    │   └── Settings.tsx
    └── NotFound.tsx
```

### Data Flow Architecture

```
User Interaction
      ↓
UI Component
      ↓
State Update (useState)
      ↓
Re-render
      ↓
API Call (if needed)
      ↓
Backend/Robot System
```

## Component Architecture

### Core Components Design Pattern

Each main component follows this structure:

```typescript
// Component imports
import React, { useState, useEffect } from 'react';
import { UI components } from '@/components/ui';
import { Icons } from 'lucide-react';

// Type definitions
interface ComponentProps {
  // props interface
}

interface ComponentState {
  // state interface
}

// Main component
export function ComponentName({ props }: ComponentProps) {
  // State management
  const [state, setState] = useState<ComponentState>(initialState);
  
  // Event handlers
  const handleAction = (params) => {
    // logic
  };
  
  // Effects
  useEffect(() => {
    // side effects
  }, [dependencies]);
  
  // Render
  return (
    <div className="container">
      {/* JSX */}
    </div>
  );
}
```

### State Management Patterns

#### 1. Local Component State
```typescript
// Simple local state for UI interactions
const [isOpen, setIsOpen] = useState(false);
const [selectedTab, setSelectedTab] = useState('overview');
```

#### 2. Complex State Objects
```typescript
// Robot position state
const [robotPosition, setRobotPosition] = useState({
  joints: [0, 0, 0, 0, 0, 0],
  cartesian: { x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0 },
  endEffector: 'open'
});
```

#### 3. State Updates with Validation
```typescript
const updateJoint = (index: number, value: number) => {
  if (value >= -180 && value <= 180) {
    setJointAngles(prev => {
      const newAngles = [...prev];
      newAngles[index] = value;
      return newAngles;
    });
  }
};
```

## Design System Architecture

### CSS Variable System

The design system uses CSS custom properties for theming:

```css
:root {
  /* Color System */
  --background: 0 0% 100%;           /* Pure white */
  --foreground: 222.2 84% 4.9%;      /* Dark text */
  --primary: 222.2 47.4% 11.2%;      /* Primary brand */
  --secondary: 210 40% 96.1%;        /* Secondary bg */
  
  /* Component Variables */
  --border: 214.3 31.8% 91.4%;       /* Border color */
  --input: 214.3 31.8% 91.4%;        /* Input border */
  --radius: 0.5rem;                  /* Border radius */
}
```

### Color Usage Guidelines

1. **Semantic Colors**: Use HSL values for all colors
2. **Context-Aware**: Different colors for different states
3. **Accessibility**: Ensure proper contrast ratios
4. **Consistency**: Use design tokens, not hard-coded colors

```typescript
// ❌ Avoid hard-coded colors
<Button className="bg-blue-500 text-white">

// ✅ Use semantic design tokens
<Button variant="primary">
```

### Component Variant System

```typescript
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        outline: "border border-input bg-background"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8"
      }
    }
  }
);
```

## Data Models

### Robot Data Structures

```typescript
// Joint configuration
interface JointAngles {
  joint1: number; // -180 to 180 degrees
  joint2: number;
  joint3: number;
  joint4: number;
  joint5: number;
  joint6: number;
}

// Cartesian coordinates
interface CartesianPosition {
  x: number;      // X position in mm
  y: number;      // Y position in mm  
  z: number;      // Z position in mm
  rx: number;     // X rotation in degrees
  ry: number;     // Y rotation in degrees
  rz: number;     // Z rotation in degrees
}

// Robot state
interface RobotState {
  joints: JointAngles;
  cartesian: CartesianPosition;
  endEffector: 'open' | 'semi-close' | 'close';
  isEnabled: boolean;
  isMoving: boolean;
  lastUpdate: Date;
}
```

### Position Library Data

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
    creator: string;
    description?: string;
  };
}

// Approach positions have 4 child positions
interface ApproachPosition extends Position {
  type: 'approach';
  children: [
    Position, // Pre-approach
    Position, // Approach
    Position, // Work
    Position  // Departure
  ];
}
```

### Camera Configuration

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
  calibration?: {
    intrinsic: number[][];
    distortion: number[];
  };
}
```

### Task Tracking Data

```typescript
interface Task {
  id: string;
  name: string;
  type: 'movement' | 'pickup' | 'place' | 'scan' | 'custom';
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  startTime?: Date;
  endTime?: Date;
  duration?: number;
  parameters: Record<string, any>;
  result?: {
    success: boolean;
    data?: any;
    error?: string;
  };
}

interface TaskStatistics {
  totalTasks: number;
  completedTasks: number;
  failedTasks: number;
  averageExecutionTime: number;
  successRate: number;
  tasksToday: number;
  tasksThisWeek: number;
}
```

## Communication Architecture

### API Integration Pattern

```typescript
// API service structure
class RobotAPI {
  private baseURL: string;
  
  async moveJoints(angles: JointAngles): Promise<void> {
    const response = await fetch(`${this.baseURL}/robot/joints`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ joints: angles })
    });
    
    if (!response.ok) {
      throw new Error(`Robot movement failed: ${response.statusText}`);
    }
  }
  
  async getCurrentPosition(): Promise<RobotState> {
    const response = await fetch(`${this.baseURL}/robot/status`);
    return response.json();
  }
  
  async detectAprilTag(cameraId: string): Promise<AprilTagResult[]> {
    const response = await fetch(`${this.baseURL}/camera/${cameraId}/apriltag`);
    return response.json();
  }
}
```

### WebSocket for Real-time Data

```typescript
// Real-time robot status updates
class RobotWebSocket {
  private ws: WebSocket;
  
  connect(url: string) {
    this.ws = new WebSocket(url);
    
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.handleRobotUpdate(data);
    };
  }
  
  private handleRobotUpdate(data: RobotState) {
    // Update component state
    setRobotState(data);
  }
}
```

## Performance Considerations

### Optimization Strategies

1. **Component Memoization**
```typescript
const ExpensiveComponent = React.memo(({ data }) => {
  return <ComplexVisualization data={data} />;
});
```

2. **Callback Optimization**
```typescript
const handleJointChange = useCallback((index: number, value: number) => {
  setJointAngles(prev => {
    const newAngles = [...prev];
    newAngles[index] = value;
    return newAngles;
  });
}, []);
```

3. **Efficient State Updates**
```typescript
// Batch state updates
const updateRobotPosition = (newPosition: CartesianPosition) => {
  setRobotState(prev => ({
    ...prev,
    cartesian: newPosition,
    lastUpdate: new Date()
  }));
};
```

4. **Virtual Scrolling for Large Lists**
```typescript
// For position library with many positions
import { FixedSizeList as List } from 'react-window';

const PositionList = ({ positions }) => (
  <List
    height={400}
    itemCount={positions.length}
    itemSize={60}
    itemData={positions}
  >
    {PositionItem}
  </List>
);
```

## Error Handling Architecture

### Error Boundaries
```typescript
class RobotControlErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Robot control error:', error, errorInfo);
    // Log to monitoring service
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallbackUI error={this.state.error} />;
    }
    
    return this.props.children;
  }
}
```

### API Error Handling
```typescript
const useRobotAPI = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const executeCommand = async (command: () => Promise<any>) => {
    try {
      setLoading(true);
      setError(null);
      const result = await command();
      return result;
    } catch (err) {
      setError(err.message);
      toast.error(`Robot command failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  return { executeCommand, error, loading };
};
```

## Security Considerations

### Input Validation
```typescript
const validateJointAngle = (angle: number): boolean => {
  return angle >= -180 && angle <= 180;
};

const validateCartesianPosition = (pos: CartesianPosition): boolean => {
  const limits = {
    x: { min: -1000, max: 1000 },
    y: { min: -1000, max: 1000 },
    z: { min: 0, max: 2000 }
  };
  
  return Object.entries(limits).every(([axis, limit]) => 
    pos[axis] >= limit.min && pos[axis] <= limit.max
  );
};
```

### Safety Mechanisms
```typescript
const SafetyController = {
  emergencyStop: () => {
    // Immediate stop all robot movement
    robotAPI.emergencyStop();
    setRobotEnabled(false);
    toast.error("Emergency stop activated!");
  },
  
  validateMovement: (command: MovementCommand): boolean => {
    // Check collision detection
    // Verify workspace boundaries
    // Validate joint limits
    return true;
  }
};
```

## Testing Architecture

### Component Testing Strategy
```typescript
// Example test structure
describe('RobotControls', () => {
  test('updates joint angle when slider changes', () => {
    render(<RobotControls />);
    const slider = screen.getByRole('slider', { name: /joint 1/i });
    
    fireEvent.change(slider, { target: { value: '45' } });
    
    expect(screen.getByText('45.0°')).toBeInTheDocument();
  });
  
  test('disables controls when robot is disabled', () => {
    render(<RobotControls robotEnabled={false} />);
    
    expect(screen.getByRole('button', { name: /execute/i }))
      .toBeDisabled();
  });
});
```

This architecture provides a solid foundation for building and extending the robot control interface while maintaining code quality, performance, and safety standards.