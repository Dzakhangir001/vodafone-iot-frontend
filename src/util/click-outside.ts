import { VueConstructor, DirectiveOptions } from 'vue';
import { isFunction } from '@/util/lang';

type Callback = (event: Event) => boolean | void;

export default function registerClickOutside(vue: VueConstructor, name = 'click-outside'): void {
  vue.directive(name, createDirective());
}

export function createDirective(): DirectiveOptions {
  const callbacks = new Map<Callback, Element>();

  function handler(event: Event): void {
    if (!(event.target instanceof Node)) {
      return;
    }

    for (const [callback, el] of callbacks) {
      if (el.contains(event.target)) {
        continue;
      }

      callback(event);
    }
  }

  return {
    bind(el, { value }) {
      if (!isFunction(value) || callbacks.has(value)) {
        return;
      }

      if (!callbacks.size) {
        document.body.addEventListener('click', handler, true);
      }

      callbacks.set(value, el);
    },
    unbind(el, { value }) {
      callbacks.delete(value);

      if (!callbacks.size) {
        document.body.removeEventListener('click', handler, true);
      }
    },
  };
}
