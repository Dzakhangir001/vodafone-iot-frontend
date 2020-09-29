import { Order } from '@/types/iot-portal';

export type Column = string | ColumnOptions;
export type TextTransformer = (row: object, column: NormalizedColumnOptions, value: unknown) => string;

export interface ColumnOptions {
  /** Name of the column slot */
  name: string;
  /** Path to the value in the row item */
  field?: string;
  label?: string;
  /**
   * If this column is sortable, if the sort key is different from the name, a
   * string can be passed to be used as the sort key.
   */
  sortable?: boolean | string;
  hideable?: boolean;
  align?: 'left' | 'center' | 'right';
  width?: string | number;
  exportable?: boolean;
  textTransformer?: TextTransformer;
}

export interface SortKey {
  key: string;
  direction: Order;
}

export interface NormalizedColumnOptions extends Required<Omit<ColumnOptions, 'sortable' | 'width'>> {
  sortable?: string;
  width?: string;
  index: number;
}
