export interface ColorTokens {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  neutral: string;
}

export interface TypographyTokens {
  fontFamily: Record<string, string>;
  fontSize: Record<string, string>;
  lineHeight: Record<string, number>;
  fontWeight: Record<string, number>;
}

export interface SpacingTokens {
  [key: string]: string;
}

export interface RadiusTokens {
  [key: string]: string;
}

export interface ShadowTokens {
  [key: string]: string;
}

export interface AnimationTokens {
  duration: Record<string, string>;
  easing: Record<string, string>;
}

export interface BreakpointTokens {
  [key: string]: string;
}

export interface ZIndexTokens {
  [key: string]: number;
}

// TypeScript decorators for property binding and validation
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Constructor } from './components/UIComponent';

export interface PropertyOptions {
  type?: any;
  reflect?: boolean;
  attribute?: string;
  required?: boolean;
  default?: any;
  validator?: (value: any) => boolean;
}

// Updated property decorator for TC39/TypeScript standard decorators
export function property(options: PropertyOptions = {}) {
  return function (target: any, context: ClassFieldDecoratorContext) {
    const ctor = typeof target === 'function' ? target : target.constructor;
    if (!ctor.properties) ctor.properties = {};
    const key = context.name as string;
    ctor.properties[key] = options;
    if (options.reflect !== false) {
      if (!ctor.observedAttributes) ctor.observedAttributes = [];
      if (!ctor.observedAttributes.includes(options.attribute || key)) {
        ctor.observedAttributes.push(options.attribute || key);
      }
    }
  };
}

export function validate(_target: any, _key: string, _descriptor: PropertyDescriptor) {
  // Decorator for validation logic (to be extended)
}

// Todo types
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export type TodoFilter = 'all' | 'active' | 'completed';
