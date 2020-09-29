declare module '@storybook/addon-knobs' {
  import { StoryDecorator } from '@storybook/vue';

  export interface WithKnobsOptions {
    timestamps: boolean;
    escapeHTML: boolean;
  }

  export const withKnobs: StoryDecorator & ((options?: WithKnobsOptions) => StoryDecorator);

  export interface KnobOption<T> {
    value: T;
    type: 'text' | 'boolean' | 'number' | 'color' | 'object' | 'select' | 'date';
  }

  export interface StoryContext {
    kind: string;
    story: string;
  }

  export interface NumberOptions {
    range: boolean;
    min: number;
    max: number;
    step: number;
  }

  export interface EmptyNumberOptions {
    range?: undefined;
    min?: undefined;
    max?: undefined;
    step?: undefined;
  }

  export function knob<T>(name: string, options: KnobOption<T>): T;

  export function text(name: string, value: string | null, groupId?: string): string;

  export function boolean(name: string, value: boolean, groupId?: string): boolean;

  export function files(label: string, accept: string, defaultValue: string[]): string[];

  export function number(
    name: string,
    value: number,
    options?: NumberOptions | EmptyNumberOptions,
    groupId?: string,
  ): number;

  export function color(name: string, value: string, groupId?: string): string;

  export function object<T>(name: string, value: T, groupId?: string): T;

  export type SelectValue = string | number;
  export function select<T extends SelectValue>(
    name: string,
    options: { [s: string]: T },
    value: T | readonly T[],
    groupId?: string,
  ): T;
  export function select<T extends SelectValue>(
    name: string,
    options: { [s: string]: readonly T[] },
    value: readonly T[],
    groupId?: string,
  ): T[];
  export function select<T extends SelectValue>(
    name: string,
    options: { [s: string]: T | readonly T[] },
    value: T | readonly T[],
    groupId?: string,
  ): T | T[];
  export function select<T extends SelectValue>(name: string, options: readonly T[], value: T, groupId?: string): T;

  export function date(name: string, value?: Date, groupId?: string): Date;

  export function array<T>(name: string, value: readonly T[], separator?: string, groupId?: string): T[];

  export function button(name: string, handler: () => any, groupId?: string): void;
}
