# Design System Documentation

This document outlines the comprehensive design system used in the Robot Control Interface, including color schemes, typography, spacing, component variants, and styling guidelines.

## Design Philosophy

The design system follows these core principles:

1. **Clarity**: Clean, professional interface suitable for industrial environments
2. **Consistency**: Unified visual language across all components
3. **Accessibility**: WCAG 2.1 AA compliant with proper contrast ratios
4. **Responsiveness**: Fluid design that works on all screen sizes
5. **Safety**: Clear visual indicators for critical robot control functions

## Color System

### Color Architecture

All colors are defined using HSL values in CSS custom properties for maximum flexibility and theme support.

```css
:root {
  /* Base Colors */
  --background: 0 0% 100%;           /* Pure white background */
  --foreground: 222.2 84% 4.9%;      /* Dark text */
  
  /* Component Colors */
  --card: 0 0% 100%;                 /* Card backgrounds */
  --card-foreground: 222.2 84% 4.9%; /* Card text */
  
  /* Interactive Colors */
  --primary: 222.2 47.4% 11.2%;      /* Primary actions */
  --primary-foreground: 210 40% 98%; /* Primary text */
  
  --secondary: 210 40% 96.1%;        /* Secondary backgrounds */
  --secondary-foreground: 222.2 47.4% 11.2%; /* Secondary text */
}
```

### Semantic Color Usage

#### Primary Colors
- **Background**: `hsl(var(--background))` - Main page background
- **Foreground**: `hsl(var(--foreground))` - Primary text color
- **Primary**: `hsl(var(--primary))` - Primary buttons, links, active states
- **Secondary**: `hsl(var(--secondary))` - Secondary buttons, subtle backgrounds

#### Status Colors
```css
/* Success - Green palette */
--success: 142 76% 36%;
--success-foreground: 0 0% 100%;

/* Warning - Orange palette */
--warning: 38 92% 50%;
--warning-foreground: 0 0% 100%;

/* Error - Red palette */
--destructive: 0 84.2% 60.2%;
--destructive-foreground: 210 40% 98%;

/* Info - Blue palette */
--info: 217 91% 60%;
--info-foreground: 0 0% 100%;
```

#### Robot-Specific Colors
```css
/* Joint control colors */
--joint-active: 217 91% 60%;    /* Blue for active joints */
--joint-inactive: 214 31% 91%;  /* Gray for inactive joints */
--joint-warning: 38 92% 50%;    /* Orange for joint limits */
--joint-error: 0 84% 60%;       /* Red for joint errors */

/* Movement direction colors */
--axis-x: 0 84% 60%;            /* Red for X-axis */
--axis-y: 142 76% 36%;          /* Green for Y-axis */
--axis-z: 217 91% 60%;          /* Blue for Z-axis */

/* Camera status colors */
--camera-active: 142 76% 36%;   /* Green for active cameras */
--camera-standby: 38 92% 50%;   /* Orange for standby */
--camera-offline: 0 84% 60%;    /* Red for offline */
```

### Dark Mode Support

```css
.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;
  --primary: 210 40% 98%;
  --primary-foreground: 222.2 47.4% 11.2%;
  /* ... additional dark mode colors */
}
```

## Typography

### Font System

```css
/* Font families */
--font-family-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
--font-family-mono: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;

/* Font weights */
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### Typography Scale

```css
/* Font sizes */
--text-xs: 0.75rem;      /* 12px */
--text-sm: 0.875rem;     /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
--text-2xl: 1.5rem;      /* 24px */
--text-3xl: 1.875rem;    /* 30px */
--text-4xl: 2.25rem;     /* 36px */

/* Line heights */
--leading-none: 1;
--leading-tight: 1.25;
--leading-snug: 1.375;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
--leading-loose: 2;
```

### Typography Usage

```scss
// Headings
.heading-1 { font-size: var(--text-4xl); font-weight: var(--font-weight-bold); }
.heading-2 { font-size: var(--text-3xl); font-weight: var(--font-weight-bold); }
.heading-3 { font-size: var(--text-2xl); font-weight: var(--font-weight-semibold); }
.heading-4 { font-size: var(--text-xl); font-weight: var(--font-weight-semibold); }

