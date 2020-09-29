<template lang="pug">
  .flex(:class="{ stretch }" :style="style")
    slot
</template>

<script lang="ts">
import { BooleanProp, EnumProp } from '@/util/prop-decorators';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Flex extends Vue {
  @BooleanProp()
  public root?: boolean;
  @BooleanProp()
  public center?: boolean;
  @EnumProp(false, 'flex-start', 'flex-end', 'center', 'space-around', 'space-between')
  public justify?: string;
  @EnumProp(false, 'flex-start', 'flex-end', 'center', 'space-around', 'space-between', 'stretch')
  public align?: string;
  @EnumProp(false, 'flex-start', 'flex-end', 'center', 'baseline', 'stretch')
  public items?: string;
  @BooleanProp()
  private readonly stretch!: boolean;

  public get style() {
    const center = this.center ? 'center' : undefined;
    return {
      justifyContent: this.justify || center,
      alignContent: this.align,
      alignItems: this.items || center,
      margin: this.root ? 0 : undefined,
    };
  }
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: px2rem(-10) px2rem(-10);
}
.flex.stretch {
  width: calc(100% + 20px);
  height: calc(100% + 20px);
}
</style>
