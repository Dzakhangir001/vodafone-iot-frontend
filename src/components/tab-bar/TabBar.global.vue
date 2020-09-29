<template lang="pug">
  ui-panel
    .bar(:class="barClasses")
      .scroll-button-wrapper.scroll-left
        button.scroll-button(@click="scroll(scrollRatio)") ‹
      .scroll-button-wrapper.scroll-right
        button.scroll-button(@click="scroll(-scrollRatio)") ›
      .scroll-wrapper(ref="scrollWrapper")
        .scroll-spacer
          .scroll(ref="scroll" :style="scrollStyle")
            slot
            .indicator(:class="indicatorClasses" :style="indicatorStyle")
      resize-observer(@notify="resized")
</template>

<script lang="ts">
import NextTick from '@/util/next-tick-decorator';
import { EnumProp, NumberProp } from '@/util/prop-decorators';
import Throttle from '@/util/throttle-decorator';
import { clamp, isEqual, mapValues } from 'lodash';
import { Component, Model, Vue, Watch, Provide } from 'vue-property-decorator';
import { ResizeObserver } from 'vue-resize';
import TabButton from './TabButton.global.vue';
import { TAB_BAR } from './model';

function rectOf(element: Element): { left: number; width: number } {
  const { left, right } = element.getBoundingClientRect();

  return { left, width: right - left };
}

@Component({ components: { ResizeObserver } })
export default class TabBar extends Vue {
  @Model('update')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public value: any;

  @EnumProp('bottom', 'top')
  public align!: string;

  @NumberProp(0.66, 0)
  public scrollRatio!: number;

  public selected: TabButton | null = null;

  public indicatorClasses = {
    on: false,
    left: false,
    right: false,
  };

  public indicatorPosition = {
    left: -200,
    right: 0,
  };

  public fits = true;

  public scrollLeft = 0;

  public $refs!: { scrollWrapper: Element; scroll: Element };

  public get indicatorStyle() {
    return mapValues(this.indicatorPosition, (value) => `${value}px`);
  }

  public get scrollStyle() {
    return { left: `${this.scrollLeft}px` };
  }

  public get barClasses() {
    const { align, fits } = this;

    return { [align]: true, fits };
  }

  @Provide(TAB_BAR)
  public getTabBar(): TabBar {
    return this;
  }

  @Watch('selected')
  @NextTick(true)
  public updateIndicator() {
    if (!this.selected) {
      this.indicatorClasses.on = false;
      this.indicatorClasses.left = false;
      this.indicatorClasses.right = false;

      return;
    }

    const selected = this.selected.$el;
    const scroll = this.$refs.scroll;

    const previousLeft = this.indicatorPosition.left;

    const selectedRect = selected.getBoundingClientRect();
    const barRect = scroll.getBoundingClientRect();

    this.indicatorPosition.left = selectedRect.left - barRect.left;
    this.indicatorPosition.right = barRect.right - selectedRect.right;

    if (this.indicatorClasses.on === false) {
      this.indicatorClasses.on = true;

      return;
    }

    this.indicatorClasses.left = previousLeft > this.indicatorPosition.left;
    this.indicatorClasses.right = previousLeft < this.indicatorPosition.left;
  }

  @Throttle(500, false)
  public resized() {
    this.updateScroll();
  }

  @Watch('selected')
  @NextTick(true)
  public updateScroll() {
    if (!this.selected) {
      return;
    }

    const scrollWrapperRect = rectOf(this.$refs.scrollWrapper);
    const scrollRect = rectOf(this.$refs.scroll);
    const selectedRect = rectOf(this.selected.$el);

    const left = scrollRect.left - selectedRect.left + scrollWrapperRect.width / 2 - selectedRect.width / 2;

    this.setScrollLeft(left);
  }

  public scroll(amount: number) {
    const diff = rectOf(this.$refs.scrollWrapper).width * amount;

    this.setScrollLeft(this.scrollLeft + diff);
  }

  public setScrollLeft(scrollLeft: number) {
    const maxScrollLeft = rectOf(this.$refs.scrollWrapper).width - rectOf(this.$refs.scroll).width;

    if (maxScrollLeft >= 0) {
      this.fits = true;
      this.scrollLeft = 0;

      return;
    }

    this.fits = false;
    this.scrollLeft = clamp(scrollLeft, maxScrollLeft, 0);
  }

  @Watch('value')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public resetSelected(value: any) {
    if (this.selected && !isEqual(this.selected.value, value)) {
      this.selected = null;
    }
  }

  public isSelected(button: TabButton): boolean {
    if (this.selected) {
      return this.selected === button;
    }

    if (isEqual(this.value, button.value)) {
      this.selected = button;

      return true;
    }

    return false;
  }

  public select(button: TabButton): void {
    this.selected = button;

    this.$emit('update', button.value);
  }

  public removed(button: TabButton): void {
    if (this.selected === button) {
      this.selected = null;
    }
  }
}
</script>

<style lang="scss" scoped>
.bar {
  position: relative;
  font-size: fontSize(fs-100);
  margin: -20px;
  padding: 0 20px;
}

.scroll-button-wrapper {
  position: absolute;
  top: 0;
  width: 20px;
  height: 100%;
  z-index: 20;
  &.scroll-left {
    left: 0;
  }
  &.scroll-right {
    right: 0;
  }
}

.scroll-button {
  height: 100%;
  width: 100%;
  padding: 10px 0;
  border: none;
  background-color: transparent;
  color: colorVodafone(grey);
  line-height: 1.3;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    color: colorVodafone(vodafone-red);
  }

  &:focus {
    outline: none;
  }
  .fits & {
    display: none;
  }
}

.scroll-wrapper {
  overflow: hidden;
}

.scroll-spacer {
  display: flex;
}

.scroll {
  flex: 0 0 auto;
  position: relative;
  display: flex;
  transition: left 0.5s;
}

.indicator {
  position: absolute;
  height: 2px;
  z-index: 10;
  background-color: colorVodafone(vodafone-red);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
  &.on {
    opacity: 1;
  }
  &.left {
    transition: left 0.2s, right 0.15s 0.05s;
  }
  &.right {
    transition: left 0.15s 0.05s, right 0.2s;
  }
  .top & {
    top: 0;
  }
  .bottom & {
    bottom: 0;
  }
}
</style>