// Body text
.body-large { font-size: var(--text-lg); line-height: var(--leading-relaxed); }
.body-base { font-size: var(--text-base); line-height: var(--leading-normal); }
.body-small { font-size: var(--text-sm); line-height: var(--leading-normal); }

// Technical text (for coordinates, angles, etc.)
.technical { 
  font-family: var(--font-family-mono); 
  font-size: var(--text-sm);
  font-weight: var(--font-weight-medium);
}
```

## Spacing System

### Spacing Scale

```css
/* Spacing units (based on 4px grid) */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
```

### Spacing Usage Guidelines

```scss
// Component spacing
.component-padding { padding: var(--space-6); }
.component-margin { margin: var(--space-4); }

// Layout spacing
.section-gap { gap: var(--space-8); }
.content-gap { gap: var(--space-6); }
.item-gap { gap: var(--space-4); }

// Form spacing
.form-field-gap { margin-bottom: var(--space-4); }
.form-section-gap { margin-bottom: var(--space-8); }
```

## Border Radius

```css
/* Border radius scale */
--radius-none: 0;
--radius-sm: 0.125rem;    /* 2px */
--radius-base: 0.25rem;   /* 4px */
--radius-md: 0.375rem;    /* 6px */
--radius-lg: 0.5rem;      /* 8px */
--radius-xl: 0.75rem;     /* 12px */
--radius-2xl: 1rem;       /* 16px */
--radius-full: 9999px;    /* Fully rounded */

/* Component-specific radius */
--radius: var(--radius-lg);  /* Default component radius */
```

## Shadows

```css
/* Shadow system */
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-base: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);

