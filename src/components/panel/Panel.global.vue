<template lang="pug">
  .panel-container(:class="{ stretch }" :style="style")
    slot
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { BooleanProp, LengthProp } from '@/util/prop-decorators';
import { toLength } from '@/util/css-length';

@Component
export default class Panel extends Vue {
  @LengthProp()
  private readonly padding?: string | number;

  @BooleanProp()
  private readonly stretch!: boolean;

  @LengthProp()
  private readonly width?: string | number;

  @LengthProp()
  private readonly minWidth?: string | number;

  @LengthProp()
  private readonly maxWidth?: string | number;

  @LengthProp()
  private readonly height?: string | number;

  @LengthProp()
  private readonly minHeight?: string | number;

  @LengthProp()
  private readonly maxHeight?: string | number;

  private get style(): Record<string, string | undefined> {
    return {
      padding: toLength(this.padding),
      width: toLength(this.width),
      'min-width': toLength(this.minWidth),
      'max-width': toLength(this.maxWidth),
      height: toLength(this.height),
      'min-height': toLength(this.minHeight),
      'max-height': toLength(this.maxHeight),
    };
  }
}
</script>

<style lang="scss" scoped>
.panel-container {
  box-sizing: border-box;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.13);
  border-radius: 4px;
  padding: 20px;
  overflow: hidden;
  background-color: colorVodafone(white);
  color: colorVodafone(black);
}
.stretch {
  width: 100%;
  height: 100%;
}
</style>
