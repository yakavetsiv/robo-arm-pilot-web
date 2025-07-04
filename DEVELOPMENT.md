# Development Guide

This guide provides comprehensive information for developers working on the Robot Control Interface, including setup instructions, coding standards, testing guidelines, and contribution workflows.

## Quick Start

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **Package Manager**: npm (v8+) or yarn (v1.22+)
- **Git**: Latest version
- **VS Code** (recommended) with extensions:
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense
  - TypeScript Hero
  - Prettier - Code formatter
  - ESLint

### Initial Setup

1. **Clone the Repository**
```bash
git clone <repository-url>
cd robot-control-interface
```

2. **Install Dependencies**
```bash
npm install
# or
yarn install
```

3. **Environment Configuration**
```bash
# Copy environment template
cp .env.example .env.local

# Configure environment variables
VITE_ROBOT_API_URL=http://localhost:8080/api
VITE_CAMERA_STREAM_URL=ws://localhost:8081/stream
VITE_DEBUG_MODE=true
```

4. **Start Development Server**
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### Development Scripts

```bash
# Development server with hot reload
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint
npm run lint:fix

# Formatting
npm run format

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test
npm run test:watch
npm run test:coverage

# Generate component documentation
npm run docs:components
```

## Project Structure Deep Dive

```
robot-control-interface/
├── src/
│   ├── components/           # React components
│   │   ├── ui/              # Reusable UI components (Shadcn)
│   │   ├── Dashboard.tsx    # Main dashboard
│   │   ├── VideoStreams.tsx # Camera feeds & controls
│   │   ├── Settings.tsx     # Configuration
│   │   ├── Status.tsx       # Robot status monitoring
│   │   ├── TaskTracking.tsx # Task management
│   │   ├── Logs.tsx         # System logs
│   │   ├── PositionLibrary.tsx # Position management
│   │   ├── Position3DVisualization.tsx # 3D position display
│   │   ├── Robot2DVisualization.tsx # 2D robot display
│   │   ├── RobotControls.tsx # Robot control panels
│   │   ├── RobotControlsSheet.tsx # Mobile controls
│   │   └── Sidebar.tsx      # Navigation
│   ├── hooks/               # Custom React hooks
│   │   ├── use-toast.ts     # Toast notifications
│   │   ├── use-mobile.tsx   # Mobile detection
│   │   ├── use-robot-api.ts # Robot API integration
│   │   ├── use-camera.ts    # Camera management
│   │   └── use-websocket.ts # WebSocket connections
│   ├── lib/                 # Utility functions
│   │   ├── utils.ts         # General utilities
│   │   ├── robot-api.ts     # Robot API client
│   │   ├── camera-api.ts    # Camera API client
│   │   ├── validation.ts    # Input validation
│   │   └── constants.ts     # Application constants
│   ├── types/               # TypeScript type definitions
│   │   ├── robot.ts         # Robot-related types
│   │   ├── camera.ts        # Camera-related types
│   │   ├── position.ts      # Position types
│   │   ├── task.ts          # Task types
│   │   └── api.ts           # API response types
│   ├── pages/               # Page components
│   │   ├── Index.tsx        # Main application page
│   │   └── NotFound.tsx     # 404 error page
│   ├── styles/              # Additional styles
│   │   ├── components.css   # Component-specific styles
│   │   └── animations.css   # Custom animations
│   ├── assets/              # Static assets
│   │   ├── images/          # Image files
│   │   ├── icons/           # Custom icons
│   │   └── sounds/          # Audio alerts
│   ├── tests/               # Test files
│   │   ├── components/      # Component tests
│   │   ├── hooks/           # Hook tests
│   │   ├── utils/           # Utility tests
│   │   └── __mocks__/       # Test mocks
│   ├── App.tsx              # Root component
│   ├── main.tsx             # Application entry point
│   ├── index.css            # Global styles & design system
│   └── vite-env.d.ts        # Vite type definitions
├── public/                  # Public assets
├── docs/                    # Documentation
├── .env.example             # Environment variables template
├── .eslintrc.json           # ESLint configuration
├── .prettierrc              # Prettier configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
└── package.json             # Project dependencies
```

