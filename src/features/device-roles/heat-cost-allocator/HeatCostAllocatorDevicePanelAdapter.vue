<template lang="pug">
  heat-cost-allocator-device-panel(
    v-bind="$attrs"
    :meter-reading="meterReading ? meterReading.value : undefined"
    :meter-reading-date="meterReading ? meterReading.date : undefined"
    :radiator-temperature="radiatorTemperature ? radiatorTemperature.value : undefined"
    :room-temperature="roomTemperature ? roomTemperature.value : undefined"
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
import DeviceRoleMapMixin from '@/features/core/components/mixins/device-role-map';
import { ObjectProp } from '@/util/prop-decorators';
import { Component, Mixins } from 'vue-property-decorator';
import HeatCostAllocatorDevicePanel from './HeatCostAllocatorDevicePanel.vue';

@Component({ components: { HeatCostAllocatorDevicePanel } })
export default class HeatCostAllocatorDevicePanelAdapter extends Mixins(DeviceRoleMapMixin, MetricMapMixin) {
  @ObjectProp(true)
  private readonly device!: DevicePanelQuery['data'];

  private get meterReading(): DataPoint | undefined {
    return this.latestDataPoint('Consumption');
  }

  private get radiatorTemperature(): DataPoint | undefined {
    return this.latestDataPoint('FlowTemperature');
  }

  private get roomTemperature(): DataPoint | undefined {
    return this.latestDataPoint('ExternalTemperature');
  }
}
</script>
