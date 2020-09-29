<template lang="pug">
  .scale-wrapper
    .title(v-if="title")
      | {{ title }}
    .bar-wrapper
      .bar
        .value-bar(:style="{ width: `${value * 100 / maxValue}%`, }" :class="color")
      .ruler
        .ruler-line(
          v-for="i in steps"
          :style="generateRulerStyle(i)"
        )
          .range(v-if="i === minValue || i === minIntervalValue || i === maxIntervalValue")
            | {{ i }}°
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { StringProp, NumberProp, EnumProp } from '@/util/prop-decorators';
import { range } from 'lodash';

@Component
export default class ScaleElement extends Vue {
  @StringProp()
  private readonly title?: string;
  @NumberProp()
  private readonly value!: number;
  @EnumProp('GREEN', 'RED', 'ORANGE')
  private readonly color?: string;
  @NumberProp()
  private readonly valueSteps?: number;
  @NumberProp()
  private readonly minValue!: number;
  @NumberProp()
  private readonly maxValue!: number;
  @NumberProp()
  private readonly minIntervalValue?: number;
  @NumberProp()
  private readonly maxIntervalValue?: number;

  private get steps(): number[] {
    return range(this.minValue, this.maxValue + 1, this.valueSteps);
  }

  private generateRulerStyle(i: number): Record<string, string | undefined> {
    return {
      height: i === this.minValue || i % 10 === 0 ? '12px' : '6px',
      left: i + '%',
      'border-left':
        i === this.minValue ||
        (this.minIntervalValue && this.maxIntervalValue && i >= this.minIntervalValue && i <= this.maxIntervalValue)
          ? '1px solid #c5c5c5'
          : '1px solid transparent',
    };
  }
}
</script>

<style lang="scss" scoped>
.scale-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.bar-wrapper {
  display: block;
  width: 100%;
}
.bar {
  width: 100%;
  height: 8px;
  min-width: 132px;
  border-radius: 6px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
  background-color: #c5c5c5;
  overflow: hidden;
}
.title {
  color: #333333;
}
.value-bar {
  height: 8px;
  float: left;
}
.ruler {
  font-size: fontSize(fs-100);
  top: 5px;
  height: 10px;
  position: relative;
  margin: 7px 0 0 8px;
  width: calc(100% - 7px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: colorVodafone(light);
}
.ruler-line {
  height: 14px;
  width: 100%;
  .range {
    position: absolute;
    top: 100%;
    transform: translate3d(-50%, 0, 0.1px);
    margin-top: 5px;
  }
}
.GREEN {
  background-color: colorVodafone(digital-green);
}
.RED {
  background-color: colorVodafone(vodafone-red);
}
.ORANGE {
  background-color: colorVodafone(fresh-orang);
}
</style>
