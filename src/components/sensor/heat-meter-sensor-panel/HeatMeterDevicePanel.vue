<template lang="pug">
  device-panel(v-bind="$attrs" :background-image="heatMeterLg")
    template(#actions)
      slot(name="actions")
    template(#properties)
      slot(name="properties")
    template(#overlay)
      slot(name="overlay")
    template(#content)
      .values
        .value.max
          | {{ max ? max.toLocaleString(undefined, { maximumFractionDigits: 1 }) : 'XX' }}{{ '\u200a' }}°C
        .value.min
          | {{ min ? min.toLocaleString(undefined, { maximumFractionDigits: 1 }) : 'XX' }}{{ '\u200a' }}°C
    template(#footer)
      .metric
        template(v-if="measurementDate !== undefined")
          p
            ui-relative-time(:date="measurementDate" #default="{ displayDate }")
              | {{ displayDate }} gemessen
        p(v-else)
          | Keine Messdaten verfügbar
</template>

<script lang="ts">
import DevicePanel from '@/components/sensor/DevicePanel.vue';
import { OptionalProp, NumberProp } from '@/util/prop-decorators';
import { MomentInput } from 'moment';
import { Component, Vue } from 'vue-property-decorator';
import heatMeterLg from './heat-meter-lg.svg';

@Component({ components: { DevicePanel }, inheritAttrs: false })
export default class HeatMeterDevicePanel extends Vue {
  @NumberProp()
  public max?: number;
  @NumberProp()
  public min?: number;
  @OptionalProp()
  private measurementDate?: Exclude<MomentInput, void>;

  private heatMeterLg = heatMeterLg;
}
</script>

<style lang="scss" scoped>
.values {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  padding: 10px 16px 0 16px;
  height: 100%;
}
.value {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  border-radius: 38px;
  margin-bottom: 16px;
  width: 76px;
  height: 76px;
  background-color: colorVodafone(white);
  text-align: center;
  font-size: fontSize(fs-300);
  line-height: 76px;
}
.max {
  left: 10px;
  color: colorVodafone(vodafone-red);
}
.min {
  right: 10px;
  color: colorVodafone(aqua-blue);
}
.metric {
  padding: 0 16px;
  font-size: fontSize(fs-50);
  line-height: lineHeight(lh-reset);
  text-align: center;
  @include textOverflow();
}
</style>
