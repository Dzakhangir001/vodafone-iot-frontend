<template lang="pug">
  device-panel(v-bind="$attrs" :background-image="temperatureHumidityLg")
    template(#actions)
      slot(name="actions")
    template(#properties)
      slot(name="properties")
    template(#overlay)
      slot(name="overlay")
    template(#content)
      .values
        .value.temperature
          | {{ temperature ? temperature.toLocaleString(undefined, { maximumFractionDigits: 0 }) : 'XX' }}{{ '\u200a' }}°C
        .value.humidity
          | {{ humidity ? humidity.toLocaleString(undefined, { maximumFractionDigits: 0 }) : 'XX' }}{{ '\u200a' }}%
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
import temperatureHumidityLg from './temperature-humidity-lg.svg';

@Component({ components: { DevicePanel }, inheritAttrs: false })
export default class TemperatureHumidityDevicePanel extends Vue {
  @NumberProp()
  public temperature?: number;
  @NumberProp()
  public humidity?: number;
  @OptionalProp()
  private measurementDate?: Exclude<MomentInput, void>;

  private temperatureHumidityLg = temperatureHumidityLg;
}
</script>

<style lang="scss" scoped>
.values {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  padding: 0 16px;
  height: 100%;
}
.value {
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
  left: 10px;
  color: colorVodafone(vodafone-red);
}
.humidity {
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
