<template lang="pug">
  device-panel(v-bind="$attrs" :background-image="heatCostAllocatorLg")
    template(#actions)
      slot(name="actions")
    template(#properties)
      slot(name="properties")
    template(#overlay)
      slot(name="overlay")
    template(#content)
      .values
        .value
          .temperature
            | {{ radiatorTemperature ? radiatorTemperature.toLocaleString(undefined, { maximumFractionDigits: 0 }) : 'XX' }}{{ '\u200a' }}°C
          .place
            | Heizung
        .value
          .temperature
            | {{ roomTemperature ? roomTemperature.toLocaleString(undefined, { maximumFractionDigits: 0 }) : 'XX' }}{{ '\u200a' }}°C
          .place
            | Raum
    template(#footer)
      .metric
        ui-counter(:value="meterReading" :digits="5" :fraction-digits="0" digit-color="DARK")
          | Zählerstand
        p(v-if="meterReadingDate")
          ui-relative-time(:date="meterReadingDate" #default="{ displayDate }")
            | {{ displayDate }} abgelesen
        p(v-else)
          | Keine Daten verfügbar
</template>

<script lang="ts">
import UiCounter from '@/components/sensor/Counter.vue';
import DevicePanel from '@/components/sensor/DevicePanel.vue';
import { NumberProp, OptionalProp } from '@/util/prop-decorators';
import { MomentInput } from 'moment';
import { Component, Vue } from 'vue-property-decorator';
import heatCostAllocatorLg from './heat-cost-allocator-lg.svg';

@Component({ components: { DevicePanel, UiCounter }, inheritAttrs: false })
export default class HeatCostAllocatorDevicePanel extends Vue {
  @NumberProp()
  private readonly radiatorTemperature?: number;
  @NumberProp()
  private readonly roomTemperature?: number;
  @NumberProp()
  private readonly meterReading?: number;
  @OptionalProp()
  private readonly meterReadingDate?: Exclude<MomentInput, void>;

  private heatCostAllocatorLg = heatCostAllocatorLg;
}
</script>

<style lang="scss" scoped>
.values {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 16px;
  height: 100%;
}
.value {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  border-radius: 38px;
  margin-bottom: 16px;
  width: 76px;
  height: 76px;
  background-color: colorVodafone(vodafone-white);
  text-align: center;
  font-size: fontSize(fs-300);
  line-height: 76px;
}
.temperature {
  font-size: fontSize(fs-300);
  line-height: lineHeight(lh-100);
  color: colorVodafone(vodafone-red);
}
.place {
  font-size: fontSize(fs-base);
  line-height: lineHeight(lh-reset);
  color: colorVodafone(black);
}
.metric {
  padding: 0 16px;
  font-size: fontSize(fs-50);
  line-height: lineHeight(lh-reset);
  text-align: center;
  @include textOverflow();
}
</style>
