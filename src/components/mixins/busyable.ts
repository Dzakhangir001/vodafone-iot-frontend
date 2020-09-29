import { isFunction } from '@/util/lang';
import { Component, Vue } from 'vue-property-decorator';

/*
 * Usage:
 * class MyComponent extends Mixins(Busyable) {
 *   @Busy()
 *   public async calculate(): Promise<number> {
 *     const result = await calculation();
 *
 *     return result;
 *   }
 * }
 */

type TypedMethodDecorator<T> = (
  // eslint-disable-next-line @typescript-eslint/ban-types
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<T>,
) => TypedPropertyDescriptor<T> | void;

type BusyableMethod = (this: Busyable, ...args: any[]) => Promise<any>;

export function Busy(): TypedMethodDecorator<BusyableMethod> {
  return (target, prop, descriptor) => {
    const method = descriptor.value;

    if (!isFunction(method)) {
      return;
    }

    descriptor.value = function(...args) {
      return this.awaitBusy(Promise.resolve(method.apply(this, args)));
    };
  };
}

@Component
export default class Busyable extends Vue {
  private busyDepth = 0;

  public get busy(): boolean {
    return this.busyDepth > 0;
  }

  public async awaitBusy<T = unknown>(promise: Promise<T>): Promise<T> {
    this.busyDepth++;
    try {
      return await promise;
    } finally {
      this.busyDepth--;
    }
  }
}
