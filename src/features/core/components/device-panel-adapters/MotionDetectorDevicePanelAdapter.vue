<template lang="pug">
  device-panel(v-bind="$attrs" :background-image="backgroundImage")
    template(#actions)
      slot(name="actions")
    template(#properties)
      slot(name="properties")
    template(#overlay)
      slot(name="overlay")
    template(#footer)
      .state
        p.last-activity(v-if="motion")
          ui-relative-time(:date="motion.date" #default="{ displayDate }")
            | Letzte Statusänderung: {{ displayDate.replace('vor', 'seit') }} {{ motion.value === '1' ? 'ausgelöst' : 'keine Bewegung wahrgenommen' }}
        p.last-updated(v-if="lastUpdateDate")
          ui-relative-time(:date="lastUpdateDate" #default="{ displayDate }")
            | Letztes Update: {{ displayDate }}


</template>

<script lang="ts">
import DevicePanel from '@/components/sensor/DevicePanel.vue';
import { ObjectProp } from '@/util/prop-decorators';
import { Component, Mixins } from 'vue-property-decorator';
import { DevicePanelQuery } from '../device-panel/__generated__/DevicePanelQuery';
import DeviceRoleMapMixin from '../mixins/device-role-map';
import MetricMapMixin, { DataPoint } from './metric-map-mixin';

@Component({ components: { DevicePanel } })
export default class MotionDetectorDevicePanelAdapter extends Mixins(DeviceRoleMapMixin, MetricMapMixin) {
  @ObjectProp(true)
  private readonly device!: DevicePanelQuery['data'];

  private get backgroundImage(): string {
    const { lg, md } = this.deviceRoleMap.MOTION_DETECTOR.icons;

    return lg || md;
  }

  private get motion(): DataPoint | undefined {
    return this.latestDataPoint('alarm');
  }
}
</script>

<style lang="scss" scoped>
.state {
  position: relative;
  margin: 0 0 16px;
  font-size: fontSize(fs-50);
  line-height: lineHeight(lh-reset);
  text-align: center;
}
.last-activity {
  margin: 0;
  padding: 0 16px;
  @include textOverflow();
}
</style>
