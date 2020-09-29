// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Name<T = unknown> extends Symbol {}
export type ResolveType<N> = N extends Name<infer T> ? T : never;

export function name<T>(desc?: string | number): Name<T> {
  return Symbol(desc);
}
