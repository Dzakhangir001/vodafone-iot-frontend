<template lang="pug">
  monoxid-sensor-device-panel(
    v-bind="$attrs"
    :measurement-date="monoxid ? monoxid.date : undefined"
    :state="monoxid ? monoxid.value : undefined"
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
import MonoxidSensorDevicePanel from './MonoxidSensorDevicePanel.vue';

@Component({ components: { MonoxidSensorDevicePanel } })
export default class MonoxidSensorDevicePanelAdapter extends Mixins(MetricMapMixin) {
  @ObjectProp(true)
  private readonly device!: DevicePanelQuery['data'];

  private get monoxid(): DataPoint | undefined {
    return this.latestDataPoint('monoxid');
  }
}
</script>
