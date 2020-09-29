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
        p.last-activity(v-if="water")
          ui-relative-time(:date="water.date" #default="{ displayDate }")
            | {{ water.value === '1' ? `${displayDate} Leckage festgestellt` : `${displayDate.replace('vor', 'seit')} kein Alarm` }}
        p.last-alarm(v-if="recentAlert")
          ui-relative-time(:date="recentAlert" #default="{ displayDate }")
            | Letztes Alarm: {{ displayDate }}
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
export default class LeakageDetectorDevicePanelAdapter extends Mixins(DeviceRoleMapMixin, MetricMapMixin) {
  @ObjectProp(true)
  private readonly device!: DevicePanelQuery['data'];

  private get backgroundImage(): string {
    const { lg, md } = this.deviceRoleMap.LEAKAGE_DETECTOR.icons;

    return lg || md;
  }

  private get water(): DataPoint | undefined {
    return this.latestDataPoint('water');
  }

  private get recentAlert(): Date | undefined {
    return this.device.recentAlerts.items[0] ? this.device.recentAlerts.items[0].startDate : undefined;
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
