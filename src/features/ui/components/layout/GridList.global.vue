<script lang="ts">
import { toLength } from '@/util/css-length';
import { LengthProp } from '@/util/prop-decorators';
import { CreateElement } from 'vue';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class GridList extends Vue {
  @LengthProp('auto')
  private readonly minColumnWidth!: string | number;

  @LengthProp('auto')
  private readonly rowHeight!: string | number;

  @LengthProp()
  private readonly gap?: string | number;

  private get gridStyles() {
    return {
      'grid-template-columns': `repeat(auto-fill, minmax(${toLength(this.minColumnWidth)}, 1fr))`,
      'grid-auto-rows': toLength(this.rowHeight),
      gap: toLength(this.gap),
    };
  }

  public render(h: CreateElement) {
    const def = this.$scopedSlots.default;
    const defaultSlot = def ? def({}) : undefined;

    const wrappedDefaultSlot = (defaultSlot || [])
      .filter((node) => node.key !== undefined)
      .map((node) => {
        const scale = h('div', { staticClass: 'scale' }, [node]);
        return h('div', { staticClass: 'cell', key: node.key }, [scale]);
      });

    return h(
      'transition-group',
      {
        ref: 'parent',
        tag: 'div',
        staticClass: 'grid-list',
        props: { name: 'grid-list' },
        style: this.gridStyles,
        on: { beforeLeave: this.beforeLeave },
      },
      wrappedDefaultSlot,
    );
  }

  public beforeLeave(el: HTMLElement) {
    const { width, height } = window.getComputedStyle(el);
    el.style.left = `${el.offsetLeft}px`;
    el.style.top = `${el.offsetTop}px`;
    el.style.width = width;
    el.style.height = height;
  }
}
</script>

<style lang="scss" scoped>
.grid-list {
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: auto;
  gap: 20px;
}
.cell {
  z-index: 10;
}
.scale {
  height: 100%;
  width: 100%;
}
.cell,
.scale {
  transition: all 0.6s;
}
.grid-list-enter {
  z-index: 5;
}
.grid-list-enter,
.grid-list-leave-to {
  opacity: 0;
}
.grid-list-enter > .scale,
.grid-list-leave-to > .scale {
  transform: scale(0);
}
.grid-list-leave-active {
  position: absolute;
  z-index: 0;
}
</style>
