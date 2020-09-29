<template lang="pug">
  device-panel(v-bind="$attrs" :background-image="backgroundImage")
    template(#actions)
      slot(name="actions")
    template(#properties)
      slot(name="properties")
    template(#overlay)
      slot(name="overlay")
    template(#content)
      device-state-indicators.indicators
        device-state-indicator(:state="alarmStateIndicator")
          | Alarm
        device-state-indicator(:state="pollutionStateIndicator" push-down)
          | Verschmutzung
        device-state-indicator(:state="mountingStateIndicator")
          | Montage
    template(#footer)
      .state
        .last-alarm
          p.last-alarm
            | Letzter Alarm: keiner
        .last-activity
          p(v-if="lastMeasureDate")
            relative-time(min="-PT30M" :date="lastMeasureDate" format="L LTS" #default="{ displayDate }")
              | Letztes Update: {{ displayDate }}
          p(v-else)
            | Keine Updates verfügbar
</template>

<script lang="ts">
import RelativeTime from '@/components/datetime/RelativeTime.global.vue';
import DevicePanel from '@/components/sensor/DevicePanel.vue';
import DeviceStateIndicator from '@/components/sensor/device-state/DeviceStateIndicator.vue';
import DeviceStateIndicators from '@/components/sensor/device-state/DeviceStateIndicators.vue';
import { ObjectProp } from '@/util/prop-decorators';
import { Component, Mixins } from 'vue-property-decorator';
import { DevicePanelQuery } from '../device-panel/__generated__/DevicePanelQuery';
import DeviceRoleMapMixin from '../mixins/device-role-map';
import MetricMapMixin from './metric-map-mixin';

type StateIndicator = 'RED' | 'GREEN' | 'GRAY';

@Component({ components: { DevicePanel, DeviceStateIndicator, DeviceStateIndicators, RelativeTime } })
export default class SmokeDetectorDevicePanelAdapter extends Mixins(DeviceRoleMapMixin, MetricMapMixin) {
  @ObjectProp(true)
  private readonly device!: DevicePanelQuery['data'];

  private get backgroundImage(): string {
    const { lg, md } = this.deviceRoleMap.SMOKE_DETECTOR.icons;

    return lg || md;
  }

  private get alarmStateIndicator(): StateIndicator {
    return 'GREEN';
  }

  private get pollutionStateIndicator(): StateIndicator {
    const point = this.latestDataPoint('DustLevel');

    return point ? (point.value < 28 ? 'GREEN' : 'RED') : 'GRAY';
  }

  private get lastMeasureDate(): Date | undefined {
    const point = this.latestDataPoint('DustLevel');

    return point ? point.date : undefined;
  }

  private get mountingStateIndicator(): StateIndicator {
    const point = this.latestDataPoint('IsInRemovedState');

    return point ? (point.value === '1' ? 'RED' : 'GREEN') : 'GRAY';
  }
}
</script>

<style lang="scss" scoped>
.indicators {
  margin-top: 100px;
  font-size: fontSize(fs-50);
}
.state {
  position: relative;
  margin: 0 0 3px;
  font-size: fontSize(fs-50);
  line-height: lineHeight(lh-reset);
  text-align: center;
}
.last-alarm {
  margin: 0;
  padding: 0 8px;
  @include textOverflow();
}
.last-activity {
  margin: 0;
  padding: 0 8px;
  @include textOverflow();
}
</style>
