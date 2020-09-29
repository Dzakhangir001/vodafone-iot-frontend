<template lang="pug">
  device-panel(v-bind="$attrs" :background-image="temperatureLg")
    template(#actions)
      slot(name="actions")
    template(#properties)
      slot(name="properties")
    template(#overlay)
      slot(name="overlay")
    template(#footer)
      .metric
        template(v-if="measurementDate !== undefined && temperature !== undefined")
          .temperature
            | {{ temperature }}{{ '\u200a' }}°C
          p
            ui-relative-time(:date="measurementDate" #default="{ displayDate }")
              | {{ displayDate }} gemessen
        p(v-else)
          | Keine Messdaten verfügbar
</template>

<script lang="ts">
import DevicePanel from '@/components/sensor/DevicePanel.vue';
import { NumberProp, OptionalProp } from '@/util/prop-decorators';
import { MomentInput } from 'moment';
import { Component, Vue } from 'vue-property-decorator';
import temperatureLg from './temperature-lg.svg';

@Component({ components: { DevicePanel } })
export default class TemperatureDevicePanel extends Vue {
  @OptionalProp()
  private readonly measurementDate?: Exclude<MomentInput, void>;

  @NumberProp()
  private readonly temperature?: number;

  private readonly temperatureLg = temperatureLg;
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
.temperature {
  font-size: fontSize(fs-300);
  line-height: lineHeight(lh-100);
  color: colorVodafone(vodafone-red);
}
</style>
