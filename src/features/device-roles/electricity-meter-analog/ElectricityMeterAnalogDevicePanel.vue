<template lang="pug">
  device-panel(v-bind="$attrs" :background-image="electricityMeterAnalogLg")
    template(#actions)
      slot(name="actions")
    template(#properties)
      slot(name="properties")
    template(#overlay)
      slot(name="overlay")
    template(#footer)
      .metric
        counter(:value="meterReading" digit-color="RED")
          | Zählerstand (kWh)
        p(v-if="meterReadingDate")
          ui-relative-time(:date="meterReadingDate" #default="{ displayDate }")
            | {{ displayDate }} abgelesen
        p(v-else)
          | Keine Daten verfügbar
</template>

<script lang="ts">
import Counter from '@/components/sensor/Counter.vue';
import DevicePanel from '@/components/sensor/DevicePanel.vue';
import { NumberProp, OptionalProp } from '@/util/prop-decorators';
import { MomentInput } from 'moment';
import { Component, Vue } from 'vue-property-decorator';
import electricityMeterAnalogLg from './electricity-meter-analog-lg.svg';

@Component({ components: { DevicePanel, Counter } })
export default class ElectricityMeterAnalogDevicePanel extends Vue {
  @NumberProp()
  private readonly meterReading?: number;

  @OptionalProp()
  private readonly meterReadingDate?: Exclude<MomentInput, void>;

  private readonly electricityMeterAnalogLg = electricityMeterAnalogLg;
}
</script>

<style lang="scss" scoped>
.metric {
  padding: 0 16px;
  font-size: fontSize(fs-50);
  line-height: lineHeight(lh-reset);
  text-align: center;
  @include textOverflow();
}
</style>
