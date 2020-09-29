<template lang="pug">
  .layout-default(key="layout" :class="{ 'node-tree-bar-disabled': nodeTreeBarDisabled }")
    header.header.on-top(key="header")
      slot(name="header")
        top-bar-control
    aside.app-bar.on-top(key="app-bar")
      slot(name="app-bar")
        app-bar-control
    transition(name="node-tree-bar" mode="out-in")
      aside.node-tree-bar.on-top(v-if="!nodeTreeBarDisabled" key="node-tree-bar")
        slot(name="node-tree-bar")
          node-tree-bar-control
    main.main(key="main")
      transition(name="main" mode="out-in")
        slot
    ui-clickable.scroll-to-top(v-if="scrollToTop" :class="{ scrolled }" @click="doScrollToTop")
      ui-panel.scroll-to-top-panel(:width="40" :height="40")
        img(src="../../assets/triangle.svg")
</template>

<script lang="ts">
import { BooleanProp } from '@/util/prop-decorators';
import { throttle } from 'lodash';
import { Component, Vue } from 'vue-property-decorator';
import AppBarControl from '../controls/AppBarControl.vue';
import NodeTreeBarControl from '../controls/NodeTreeBarControl.vue';
import TopBarControl from '../controls/TopBarControl.vue';
import { RootGetter } from '../../store';
import { App } from '../../model';

@Component({ components: { AppBarControl, NodeTreeBarControl, TopBarControl } })
export default class LayoutDefault extends Vue {
  @BooleanProp()
  private nodeTreeBar!: boolean;

  @BooleanProp()
  private readonly scrollToTop!: boolean;

  @RootGetter
  private readonly app?: App;

  private scrolled = false;

  private get nodeTreeBarDisabled(): boolean {
    return !this.nodeTreeBar || !this.app || !this.app.generateNodeLocation;
  }

  private doScrollToTop(): void {
    window.scroll({ top: 0, behavior: 'smooth' });
  }

  private created(): void {
    const updateScrolled = throttle(
      () => void (this.scrolled = (window.scrollY !== undefined ? window.scrollY : window.pageYOffset) > 76),
      200,
      { leading: true, trailing: true },
    );

    window.addEventListener('scroll', updateScrolled, { passive: true });
    this.$once('hook:destroyed', () => void window.removeEventListener('scroll', updateScrolled));
  }
}
</script>

<style lang="scss" scoped>
$headerHeight: px2rem(76);
$appBarWidth: px2rem(50);
$nodeTreeBarWidth: px2rem(240);
// ease-out-cubic
$ease: cubic-bezier(0.19, 1, 0.22, 1);
$easeDuration: 0.5s;

.layout-default {
  box-sizing: border-box;
  padding: $headerHeight 0 0 #{$appBarWidth + $nodeTreeBarWidth};
  min-height: 100vh;
  transition: padding $easeDuration $ease;
}

.layout-default.node-tree-bar-disabled {
  padding-left: $appBarWidth;
}

.header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: $headerHeight;
  z-index: 100;
}

.app-bar {
  position: fixed;
  left: 0;
  top: $headerHeight;
  width: $appBarWidth;
  height: calc(100% - #{$headerHeight});
  overflow: hidden;
  z-index: 90;
}

.node-tree-bar {
  position: fixed;
  left: $appBarWidth;
  top: $headerHeight;
  width: $nodeTreeBarWidth;
  height: calc(100% - #{$headerHeight});
  overflow: hidden;
  z-index: 80;
  transition: left $easeDuration $ease;
}

.main {
  padding: px2rem(20) px2rem(20);
  margin-bottom: 60px;
}

.node-tree-bar-enter-active,
.node-tree-bar-leave-active {
  transition: left $easeDuration $ease;
}
.node-tree-bar-enter,
.node-tree-bar-leave-to {
  left: #{$appBarWidth - $nodeTreeBarWidth};
}

.layout-enter-active,
.layout-leave-active {
  transition: opacity 300ms;
}
.layout-enter,
.layout-leave-to {
  opacity: 0;
}

.main-enter-active,
.main-leave-active {
  transition: opacity 300ms;
}
.main-enter,
.main-leave-to {
  opacity: 0;
}

.scroll-to-top {
  display: none;
  position: fixed;
  bottom: 20px;
  right: 40px;
}
.scroll-to-top.scrolled {
  display: block;
}
.scroll-to-top-panel {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
