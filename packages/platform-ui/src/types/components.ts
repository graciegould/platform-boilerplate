import { FC } from 'react';
import { HelloSharedProps } from './props';

// Component Type Definitions
export type HelloSharedComponent = FC<HelloSharedProps>;

// Component Registry Type
export interface ComponentRegistry {
  HelloShared: HelloSharedComponent;
  // Add new components here as they are created
} 