## Coding Standards

### TypeScript Guidelines

#### Type Definitions
```typescript
// ✅ Use descriptive interface names
interface RobotJointPosition {
  joint1: number;
  joint2: number;
  joint3: number;
  joint4: number;
  joint5: number;
  joint6: number;
}

// ✅ Use enums for fixed sets of values
enum RobotStatus {
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
  ERROR = 'error',
  MOVING = 'moving',
}

// ✅ Use union types for alternatives
type EndEffectorState = 'open' | 'semi-close' | 'close';

// ✅ Use generic types for reusable interfaces
interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

// ❌ Avoid any types
const robotData: any = getData(); // Bad

// ✅ Use proper typing
const robotData: RobotStatus = getData();
```

#### Function Declarations
```typescript
// ✅ Use function declarations for components
function RobotControls({ jointAngles, onJointChange }: RobotControlsProps) {
  // Component logic
}

// ✅ Use arrow functions for event handlers
const handleJointChange = useCallback((index: number, value: number) => {
  if (validateJointAngle(value)) {
    onJointChange(index, value);
  }
}, [onJointChange]);

// ✅ Use async/await for promises
const moveRobot = async (position: CartesianPosition): Promise<void> => {
  try {
    await robotAPI.moveToPosition(position);
    toast.success('Movement completed');
  } catch (error) {
    toast.error(`Movement failed: ${error.message}`);
  }
};
```

### React Best Practices

#### Component Structure
```typescript
// Component imports (external libraries first)
import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

// Internal imports
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { validateJointAngle } from '@/lib/validation';
import { useRobotAPI } from '@/hooks/use-robot-api';

// Type imports
import type { RobotPosition, JointAngles } from '@/types/robot';

// Component props interface
interface RobotControlsProps {
  initialPosition?: RobotPosition;
  onPositionChange?: (position: RobotPosition) => void;
  disabled?: boolean;
}

// Main component function
export function RobotControls({ 
  initialPosition, 
  onPositionChange, 
  disabled = false 
}: RobotControlsProps) {
  // State declarations
  const [jointAngles, setJointAngles] = useState<JointAngles>(
    initialPosition?.joints || [0, 0, 0, 0, 0, 0]
  );
  const [isMoving, setIsMoving] = useState(false);
  
  // Custom hooks
  const { moveJoints, isConnected } = useRobotAPI();
  
  // Event handlers
  const handleJointChange = useCallback((index: number, value: number) => {
    if (!validateJointAngle(value)) {
      toast.error(`Invalid joint angle: ${value}`);
      return;
    }
    
    setJointAngles(prev => {
      const newAngles = [...prev];
      newAngles[index] = value;
      return newAngles;
    });
  }, []);
  
  const handleExecuteMovement = useCallback(async () => {
    if (!isConnected) {
      toast.error('Robot is not connected');
      return;
    }
    
    try {
      setIsMoving(true);
      await moveJoints(jointAngles);
      onPositionChange?.({ joints: jointAngles });
      toast.success('Movement completed');
    } catch (error) {
      toast.error(`Movement failed: ${error.message}`);
    } finally {
      setIsMoving(false);
    }
  }, [jointAngles, isConnected, moveJoints, onPositionChange]);
  
  // Effects
  useEffect(() => {
    if (initialPosition) {
      setJointAngles(initialPosition.joints);
    }
  }, [initialPosition]);
  
  // Render
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Joint Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Component JSX */}
      </CardContent>
    </Card>
  );
}

// Default export
export default RobotControls;
```

#### State Management Patterns
```typescript
// ✅ Use functional state updates for objects
const updateCartesianPosition = useCallback((axis: string, value: number) => {
  setPosition(prev => ({
    ...prev,
    [axis]: value,
    lastUpdated: new Date().toISOString()
  }));
}, []);

// ✅ Use useCallback for event handlers
const handleJointSliderChange = useCallback((jointIndex: number, value: number[]) => {
  setJointAngles(prev => {
    const newAngles = [...prev];
    newAngles[jointIndex] = value[0];
    return newAngles;
  });
}, []);

// ✅ Use useMemo for expensive calculations
const robotWorkspaceInfo = useMemo(() => {
  return calculateWorkspaceBounds(jointAngles, robotConfiguration);
}, [jointAngles, robotConfiguration]);
```

