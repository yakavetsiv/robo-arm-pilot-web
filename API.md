# API Documentation

This document outlines the API endpoints and data contracts for the Robot Control Interface. The application is designed to integrate with robot control systems, camera devices, and task management backends.

## Base Configuration

### Environment Variables
```bash
# Robot Control API
VITE_ROBOT_API_URL=http://localhost:8080/api
VITE_ROBOT_WS_URL=ws://localhost:8080/ws

# Camera Streaming
VITE_CAMERA_STREAM_URL=ws://localhost:8081/stream
VITE_CAMERA_API_URL=http://localhost:8081/api

# System Configuration
VITE_MAX_JOINTS=6
VITE_UPDATE_INTERVAL=100
VITE_SAFETY_TIMEOUT=5000
```

### API Client Setup
```typescript
class RobotAPI {
  private baseURL: string;
  private timeout: number;
  
  constructor(baseURL: string, timeout: number = 5000) {
    this.baseURL = baseURL;
    this.timeout = timeout;
  }
  
  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);
    
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      
      return response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }
}
```

## Robot Control API

### Robot Status

#### Get Current Robot Status
```http
GET /api/robot/status
```

**Response:**
```typescript
interface RobotStatus {
  isConnected: boolean;
  isEnabled: boolean;
  isMoving: boolean;
  currentPosition: {
    joints: number[];           // Joint angles in degrees
    cartesian: {
      x: number;                // X position in mm
      y: number;                // Y position in mm
      z: number;                // Z position in mm
      rx: number;               // X rotation in degrees
      ry: number;               // Y rotation in degrees
      rz: number;               // Z rotation in degrees
    };
  };
  endEffector: 'open' | 'semi-close' | 'close';
  errors: string[];
  warnings: string[];
  lastUpdate: string;           // ISO timestamp
}
```

**Example Response:**
```json
{
  "isConnected": true,
  "isEnabled": true,
  "isMoving": false,
  "currentPosition": {
    "joints": [0, -45, 90, 0, 45, 0],
    "cartesian": {
      "x": 300.5,
      "y": 150.2,
      "z": 200.0,
      "rx": 0,
      "ry": 90,
      "rz": 0
    }
  },
  "endEffector": "open",
  "errors": [],
  "warnings": ["Joint 3 approaching limit"],
  "lastUpdate": "2024-01-15T10:30:00Z"
}
```

### Joint Control

#### Move Joints
```http
POST /api/robot/joints/move
```

**Request Body:**
```typescript
interface JointMoveRequest {
  joints: number[];             // Target joint angles in degrees
  speed?: number;               // Movement speed (0-100)
  acceleration?: number;        // Acceleration (0-100)
  waitForCompletion?: boolean;  // Wait for movement to complete
}
```

**Example Request:**
```json
{
  "joints": [10, -30, 75, 15, 60, -45],
  "speed": 50,
  "acceleration": 25,
  "waitForCompletion": true
}
```

**Response:**
```typescript
interface MovementResponse {
  success: boolean;
  movementId: string;
  estimatedDuration: number;    // Duration in milliseconds
  message?: string;
  errors?: string[];
}
```

#### Set Individual Joint
```http
POST /api/robot/joints/{jointIndex}
```

**Path Parameters:**
- `jointIndex`: Joint number (0-5)

**Request Body:**
```typescript
interface SingleJointRequest {
  angle: number;                // Target angle in degrees
  speed?: number;               // Movement speed (0-100)
}
```

### Cartesian Control

#### Move to Cartesian Position
```http
POST /api/robot/cartesian/move
```

**Request Body:**
```typescript
interface CartesianMoveRequest {
  position: {
    x: number;                  // X position in mm
    y: number;                  // Y position in mm
    z: number;                  // Z position in mm
  };
  rotation?: {
    rx: number;                 // X rotation in degrees
    ry: number;                 // Y rotation in degrees
    rz: number;                 // Z rotation in degrees
  };
  speed?: number;               // Movement speed (0-100)
  linearMotion?: boolean;       // Use linear interpolation
  waitForCompletion?: boolean;
}
```

