import { debounce } from 'lodash';
import { VueConstructor, DirectiveOptions } from 'vue';

type Handler = (event: Event) => void;

const DEFAULT_EVENT_NAME = 'hover';
const TRUE = (): boolean => true;
const FALSE = (): boolean => false;
const enterHandlers = new WeakMap<HTMLElement, Handler>();
const leaveHandlers = new WeakMap<HTMLElement, Handler>();

function createHandler(el: HTMLElement, state: (event: Event) => boolean, name?: string, wait?: number): Handler {
  const handler = (event: Event): void => {
    el.dispatchEvent(new CustomEvent(name || DEFAULT_EVENT_NAME, { detail: { state: state(event), cause: event } }));
  };
  return wait && wait > 0 ? debounce(handler, wait) : handler;
}

const directive: DirectiveOptions = {
  bind(el, { arg, value = {} }) {
    const enterHandler = createHandler(el, TRUE, arg, value.enterDelay);
    el.addEventListener('mouseenter', enterHandler);
    enterHandlers.set(el, enterHandler);

    const leaveHandler = createHandler(el, FALSE, arg, value.leaveDelay);
    el.addEventListener('mouseleave', leaveHandler);
    leaveHandlers.set(el, leaveHandler);
  },
  unbind(el) {
    const enterHandler = enterHandlers.get(el);
    if (enterHandler) {
      el.removeEventListener('mouseenter', enterHandler);
      enterHandlers.delete(el);
    }

    const leaveHandler = leaveHandlers.get(el);
    if (leaveHandler) {
      el.removeEventListener('mouseenter', leaveHandler);
      leaveHandlers.delete(el);
    }
  },
};

export default function registerHover(vue: VueConstructor, name = 'hover'): void {
  vue.directive(name, directive);
}
