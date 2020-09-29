export function formatValue(value: any): string {
  return `${Number(value).toLocaleString()}\u200a°C`;
}
