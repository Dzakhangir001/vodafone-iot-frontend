<template lang="pug">
  img.image(v-if="state === 'GRAY'" :style="style" src="./gray.svg")
  img.image(v-else-if="state === 'GREEN'" :style="style" src="./green.svg")
  img.image(v-else-if="state === 'RED'" :style="style" src="./red.svg")
</template>

<script lang="ts">
import { toLength } from '@/util/css-length';
import { LengthProp } from '@/util/prop-decorators';
import { Component, Mixins } from 'vue-property-decorator';
import StateProperty from './state-property-mixin';

@Component
export default class StateIndicator extends Mixins(StateProperty) {
  @LengthProp()
  private readonly size?: string | number;

  private get style(): Record<string, string | undefined> {
    const size = toLength(this.size);

    return { width: size, height: size };
  }
}
</script>

<style lang="scss" scoped>
.image {
  display: block;
  width: 25px;
  height: 25px;
}
</style>
