<template lang="pug">
  lifting-station-device-panel(
    v-bind="$attrs"
    :measurement-date="onOff ? onOff.date : undefined"
    :mode="onOff ? onOff.value : undefined"
  )
    template(#actions)
      slot(name="actions")
    template(#properties)
      slot(name="properties")
    template(#overlay)
      slot(name="overlay")
</template>

<script lang="ts">
import { DevicePanelQuery } from '@/features/core/components/device-panel/__generated__/DevicePanelQuery';
import MetricMapMixin, { DataPoint } from '@/features/core/components/device-panel-adapters/metric-map-mixin';
import { ObjectProp } from '@/util/prop-decorators';
import { Component, Mixins } from 'vue-property-decorator';
import LiftingStationDevicePanel from './LiftingStationDevicePanel.vue';

@Component({ components: { LiftingStationDevicePanel } })
export default class LiftingStationDevicePanelAdapter extends Mixins(MetricMapMixin) {
  @ObjectProp(true)
  private readonly device!: DevicePanelQuery['data'];

  private get onOff(): DataPoint | undefined {
    return this.latestDataPoint('onoff');
  }
}
</script>
