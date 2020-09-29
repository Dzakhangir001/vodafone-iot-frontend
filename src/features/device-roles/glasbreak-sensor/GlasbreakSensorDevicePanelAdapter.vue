<template lang="pug">
  glasbreak-sensor-device-panel(
    v-bind="$attrs"
    :measurement-date="glasbreak ? glasbreak.date : undefined"
    :state="glasbreak ? glasbreak.value : undefined"
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
import GlasbreakSensorDevicePanel from './GlasbreakSensorDevicePanel.vue';

@Component({ components: { GlasbreakSensorDevicePanel } })
export default class GlasbreakSensorDevicePanelAdapter extends Mixins(MetricMapMixin) {
  @ObjectProp(true)
  private readonly device!: DevicePanelQuery['data'];

  private get glasbreak(): DataPoint | undefined {
    return this.latestDataPoint('glasbreak');
  }
}
</script>
