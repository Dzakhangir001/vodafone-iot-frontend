<template lang="pug">
  .cell(:class="{ 'push-right': pushRight }" :style="flexChildStyle")
    slot
</template>

<script lang="ts">
import FlexChildStyle from '@/components/mixins/flex-child-style';
import { BooleanProp } from '@/util/prop-decorators';
import { Component, Mixins } from 'vue-property-decorator';

@Component
export default class Cell extends Mixins(FlexChildStyle) {
  @BooleanProp()
  private readonly pushRight!: boolean;
}
</script>

<style lang="scss" scoped>
.cell {
  flex: 1 0 0;
  box-sizing: border-box;
  max-width: 100%;
  padding: px2rem(10) px2rem(10);
}
.push-right {
  margin-left: auto;
}
</style>