### Styling Guidelines

#### CSS Custom Properties
```css
/* ✅ Use semantic color names */
:root {
  --color-joint-active: 217 91% 60%;
  --color-joint-warning: 38 92% 50%;
  --color-joint-error: 0 84% 60%;
  
  --shadow-robot-control: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --animation-joint-move: joint-rotation 0.3s ease-out;
}

/* ✅ Component-specific CSS classes */
.robot-joint-control {
  @apply flex items-center gap-4 p-4 rounded-lg border;
  border-color: hsl(var(--border));
  transition: border-color 0.2s ease;
}

.robot-joint-control--active {
  border-color: hsl(var(--color-joint-active));
  box-shadow: var(--shadow-robot-control);
}
```

#### Tailwind Usage
```tsx
// ✅ Use design system tokens
<div className="bg-background text-foreground border border-border">

// ✅ Group related classes
<Button className={cn(
  "flex items-center gap-2 px-4 py-2",
  "bg-primary text-primary-foreground",
  "hover:bg-primary/90 focus:ring-2 focus:ring-primary",
  "disabled:opacity-50 disabled:pointer-events-none",
  isMoving && "animate-pulse"
)}>

// ❌ Avoid hard-coded colors
<div className="bg-blue-500 text-white border-gray-300">
```

### Error Handling

#### Component Error Boundaries
```typescript
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class RobotControlErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Robot control error:', error, errorInfo);
    // Log to monitoring service
    logError('component_error', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
    });
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 border border-destructive/20 bg-destructive/5 rounded-lg">
          <h3 className="text-lg font-semibold text-destructive mb-2">
            Robot Control Error
          </h3>
          <p className="text-destructive/80 mb-4">
            An error occurred while rendering the robot controls.
          </p>
          <Button 
            onClick={() => this.setState({ hasError: false })}
            variant="outline"
          >
            Try Again
          </Button>
        </div>
      );
    }
    
    return this.props.children;
  }
}
```

#### API Error Handling
```typescript
// Custom hook for API error handling
export function useRobotAPI() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const executeCommand = useCallback(async <T>(
    command: () => Promise<T>,
    successMessage?: string
  ): Promise<T | null> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await command();
      
      if (successMessage) {
        toast.success(successMessage);
      }
      
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      
      // Handle specific error types
      if (err.code === 'ROBOT_DISCONNECTED') {
        toast.error('Robot is disconnected. Please check connection.');
      } else if (err.code === 'JOINT_LIMIT_EXCEEDED') {
        toast.error('Joint angle exceeds safety limits');
      } else {
        toast.error(`Operation failed: ${errorMessage}`);
      }
      
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  return { executeCommand, isLoading, error };
}
```

## Testing Guidelines

### Unit Testing with Vitest

#### Component Testing
```typescript
// tests/components/RobotControls.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { RobotControls } from '@/components/RobotControls';

// Mock the robot API
vi.mock('@/hooks/use-robot-api', () => ({
  useRobotAPI: () => ({
    moveJoints: vi.fn(),
    isConnected: true,
    isLoading: false,
  }),
}));

describe('RobotControls', () => {
  const defaultProps = {
    initialPosition: { joints: [0, 0, 0, 0, 0, 0] },
    onPositionChange: vi.fn(),
  };
  
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  test('renders joint controls correctly', () => {
    render(<RobotControls {...defaultProps} />);
    
    // Check that all 6 joint controls are rendered
    for (let i = 1; i <= 6; i++) {
      expect(screen.getByLabelText(`Joint ${i}`)).toBeInTheDocument();
    }
  });
  
  test('updates joint angle when slider changes', async () => {
    render(<RobotControls {...defaultProps} />);
    
    const joint1Slider = screen.getByLabelText('Joint 1');
    fireEvent.change(joint1Slider, { target: { value: '45' } });
    
    await waitFor(() => {
      expect(screen.getByText('45.0°')).toBeInTheDocument();
    });
  });
  
  test('disables controls when robot is disabled', () => {
    render(<RobotControls {...defaultProps} disabled={true} />);
    
    const executeButton = screen.getByRole('button', { name: /execute/i });
    expect(executeButton).toBeDisabled();
  });
  
  test('shows error message for invalid joint angles', async () => {
    render(<RobotControls {...defaultProps} />);
    
    const joint1Slider = screen.getByLabelText('Joint 1');
    fireEvent.change(joint1Slider, { target: { value: '200' } });
    
    await waitFor(() => {
      expect(screen.getByText(/invalid joint angle/i)).toBeInTheDocument();
    });
  });
});
```