#### Relative Movement
```http
POST /api/robot/cartesian/relative
```

**Request Body:**
```typescript
interface RelativeMoveRequest {
  delta: {
    x?: number;                 // X offset in mm
    y?: number;                 // Y offset in mm
    z?: number;                 // Z offset in mm
    rx?: number;                // X rotation offset in degrees
    ry?: number;                // Y rotation offset in degrees
    rz?: number;                // Z rotation offset in degrees
  };
  speed?: number;
}
```

### End Effector Control

#### Set End Effector State
```http
POST /api/robot/end-effector
```

**Request Body:**
```typescript
interface EndEffectorRequest {
  state: 'open' | 'semi-close' | 'close';
  force?: number;               // Gripper force (0-100)
  speed?: number;               // Movement speed (0-100)
}
```

### Safety Controls

#### Emergency Stop
```http
POST /api/robot/emergency-stop
```

**Response:**
```typescript
interface EmergencyStopResponse {
  success: boolean;
  stoppedAt: string;            // ISO timestamp
  previousState: RobotStatus;
}
```

#### Enable/Disable Robot
```http
POST /api/robot/enable
POST /api/robot/disable
```

**Response:**
```typescript
interface EnableResponse {
  success: boolean;
  enabled: boolean;
  message?: string;
}
```

## Camera API

### Camera Management

#### Get Camera List
```http
GET /api/cameras
```

**Response:**
```typescript
interface CameraInfo {
  id: string;
  name: string;
  status: 'active' | 'standby' | 'offline' | 'error';
  driver: 'realsense' | 'kinect' | 'webcam' | 'custom';
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
  lastFrame?: string;           // ISO timestamp
}

interface CameraListResponse {
  cameras: CameraInfo[];
}
```

#### Get Camera Configuration
```http
GET /api/cameras/{cameraId}/config
```

**Response:**
```typescript
interface CameraConfig {
  id: string;
  name: string;
  driver: string;
  protocol: 'tcp' | 'udp' | 'usb' | 'ethernet';
  address: string;
  port?: number;
  streams: {
    rgb: {
      enabled: boolean;
      resolution: { width: number; height: number; fps: number; };
    };
    depth: {
      enabled: boolean;
      resolution: { width: number; height: number; fps: number; };
    };
  };
  calibration?: {
    intrinsic: number[][];
    distortion: number[];
    stereoBaseline?: number;
  };
}
```

#### Update Camera Configuration
```http
PUT /api/cameras/{cameraId}/config
```

**Request Body:** Same as `CameraConfig` interface

### Camera Streaming

#### Start Stream
```http
POST /api/cameras/{cameraId}/stream/start
```

**Request Body:**
```typescript
interface StreamStartRequest {
  streamType: 'rgb' | 'depth' | 'left' | 'right';
  format?: 'jpeg' | 'png' | 'raw';
  quality?: number;             // JPEG quality (1-100)
}
```

#### Stop Stream
```http
POST /api/cameras/{cameraId}/stream/stop
```

#### WebSocket Stream Connection
```typescript
// Connect to camera stream
const ws = new WebSocket(`${CAMERA_WS_URL}/cameras/${cameraId}/stream`);

ws.onmessage = (event) => {
  const frame = JSON.parse(event.data);
  // Handle frame data
};

interface StreamFrame {
  cameraId: string;
  streamType: 'rgb' | 'depth' | 'left' | 'right';
  timestamp: string;
  frameNumber: number;
  data: string;                 // Base64 encoded image data
  metadata: {
    width: number;
    height: number;
    format: string;
    compressionLevel?: number;
  };
}
```

### AprilTag Detection

#### Detect AprilTags
```http
POST /api/cameras/{cameraId}/apriltag/detect
```

**Request Body:**
```typescript
interface AprilTagDetectionRequest {
  threshold?: number;           // Detection threshold (0-1)
  family?: string;              // Tag family (tag36h11, tag25h9, etc.)
  maxTags?: number;            // Maximum tags to detect
}
```

