import { OptionalProp, RequiredProp } from '@/util/prop-decorators';
import { Component as ComponentType, CreateElement, VNode } from 'vue';
import { Component, Inject, Provide, Vue } from 'vue-property-decorator';
import { NormalizedScopedSlot } from 'vue/types/vnode';

const REGISTER_LAYOUT = Symbol('REGISTER_LAYOUT');
const UNREGISTER_LAYOUT = Symbol('UNREGISTER_LAYOUT');
const EMPTY_CONFIG = { _isVue: true } as const;

type ComponentReference = string | ComponentType;

interface LayoutConfig {
  _isVue: true;
  use?: ComponentReference;
  slots?: Vue['$scopedSlots'];
  attrs?: Vue['$attrs'];
}

@Component
export default class LayoutEngine extends Vue {
  @OptionalProp()
  private defaultLayout?: ComponentReference;

  private config: LayoutConfig = EMPTY_CONFIG;

  // non reactive by default
  private owner?: Vue;

  @Provide(REGISTER_LAYOUT)
  public registerLayout(owner: Layout, config: LayoutConfig): void {
    this.owner = owner;
    this.config = config;
  }

  @Provide(UNREGISTER_LAYOUT)
  public unregisterLayout(owner: Layout): void {
    if (owner !== this.owner) {
      return;
    }

    this.owner = undefined;
    this.config = EMPTY_CONFIG;
  }

  public render(h: CreateElement): VNode {
    const def = this.$scopedSlots.default;
    const defaultSlot = def ? def({}) : undefined;

    const transition = h('transition', { props: { name: 'layout', mode: 'out-in' } }, [this.createLayoutVNode()]);

    return h('div', [defaultSlot, transition]);
  }

  private createLayoutVNode(): VNode | undefined {
    if (this.config === EMPTY_CONFIG) {
      return undefined;
    }

    return this.$createElement(this.config.use || this.defaultLayout || 'div', {
      scopedSlots: this.config.slots,
      attrs: { ...this.config.attrs },
    });
  }
}

@Component({ inheritAttrs: false })
export class Layout extends Vue {
  @RequiredProp()
  public use!: ComponentReference;

  @Inject(REGISTER_LAYOUT)
  public readonly registerLayout!: LayoutEngine['registerLayout'];

  @Inject(UNREGISTER_LAYOUT)
  public readonly unregisterLayout!: LayoutEngine['unregisterLayout'];

  private readonly _uid!: number;

  public render(h: CreateElement): VNode {
    const entries = Object.entries(this.$scopedSlots).map(([key, slot]) => [key, this.wrapSlot(slot, key)] as const);

    this.registerLayout(this, {
      _isVue: true,
      use: this.use,
      attrs: this.$attrs,
      slots: Object.fromEntries(entries),
    });

    return h();
  }

  public beforeDestroy(): void {
    this.unregisterLayout(this);
  }

  private wrapSlot(slot: NormalizedScopedSlot | undefined, key: string): NormalizedScopedSlot | undefined {
    if (!slot) {
      return undefined;
    }

    return (props) => {
      const children = slot(props);
      if (!children || children.length === 0) {
        return children;
      }

      return [this.$parent.$createElement('div', { key: `${this._uid}-${key}` }, children)];
    };
  }
}
