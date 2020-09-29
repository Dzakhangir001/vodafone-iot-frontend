<template lang="pug">
  device-panel(
    v-bind="$attrs"
    :background-image="state === undefined ? glasbreakSensorLg : state === 'OK' ? glasbreakSensorLgOk : glasbreakSensorLgBad"
    :danger="state === 'BAD'"
  )
    template(#actions)
      slot(name="actions")
    template(#properties)
      slot(name="properties")
    template(#overlay)
      slot(name="overlay")
    template(#footer)
      .metric
        p(v-if="measurementDate")
          ui-relative-time(:date="measurementDate" #default="{ displayDate }")
            | {{ displayDate.replace('vor', 'seit') }} beschädigt
        p(v-else)
          | Keine Daten verfügbar
</template>

<script lang="ts">
import DevicePanel from '@/components/sensor/DevicePanel.vue';
import { EnumProp, OptionalProp } from '@/util/prop-decorators';
import { MomentInput } from 'moment';
import { Component, Vue } from 'vue-property-decorator';
import glasbreakSensorLg from './glasbreak-sensor-lg.svg';
import glasbreakSensorLgOk from './glasbreak-sensor-lg-ok.svg';
import glasbreakSensorLgBad from './glasbreak-sensor-lg-bad.svg';

@Component({ components: { DevicePanel } })
export default class GlasbreakSensorDevicePanel extends Vue {
  @OptionalProp()
  private readonly measurementDate?: Exclude<MomentInput, void>;

  @EnumProp(false, 'OK', 'BAD')
  private readonly state?: 'OK' | 'BAD';

  private readonly glasbreakSensorLg = glasbreakSensorLg;
  private readonly glasbreakSensorLgOk = glasbreakSensorLgOk;
  private readonly glasbreakSensorLgBad = glasbreakSensorLgBad;
}
</script>

<style lang="scss" scoped>
.indicator {
  display: inline-block;
}
.metric {
  padding: 0 16px;
  font-size: fontSize(fs-50);
  line-height: lineHeight(lh-reset);
  text-align: center;
  @include textOverflow();
}
</style>
