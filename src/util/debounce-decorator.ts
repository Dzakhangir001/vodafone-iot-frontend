import { debounce } from 'lodash';
import { isFunction } from '@/util/lang';

export default function Debounce(wait = 0, leading = true, trailing = true): MethodDecorator {
  const instanceMap = new WeakMap<object, (...args: any[]) => any>();

  return (target, propertyKey, descriptor: PropertyDescriptor) => {
    const method = descriptor.value;

    if (!isFunction(method)) {
      return;
    }

    descriptor.value = function(...args: any[]) {
      const debounced = instanceMap.get(this) || debounce(method, wait, { leading, trailing });

      if (!instanceMap.has(this)) {
        instanceMap.set(this, debounced);
      }

      debounced.apply(this, args);
    };
  };
}