#### Hook Testing
```typescript
// tests/hooks/use-robot-api.test.ts
import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { useRobotAPI } from '@/hooks/use-robot-api';

// Mock fetch
global.fetch = vi.fn();

describe('useRobotAPI', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  test('executes robot movement successfully', async () => {
    const mockResponse = { success: true, movementId: '123' };
    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });
    
    const { result } = renderHook(() => useRobotAPI());
    
    await act(async () => {
      const response = await result.current.moveJoints([0, 45, 90, 0, 45, 0]);
      expect(response).toEqual(mockResponse);
    });
    
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/robot/joints/move'),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ joints: [0, 45, 90, 0, 45, 0] }),
      })
    );
  });
  
  test('handles API errors correctly', async () => {
    const mockError = { code: 'ROBOT_DISCONNECTED', message: 'Robot offline' };
    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => mockError,
    });
    
    const { result } = renderHook(() => useRobotAPI());
    
    await act(async () => {
      const response = await result.current.moveJoints([0, 0, 0, 0, 0, 0]);
      expect(response).toBeNull();
    });
    
    expect(result.current.error).toBe('Robot offline');
  });
});
```

### Integration Testing

#### API Integration Tests
```typescript
// tests/integration/robot-api.test.ts
import { describe, test, expect, beforeAll, afterAll } from 'vitest';
import { RobotAPI } from '@/lib/robot-api';

describe('Robot API Integration', () => {
  let robotAPI: RobotAPI;
  let mockServer: any;
  
  beforeAll(async () => {
    // Setup mock server or test environment
    mockServer = setupMockServer();
    robotAPI = new RobotAPI('http://localhost:3001/api');
  });
  
  afterAll(async () => {
    mockServer?.close();
  });
  
  test('gets robot status successfully', async () => {
    const status = await robotAPI.getStatus();
    
    expect(status).toHaveProperty('isConnected');
    expect(status).toHaveProperty('currentPosition');
    expect(status.currentPosition).toHaveProperty('joints');
    expect(status.currentPosition).toHaveProperty('cartesian');
  });
  
  test('moves robot joints within limits', async () => {
    const jointAngles = [10, -30, 45, 0, 60, -20];
    const result = await robotAPI.moveJoints(jointAngles);
    
    expect(result.success).toBe(true);
    expect(result.movementId).toBeDefined();
  });
});
```

### End-to-End Testing with Playwright

```typescript
// tests/e2e/robot-control.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Robot Control Interface', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });
  
  test('allows user to control robot joints', async ({ page }) => {
    // Navigate to robot controls
    await page.click('text=Camera & Controls');
    
    // Adjust joint 1 slider
    const joint1Slider = page.locator('[data-testid="joint-1-slider"]');
    await joint1Slider.fill('45');
    
    // Verify the angle display updates
    await expect(page.locator('text=45.0°')).toBeVisible();
    
    // Execute movement
    await page.click('button:has-text("Execute")');
    
    // Verify success message
    await expect(page.locator('text=Movement completed')).toBeVisible();
  });
  
  test('shows error for invalid joint angles', async ({ page }) => {
    await page.click('text=Camera & Controls');
    
    const joint1Slider = page.locator('[data-testid="joint-1-slider"]');
    await joint1Slider.fill('200');
    
    await expect(page.locator('text=Invalid joint angle')).toBeVisible();
  });
  
  test('enables emergency stop functionality', async ({ page }) => {
    await page.click('text=Camera & Controls');
    
    // Click emergency stop
    await page.click('button:has-text("Stop")');
    
    // Verify emergency stop confirmation dialog
    await expect(page.locator('text=Emergency Stop')).toBeVisible();
    
    // Confirm emergency stop
    await page.click('button:has-text("Emergency Stop")');
    
    // Verify robot is stopped
    await expect(page.locator('text=Robot stopped')).toBeVisible();
  });
});
```

