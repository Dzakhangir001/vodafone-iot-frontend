<template lang="pug">
  device-panel(
    v-bind="$attrs"
    :background-image="state === undefined ? monoxidSensorLg : state === 'OK' ? monoxidSensorLgOk : monoxidSensorLgBad"
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
            | {{ displayDate.replace('vor', 'seit') }} messung
        p(v-else)
          | Keine Daten verfügbar
</template>

<script lang="ts">
import DevicePanel from '@/components/sensor/DevicePanel.vue';
import { EnumProp, OptionalProp } from '@/util/prop-decorators';
import { MomentInput } from 'moment';
import { Component, Vue } from 'vue-property-decorator';
import monoxidSensorLg from './monoxid-sensor-lg.svg';
import monoxidSensorLgOk from './monoxid-sensor-lg-ok.svg';
import monoxidSensorLgBad from './monoxid-sensor-lg-bad.svg';

@Component({ components: { DevicePanel } })
export default class MonoxidSensorDevicePanel extends Vue {
  @OptionalProp()
  private readonly measurementDate?: Exclude<MomentInput, void>;

  @EnumProp(false, 'OK', 'BAD')
  private readonly state?: 'OK' | 'BAD';

  private readonly monoxidSensorLg = monoxidSensorLg;
  private readonly monoxidSensorLgOk = monoxidSensorLgOk;
  private readonly monoxidSensorLgBad = monoxidSensorLgBad;
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
