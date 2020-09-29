export function isDef<T>(value: T): value is Exclude<T, undefined> {
  return value !== undefined;
}

export function isNotNull<T>(value: T): value is Exclude<T, null> {
  return value !== null;
}

export function isFunction(value: any): value is (...args: any[]) => any {
  return typeof value === 'function';
}

export function isString(value: any): value is string {
  return typeof value === 'string';
}

export function isNumber(value: any): value is number {
  return typeof value === 'number';
}

export function isBoolean(value: any): value is boolean {
  return typeof value === 'boolean';
}

export const isArray = Array.isArray;
