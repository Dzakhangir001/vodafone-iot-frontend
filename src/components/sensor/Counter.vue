<template lang="pug">
  .counter-container
    .label
      slot
    .meter
      .icon-container(v-if="icon")
        img.icon(:src="icon")
      .digit(
        v-for="{ digit, index, colored } of displayDigits"
        :key="index"
        :class="{ [digitColor]: colored }"
      )
        | {{ digit }}
</template>

<script lang="ts">
import { EnumProp, NumberProp, StringProp } from '@/util/prop-decorators';
import { Component, Vue } from 'vue-property-decorator';

interface Digit {
  digit: string;
  index: number;
  colored: boolean;
}

@Component
export default class Counter extends Vue {
  @NumberProp()
  private readonly value?: number;

  @NumberProp(7)
  private readonly digits!: number;

  @NumberProp()
  private readonly fractionDigits?: number;

  @EnumProp('DARK', 'RED', 'BLUE', 'ORANGE', 'PURPLE')
  private readonly digitColor!: 'DARK' | 'RED' | 'BLUE' | 'ORANGE' | 'PURPLE';

  @StringProp()
  private readonly icon!: string;

  private get normalizedFractionDigits(): number {
    if (this.fractionDigits !== undefined) {
      return this.fractionDigits;
    }

    if (this.value === undefined) {
      return 0;
    }

    const magnitude = Math.ceil(Math.log10(this.value));

    return Math.min(3, Math.max(this.digits - magnitude, 0));
  }

  private get displayDigits(): Digit[] {
    if (this.value === undefined) {
      return this.prepareDisplayDigits('', 'X', 0);
    }

    const normalizedValue = this.value * Math.pow(10, this.normalizedFractionDigits);

    return this.prepareDisplayDigits(
      normalizedValue.toFixed(0).slice(-this.digits),
      '0',
      this.digits - this.normalizedFractionDigits,
    );
  }

  private prepareDisplayDigits(digits: string, padChar: string, colorOffset: number): Digit[] {
    return digits
      .padStart(this.digits, padChar)
      .split('')
      .map((digit, index) => ({ digit, index, colored: index < colorOffset }));
  }
}
</script>

<style lang="scss" scoped>
.counter-container {
  text-align: center;
}
.label {
  font-size: fontSize(fs-50);
  line-height: lineHeight(lh-25);
  margin-bottom: 3px;
}
.meter {
  display: flex;
  justify-content: center;
}
.icon-container {
  width: 13px;
  height: 23px;
  margin-right: 6px;
}
.icon {
  width: 12px;
  height: 17px;
  display: block;
  margin-top: 3px;
}
.digit {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15) inset;
  margin: 0 2px;
  width: 18px;
  height: 23px;
  background-color: rgba(238, 238, 238, 0.5);
  font-family: 'Arial';
  font-size: fontSize(fs-100);
  line-height: lineHeight(lh-xl);
  color: colorVodafone(grey);
}
.RED {
  color: colorVodafone(vodafone-red);
}
.BLUE {
  color: colorVodafone(aqua-blue);
}
.DARK {
  color: colorVodafone(dark-grey);
}
.PURPLE {
  color: colorVodafone(red-violet);
}
.ORANGE {
  color: colorVodafone(fresh-orange);
}
</style>