/* Colored shadows for status */
--shadow-success: 0 4px 6px -1px rgb(34 197 94 / 0.2);
--shadow-warning: 0 4px 6px -1px rgb(245 158 11 / 0.2);
--shadow-error: 0 4px 6px -1px rgb(239 68 68 / 0.2);
```

## Component Variants

### Button System

```typescript
// Button variant definitions
const buttonVariants = cva(
  // Base styles
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        success: "bg-success text-success-foreground hover:bg-success/90",
        warning: "bg-warning text-warning-foreground hover:bg-warning/90",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

### Input System

```typescript
// Input variant styles
const inputVariants = cva(
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        error: "border-destructive focus-visible:ring-destructive",
        success: "border-success focus-visible:ring-success",
      },
      size: {
        default: "h-10 px-3 py-2",
        sm: "h-9 px-3 py-2 text-sm",
        lg: "h-12 px-4 py-3",
      },
    },
  }
);
```

### Card System

```typescript
// Card component variants
const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "",
        outline: "border-2",
        ghost: "border-0 shadow-none",
        success: "border-success/20 bg-success/5",
        warning: "border-warning/20 bg-warning/5",
        error: "border-destructive/20 bg-destructive/5",
      },
      size: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
      },
    },
  }
);
```

## Robot-Specific Design Patterns

### Joint Control Styling

```css
/* Joint slider styling */
.joint-slider {
  --slider-track: hsl(var(--border));
  --slider-range: hsl(var(--primary));
  --slider-thumb: hsl(var(--background));
  --slider-thumb-border: hsl(var(--primary));
}

.joint-slider[data-warning="true"] {
  --slider-range: hsl(var(--warning));
  --slider-thumb-border: hsl(var(--warning));
}

.joint-slider[data-error="true"] {
  --slider-range: hsl(var(--destructive));
  --slider-thumb-border: hsl(var(--destructive));
}
```

### Status Indicator Styling

```css
/* Status indicator variants */
.status-indicator {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-medium);
}

.status-indicator--connected {
  background-color: hsl(var(--success) / 0.1);
  color: hsl(var(--success));
  border: 1px solid hsl(var(--success) / 0.2);
}

.status-indicator--disconnected {
  background-color: hsl(var(--destructive) / 0.1);
  color: hsl(var(--destructive));
  border: 1px solid hsl(var(--destructive) / 0.2);
}

.status-indicator--standby {
  background-color: hsl(var(--warning) / 0.1);
  color: hsl(var(--warning));
  border: 1px solid hsl(var(--warning) / 0.2);
}
```

### Camera Feed Styling

```css
/* Camera feed container */
.camera-feed {
  position: relative;
  aspect-ratio: 16 / 9;
  background-color: hsl(var(--muted));
  border-radius: var(--radius-lg);
  border: 1px solid hsl(var(--border));
  overflow: hidden;
}

.camera-feed--active {
  border-color: hsl(var(--success));
  box-shadow: var(--shadow-success);
}

.camera-feed--offline {
  border-color: hsl(var(--destructive));
  opacity: 0.6;
}

/* AprilTag detection overlay */
.apriltag-overlay {
  position: absolute;
  border: 2px solid hsl(var(--warning));
  background-color: hsl(var(--warning) / 0.1);
  backdrop-filter: blur(2px);
}
```

## Responsive Design

### Breakpoint System

```css
/* Responsive breakpoints */
--breakpoint-sm: 640px;   /* Small devices */
--breakpoint-md: 768px;   /* Medium devices */
--breakpoint-lg: 1024px;  /* Large devices */
--breakpoint-xl: 1280px;  /* Extra large devices */
--breakpoint-2xl: 1536px; /* 2X Extra large devices */
```

### Responsive Patterns

```scss
// Mobile-first responsive design
.responsive-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-6);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-8);
  }
}

// Responsive navigation
.sidebar {
  width: 100%;
  height: auto;
  
  @media (min-width: 768px) {
    width: 240px;
    height: 100vh;
  }
}
```

## Animation System

```css
/* Animation durations */
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 500ms;

/* Easing functions */
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

/* Common animations */
.fade-in {
  animation: fadeIn var(--duration-normal) var(--ease-out);
}

.slide-up {
  animation: slideUp var(--duration-normal) var(--ease-out);
}

.scale-in {
  animation: scaleIn var(--duration-fast) var(--ease-out);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes scaleIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
```

## Accessibility Guidelines

### Color Contrast
- All text meets WCAG 2.1 AA standards (4.5:1 for normal text, 3:1 for large text)
- Interactive elements have sufficient color contrast
- Status indicators don't rely solely on color

### Focus Management
```css
/* Focus indicators */
.focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}

/* Skip to content link */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: hsl(var(--background));
  color: hsl(var(--foreground));
  padding: 8px;
  text-decoration: none;
  border-radius: var(--radius-md);
  opacity: 0;
}

.skip-link:focus {
  top: 6px;
  opacity: 1;
}
```

### Screen Reader Support
- Semantic HTML structure
- Proper ARIA labels and roles
- Screen reader friendly status announcements

## Implementation Guidelines

### CSS Custom Properties Usage

```css
/* ✅ Correct: Use semantic design tokens */
.robot-control-button {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border-radius: var(--radius);
  padding: var(--space-3) var(--space-6);
}

/* ❌ Incorrect: Hard-coded values */
.robot-control-button {
  background-color: #1a1a2e;
  color: #ffffff;
  border-radius: 8px;
  padding: 12px 24px;
}
```

### Component Styling Best Practices

1. **Use Tailwind Classes with Design Tokens**:
```tsx
<div className="bg-background text-foreground border border-border rounded-lg p-6">
```

2. **Component-Specific CSS Classes**:
```css
.robot-joint-display {
  @apply flex items-center gap-4 p-4 rounded-lg border;
  border-color: hsl(var(--border));
}
```

3. **Conditional Styling**:
```tsx
<div className={cn(
  "base-styles",
  isActive && "active-styles",
  hasError && "error-styles"
)}>
```

This design system ensures consistency, maintainability, and accessibility across the entire robot control interface.