**Response:**
```typescript
interface AprilTag {
  id: number;                   // Tag ID
  family: string;               // Tag family
  center: { x: number; y: number; };
  corners: Array<{ x: number; y: number; }>;
  pose?: {
    translation: { x: number; y: number; z: number; };
    rotation: { x: number; y: number; z: number; w: number; }; // Quaternion
  };
  confidence: number;           // Detection confidence (0-1)
}

interface AprilTagResponse {
  tags: AprilTag[];
  frameTimestamp: string;
  processingTime: number;       // Detection time in ms
}
```

#### Navigate to AprilTag
```http
POST /api/cameras/{cameraId}/apriltag/navigate
```

**Request Body:**
```typescript
interface NavigateToTagRequest {
  tagId: number;
  approach: {
    distance: number;           // Approach distance in mm
    height?: number;            // Approach height offset in mm
    angle?: number;             // Approach angle in degrees
  };
  speed?: number;
}
```

## Position Library API

### Position Management

#### Get All Positions
```http
GET /api/positions
```

**Query Parameters:**
- `type`: Filter by position type ('fixed', 'approach', 'departure', 'intermediate')
- `parentId`: Get child positions of a parent
- `search`: Search positions by name

**Response:**
```typescript
interface Position {
  id: string;
  name: string;
  type: 'fixed' | 'approach' | 'departure' | 'intermediate';
  coordinates: {
    x: number;
    y: number;
    z: number;
    rx: number;
    ry: number;
    rz: number;
  };
  joints?: number[];
  parentId?: string;
  children?: string[];          // Child position IDs
  metadata: {
    createdAt: string;
    updatedAt: string;
    creator: string;
    description?: string;
    tags?: string[];
  };
}

interface PositionListResponse {
  positions: Position[];
  total: number;
}
```

#### Create Position
```http
POST /api/positions
```

**Request Body:**
```typescript
interface CreatePositionRequest {
  name: string;
  type: 'fixed' | 'approach' | 'departure' | 'intermediate';
  coordinates: {
    x: number;
    y: number;
    z: number;
    rx: number;
    ry: number;
    rz: number;
  };
  joints?: number[];
  parentId?: string;
  description?: string;
  tags?: string[];
}
```

#### Update Position
```http
PUT /api/positions/{positionId}
```

#### Delete Position
```http
DELETE /api/positions/{positionId}
```

#### Move to Position
```http
POST /api/positions/{positionId}/move
```

**Request Body:**
```typescript
interface MoveToPositionRequest {
  speed?: number;
  useJoints?: boolean;          // Use joint coordinates if available
  approach?: {
    enabled: boolean;
    distance: number;           // Pre-approach distance
    speed: number;
  };
}
```

## Task Management API

### Task Execution

#### Get Task History
```http
GET /api/tasks
```

**Query Parameters:**
- `status`: Filter by task status
- `type`: Filter by task type
- `limit`: Number of tasks to return
- `offset`: Pagination offset

**Response:**
```typescript
interface Task {
  id: string;
  name: string;
  type: 'movement' | 'pickup' | 'place' | 'scan' | 'sequence' | 'custom';
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  startTime?: string;           // ISO timestamp
  endTime?: string;             // ISO timestamp
  duration?: number;            // Duration in milliseconds
  progress: number;             // Progress percentage (0-100)
  parameters: Record<string, any>;
  result?: {
    success: boolean;
    data?: any;
    error?: string;
    metrics?: {
      accuracy?: number;
      repeatability?: number;
      cycleTime?: number;
    };
  };
  parentTaskId?: string;        // For subtasks
  children?: string[];          // Child task IDs
}

interface TaskListResponse {
  tasks: Task[];
  total: number;
}
```

#### Create Task
```http
POST /api/tasks
```

**Request Body:**
```typescript
interface CreateTaskRequest {
  name: string;
  type: 'movement' | 'pickup' | 'place' | 'scan' | 'sequence' | 'custom';
  parameters: Record<string, any>;
  parentTaskId?: string;
  priority?: number;            // Task priority (1-10)
  scheduled?: string;           // ISO timestamp for scheduled execution
}
```

#### Execute Task
```http
POST /api/tasks/{taskId}/execute
```

