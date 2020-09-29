import { boolean, color, number, object, select, SelectValue, text } from '@storybook/addon-knobs';
import { PropOptions } from 'vue';

export function textProp(label: string, def: string | null): PropOptions {
  return {
    type: String,
    default: text(label, def),
  };
}

export function booleanProp(label: string, def: boolean): PropOptions {
  return {
    type: Boolean,
    default: boolean(label, def),
  };
}

export function numberProp(label: string, def: number, min?: number, max?: number, step = 1): PropOptions {
  const options = min !== undefined && max !== undefined ? { range: true, min, max, step } : {};

  return {
    type: Number,
    default: number(label, def, options),
  };
}

export function selectProp(label: string, def: SelectValue, ...values: SelectValue[]): PropOptions {
  const options = { [String(def)]: def };

  values.forEach((value) => {
    options[String(value)] = value;
  });

  return {
    type: String,
    default: select(label, options, def),
  };
}

export function numberSelectProp(label: string, def: SelectValue, ...values: SelectValue[]): PropOptions {
  const options = { [String(def)]: def };

  values.forEach((value) => {
    options[Number(value)] = value;
  });

  return {
    type: Number,
    default: select(label, options, def),
  };
}

export function colorProp(label: string, def: string): PropOptions {
  return {
    type: String,
    default: color(label, def),
  };
}

export function objectProp(label: string, def: any, array = false): PropOptions {
  return {
    type: array ? Array : Object,
    default: object(label, def),
  };
}
