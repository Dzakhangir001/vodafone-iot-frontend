export function octetLength(string: string): number {
  return encodeURI(string).split(/%(?:u[0-9A-F]{2})?[0-9A-F]{2}|./).length - 1;
}
