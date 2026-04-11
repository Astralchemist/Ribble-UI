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

export interface PropertyOptions {
  type?: any;
  reflect?: boolean;
  attribute?: string;
  required?: boolean;
  default?: any;
  validator?: (value: any) => boolean;
}

// Legacy TypeScript property decorator (experimentalDecorators=true).
// Runs at class definition time so observedAttributes is populated before
// customElements.define() picks the class up.
export function property(options: PropertyOptions = {}) {
  return function (target: any, propertyKey: string) {
    const ctor = target.constructor;
    // Own-property guard so subclasses don't mutate base-class state via
    // prototype inheritance.
    if (!Object.prototype.hasOwnProperty.call(ctor, 'properties')) {
      ctor.properties = { ...(ctor.properties || {}) };
    }
    ctor.properties[propertyKey] = options;
    if (options.reflect !== false) {
      if (!Object.prototype.hasOwnProperty.call(ctor, 'observedAttributes')) {
        ctor.observedAttributes = [...(ctor.observedAttributes || [])];
      }
      const attr = options.attribute || propertyKey;
      if (!ctor.observedAttributes.includes(attr)) {
        ctor.observedAttributes.push(attr);
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
