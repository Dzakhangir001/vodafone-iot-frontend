<template lang="pug">
  occupancy-detector-device-panel(
    v-bind="$attrs"
    :measurement-date="occupancy ? occupancy.date : undefined"
    :state="occupancy ? occupancy.value : undefined"
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
import OccupancyDetectorDevicePanel from './OccupancyDetectorDevicePanel.vue';

@Component({ components: { OccupancyDetectorDevicePanel } })
export default class OccupancyDetectorDevicePanelAdapter extends Mixins(MetricMapMixin) {
  @ObjectProp(true)
  private readonly device!: DevicePanelQuery['data'];

  private get occupancy(): DataPoint | undefined {
    return this.latestDataPoint('occupancy');
  }
}
</script>
