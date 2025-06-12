// Base Props Interface
export interface BaseProps {
  className?: string;
  style?: React.CSSProperties;
}

// Component Specific Props
export interface HelloSharedProps extends BaseProps {
  // Add specific props here
} 