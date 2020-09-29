import { isBoolean, isDef, isString } from '@/util/lang';
import { Prop } from 'vue-property-decorator';

type PropDecorator = ReturnType<typeof Prop>;

export function RequiredProp(): PropDecorator {
  return Prop({ required: true });
}

export function OptionalProp(def: any = undefined): PropDecorator {
  return Prop({ required: false, default: def });
}

/**
 * A string component property.
 *
 * @param def The default value or a boolean indicating if this property is
 *    required. Defaults to false. If a default value is given, the property is
 *    not required.
 */
export function StringProp(def: string | boolean = false): PropDecorator {
  return Prop({
    type: String,
    required: def === true,
    default: isBoolean(def) ? undefined : def,
  });
}

/**
 * A component property with enumerated string values.
 *
 * @param def The default value or a boolean indicating if this property is
 *    required. Defaults to false. If a default value is given, it is added to
 *    the list of allowed values and the property is not required.
 * @param values Allowed values
 */
export function EnumProp(def: string | boolean = false, ...values: string[]): PropDecorator {
  if (isString(def)) {
    values.push(def);
  }

  return Prop({
    type: String,
    required: def === true,
    default: isBoolean(def) ? undefined : def,
    validator: (value: string) => values.indexOf(value) !== -1,
  });
}

type NumberValidator = (value: number) => boolean;

/**
 * A number component property with optional limits and additional validators.
 *
 * @param def The default value or a boolean indicating if this property is
 *    required. Defaults to false. If a default value is given, the property is
 *    not required. The default value is not checked for the given constraints.
 * @param min Minimum value allowed
 * @param max Maximum value allowed
 * @param validators Additional validators receiving the number as their first
 *    argument and returning a boolean to indicate, if the number is accepted
 *    as a value of this prop.
 */
export function NumberProp(
  def: number | boolean = false,
  min?: number,
  max?: number,
  ...validators: NumberValidator[]
): PropDecorator {
  if (isDef(min)) {
    validators.push((value) => value >= min);
  }

  if (isDef(max)) {
    validators.push((value) => value <= max);
  }

  return Prop({
    type: Number,
    required: def === true,
    default: isBoolean(def) ? undefined : def,
    validator: (value: number) => validators.every((validator) => validator(value)),
  });
}

/**
 * A integer component property with optional limits and additional validators.
 *
 * @param def The default value or a boolean indicating if this property is
 *    required. Defaults to false. If a default value is given, the property is
 *    not required. The default value is not checked for the given constraints.
 * @param min Minimum value allowed
 * @param max Maximum value allowed
 * @param validators Additional validators receiving the number as their first
 *    argument and returning a boolean to indicate, if the number is accepted
 *    as a value of this prop.
 */
export function IntegerProp(
  def: number | boolean = false,
  min?: number,
  max?: number,
  ...validators: NumberValidator[]
): PropDecorator {
  return NumberProp(def, min, max, Number.isInteger, ...validators);
}

/**
 * A component property that contains a valid CSS length value. Allowed are
 * numbers (which will be interpreted as pixels) and strings (which should be
 * compatible to values accepted by CSS, but are not further checked by this
 * property).
 *
 * @param def The default value or a boolean indicating if this property is
 *    required. Defaults to false. If a default value is given the property is
 *    not required.
 */
export function LengthProp(def: string | number | boolean = false): PropDecorator {
  return Prop({
    type: [String, Number],
    required: def === true,
    default: isBoolean(def) ? undefined : def,
    validator: (value: string | number) => typeof value === 'string' || value >= 0,
  });
}

/**
 * A boolean component property.
 *
 * @param def The default value. Defaults to false.
 */
export function BooleanProp(def = false): PropDecorator {
  return Prop({
    type: Boolean,
    default: def,
  });
}

type ArrayFactory = () => any[];

/**
 * A component property that contains an array.
 *
 * @param def The default value factory or a boolean indicating if this property
 *    is required. Defaults to false. If a default value is given the property
 *    is not required.
 */
export function ArrayProp(def: ArrayFactory | boolean = false): PropDecorator {
  return Prop({
    type: Array,
    required: def === true,
    default: isBoolean(def) ? undefined : def,
  });
}

type ObjectFactory = () => object;
type Constructor = new (...args: any[]) => any;

/**
 * A component property that contains an object.
 *
 * @param def The default value factory or a boolean indicating if this property
 *    is required. Defaults to false. If a default value is given the property
 *    is not required.
 * @param ctor The constructor
 */
export function ObjectProp(def: ObjectFactory | boolean = false, ctor: Constructor = Object): PropDecorator {
  return Prop({
    type: ctor,
    required: def === true,
    default: isBoolean(def) ? undefined : def,
  });
}

type Callback = (...args: any[]) => any;

/**
 * A component property that contains a function.
 *
 * @param def The default value or a boolean indicating if this property is
 *    required. Defaults to false. If a default value is given the property
 *    is not required.
 */
export function FunctionProp(def: Callback | boolean = false): PropDecorator {
  return Prop({
    type: Function,
    required: def === true,
    default: isBoolean(def) ? undefined : def,
  });
}
