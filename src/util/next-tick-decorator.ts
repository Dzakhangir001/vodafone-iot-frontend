import { isFunction } from '@/util/lang';
import Vue from 'vue';

export default function NextTick(dedupe = false): MethodDecorator {
  return (target, propertyKey, descriptor: TypedPropertyDescriptor<any>) => {
    const method = descriptor.value;

    if (!isFunction(method)) {
      return;
    }

    if (!dedupe) {
      descriptor.value = async function(this: Vue, ...args: any[]) {
        await this.$nextTick();

        return await Promise.resolve(method.apply(this, args));
      };

      return;
    }

    const N = Symbol();

    descriptor.value = async function(this: Vue & { [N]?: number }, ...args: any[]) {
      const i = 1 + (this[N] || 0);
      this[N] = i;

      await this.$nextTick();

      if (i !== this[N]) {
        return;
      }

      return await Promise.resolve(method.apply(this, args));
    };
  };
}
