<template lang="pug">
  device-panel(v-bind="$attrs" :background-image="gasMeterLg")
    template(#actions)
      slot(name="actions")
    template(#properties)
      slot(name="properties")
    template(#overlay)
      slot(name="overlay")
    template(#footer)
      .metric
        counter(:value="meterReading" digit-color="ORANGE")
          | Zählerstand (m³)
</template>

<script lang="ts">
import Counter from '@/components/sensor/Counter.vue';
import DevicePanel from '@/components/sensor/DevicePanel.vue';
import { NumberProp } from '@/util/prop-decorators';
import { Component, Vue } from 'vue-property-decorator';
import gasMeterLg from './gas-meter-lg.svg';

@Component({ components: { DevicePanel, Counter } })
export default class GasMeterDevicePanel extends Vue {
  @NumberProp()
  private readonly meterReading?: number;

  private gasMeterLg = gasMeterLg;
}
</script>

<style lang="scss" scoped>
.metric {
  font-size: fontSize(fs-50);
  position: relative;
  margin: 0 0 40px;
}
</style>
