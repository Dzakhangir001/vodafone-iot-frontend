import { throttle } from 'lodash';
import { isFunction } from '@/util/lang';

export default function Throttle(wait = 0, leading = true, trailing = true): MethodDecorator {
  const instanceMap = new WeakMap<object, (...args: any[]) => any>();

  return (target, propertyKey, descriptor: PropertyDescriptor) => {
    const method = descriptor.value;

    if (!isFunction(method)) {
      return;
    }

    descriptor.value = function(...args: any[]) {
      const throttled = instanceMap.get(this) || throttle(method, wait, { leading, trailing });

      if (!instanceMap.has(this)) {
        instanceMap.set(this, throttled);
      }

      throttled.apply(this, args);
    };
  };
}
