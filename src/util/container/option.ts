import { Name } from './name';

export type OptionName<T = unknown> = Name<T[]>;
export type ResolveOptionType<O> = O extends OptionName<infer T> ? T : never;

// export function optionName<T>(desc?: string | number): OptionName<T> {
export function optionName<T>(desc?: string | number): OptionName<T> {
  return Symbol(desc);
}
