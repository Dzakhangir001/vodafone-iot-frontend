/**
 * Normalizes the given value to be used as a CSS length value.
 * Strings and undefined are returned as-is, while numbers greater than 1 are
 * returned as length in pixels and numbers lower than or equal to 1 are
 * returned as percent.
 *
 * @param value The value to normalize.
 */
export function toLength(value?: string | number): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (typeof value === 'string') {
    return value;
  }

  if (value > 1) {
    return `${value}px`;
  }

  return `${value * 100}%`;
}
