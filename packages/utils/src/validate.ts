// Validation utilities for props and attributes
export function isRequired(val: any): boolean {
  return val !== undefined && val !== null;
}
export function isString(val: any): val is string {
  return typeof val === 'string';
}
export function isNumber(val: any): val is number {
  return typeof val === 'number' && !isNaN(val);
}
export function isBoolean(val: any): val is boolean {
  return typeof val === 'boolean';
}