## Performance Optimization

### Code Splitting
```typescript
// Lazy load heavy components
import { lazy, Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const Position3DVisualization = lazy(() => 
  import('@/components/Position3DVisualization')
);

function PositionLibrary() {
  return (
    <div>
      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <Position3DVisualization positions={positions} />
      </Suspense>
    </div>
  );
}
```

### Memoization Strategies
```typescript
// Memoize expensive calculations
const robotReachabilityData = useMemo(() => {
  return calculateReachabilityMatrix(
    robotConfiguration,
    workspaceBounds,
    jointLimits
  );
}, [robotConfiguration, workspaceBounds, jointLimits]);

// Memoize components with many props
const MemoizedJointControl = React.memo(({ 
  jointIndex, 
  angle, 
  onChange, 
  min, 
  max 
}: JointControlProps) => {
  return (
    <div className="joint-control">
      {/* Component implementation */}
    </div>
  );
});
```

### Bundle Optimization
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['@radix-ui/react-slider', '@radix-ui/react-select'],
          'robot-controls': [
            './src/components/RobotControls.tsx',
            './src/components/VideoStreams.tsx'
          ],
          'visualization': [
            './src/components/Position3DVisualization.tsx',
            './src/components/Robot2DVisualization.tsx'
          ]
        }
      }
    }
  }
});
```

## Debugging Guidelines

### Development Tools Setup
```typescript
// Enable React DevTools profiler
if (process.env.NODE_ENV === 'development') {
  // Enable React strict mode
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

// Debug robot communication
const debugRobotAPI = {
  logRequest: (endpoint: string, data: any) => {
    console.group(`🤖 Robot API: ${endpoint}`);
    console.log('Request:', data);
    console.groupEnd();
  },
  
  logResponse: (endpoint: string, response: any) => {
    console.group(`🤖 Robot API Response: ${endpoint}`);
    console.log('Response:', response);
    console.groupEnd();
  }
};
```

### Error Monitoring
```typescript
// Error tracking service integration
class ErrorTracker {
  static logError(error: Error, context: Record<string, any>) {
    if (process.env.NODE_ENV === 'production') {
      // Send to monitoring service (e.g., Sentry)
      console.error('Production error:', error, context);
    } else {
      console.group('🚨 Development Error');
      console.error('Error:', error);
      console.log('Context:', context);
      console.groupEnd();
    }
  }
  
  static logPerformance(metric: string, duration: number) {
    if (process.env.VITE_DEBUG_PERFORMANCE === 'true') {
      console.log(`⚡ Performance: ${metric} took ${duration}ms`);
    }
  }
}
```

## Git Workflow

### Commit Message Convention
```bash
# Format: type(scope): description

# Types:
feat: new feature
fix: bug fix
docs: documentation changes
style: formatting changes
refactor: code refactoring
test: adding tests
chore: maintenance tasks

# Examples:
feat(robot-controls): add emergency stop functionality
fix(camera): resolve WebSocket connection issues
docs(api): update robot control endpoints
style(ui): improve button component styling
refactor(hooks): optimize useRobotAPI performance
test(components): add RobotControls unit tests
chore(deps): update dependencies
```

### Branch Naming
```bash
# Feature branches
feature/robot-emergency-stop
feature/camera-apriltag-detection
feature/position-3d-visualization

# Bug fix branches
fix/joint-angle-validation
fix/websocket-reconnection
fix/memory-leak-visualization

# Documentation branches
docs/component-documentation
docs/api-endpoints
```

### Pull Request Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Robot hardware testing (if applicable)

## Screenshots/Videos
Include screenshots or videos of UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No console errors in browser
```

This development guide provides a comprehensive foundation for maintaining code quality, implementing new features, and ensuring robust testing practices in the Robot Control Interface project.