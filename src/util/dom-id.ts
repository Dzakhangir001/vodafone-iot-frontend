export function generateDomId(prefix = 'i'): string {
  const rand = Math.random()
    .toString(36)
    .substr(2);

  return prefix + rand;
}