#### Cancel Task
```http
POST /api/tasks/{taskId}/cancel
```

### Task Statistics

#### Get Task Statistics
```http
GET /api/tasks/statistics
```

**Query Parameters:**
- `period`: Time period ('today', 'week', 'month', 'year', 'all')
- `type`: Filter by task type

**Response:**
```typescript
interface TaskStatistics {
  totalTasks: number;
  completedTasks: number;
  failedTasks: number;
  cancelledTasks: number;
  averageExecutionTime: number; // Average time in milliseconds
  successRate: number;          // Success percentage (0-100)
  tasksByType: Record<string, number>;
  tasksByStatus: Record<string, number>;
  dailyStats: Array<{
    date: string;
    completed: number;
    failed: number;
    averageTime: number;
  }>;
  performanceMetrics: {
    throughput: number;         // Tasks per hour
    efficiency: number;         // Percentage of successful tasks
    reliability: number;        // Uptime percentage
  };
}
```

## WebSocket Real-time Updates

### Robot Status Updates
```typescript
// Connect to robot status updates
const robotWS = new WebSocket(`${ROBOT_WS_URL}/robot/status`);

robotWS.onmessage = (event) => {
  const update = JSON.parse(event.data);
  handleRobotUpdate(update);
};

interface RobotStatusUpdate {
  type: 'position' | 'status' | 'error' | 'movement_complete';
  timestamp: string;
  data: {
    joints?: number[];
    cartesian?: {
      x: number; y: number; z: number;
      rx: number; ry: number; rz: number;
    };
    isMoving?: boolean;
    endEffector?: string;
    error?: string;
    movementId?: string;
  };
}
```

### Task Progress Updates
```typescript
// Connect to task progress updates
const taskWS = new WebSocket(`${ROBOT_WS_URL}/tasks/progress`);

interface TaskProgressUpdate {
  taskId: string;
  status: string;
  progress: number;
  currentStep?: string;
  estimatedRemaining?: number;
  metrics?: Record<string, number>;
}
```

## Error Handling

### Error Response Format
```typescript
interface APIError {
  success: false;
  error: {
    code: string;               // Error code
    message: string;            // Human-readable message
    details?: any;              // Additional error details
    timestamp: string;          // ISO timestamp
    requestId?: string;         // Request tracking ID
  };
}
```

### Common Error Codes
- `ROBOT_DISCONNECTED`: Robot is not connected
- `ROBOT_DISABLED`: Robot is disabled
- `INVALID_POSITION`: Position is outside workspace
- `JOINT_LIMIT_EXCEEDED`: Joint angle exceeds limits
- `MOVEMENT_FAILED`: Movement execution failed
- `CAMERA_OFFLINE`: Camera is not available
- `APRILTAG_NOT_FOUND`: AprilTag detection failed
- `TASK_EXECUTION_FAILED`: Task execution error
- `VALIDATION_ERROR`: Request validation failed
- `TIMEOUT_ERROR`: Request timeout
- `SAFETY_VIOLATION`: Safety limit exceeded

### Error Handling Example
```typescript
try {
  const result = await robotAPI.moveJoints(jointAngles);
  toast.success("Movement completed successfully");
} catch (error) {
  if (error.code === 'JOINT_LIMIT_EXCEEDED') {
    toast.error("Joint angle exceeds safety limits");
    highlightJointError(error.details.jointIndex);
  } else if (error.code === 'ROBOT_DISCONNECTED') {
    toast.error("Robot is disconnected. Please check connection.");
    setRobotConnected(false);
  } else {
    toast.error(`Movement failed: ${error.message}`);
  }
  
  console.error('Robot control error:', error);
}
```

## Rate Limiting

### API Rate Limits
- Robot control endpoints: 10 requests/second
- Camera endpoints: 5 requests/second  
- Position endpoints: 20 requests/second
- Task endpoints: 15 requests/second

### WebSocket Connection Limits
- Maximum 10 concurrent WebSocket connections per client
- Heartbeat interval: 30 seconds
- Automatic reconnection on disconnect

This API documentation provides a comprehensive foundation for integrating the Robot Control Interface with backend systems and robot controllers.