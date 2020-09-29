<template lang="pug">
  a.button(:class="{ active }" @click="clicked")
    slot
</template>

<script lang="ts">
import { Component, Prop, Vue, Inject } from 'vue-property-decorator';
import TabBar from './TabBar.global.vue';
import { TAB_BAR } from './model';

@Component
export default class TabButton extends Vue {
  @Prop()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public value: any;

  @Inject(TAB_BAR)
  private readonly getTabBar!: TabBar['getTabBar'];

  public get active() {
    return this.getTabBar().isSelected(this);
  }

  public clicked() {
    this.getTabBar().select(this);
  }

  public destroyed() {
    this.getTabBar().removed(this);
  }
}
</script>

<style lang="scss" scoped>
.button {
  flex: 0 0 auto;
  display: block;
  box-sizing: border-box;
  height: 100%;
  padding: 20px 10px;
  overflow: hidden;
  color: colorVodafone(black);
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-decoration: none;
  cursor: pointer;

  transition: background-color 0.3s, color 0.3s;

  &:hover {
    color: colorVodafone(vodafone-red);
  }

  &.active {
    color: colorVodafone(vodafone-red);
  }
}
</style>
