<template lang="pug">
  electricity-meter-analog-device-panel(
    v-bind="$attrs"
    :meter-reading="meterReading ? meterReading.value : undefined"
    :meter-reading-date="meterReading ? meterReading.date : undefined"
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
import ElectricityMeterAnalogDevicePanel from './ElectricityMeterAnalogDevicePanel.vue';

@Component({ components: { ElectricityMeterAnalogDevicePanel } })
export default class ElectricityMeterAnalogDevicePanelAdapter extends Mixins(DeviceRoleMapMixin, MetricMapMixin) {
  @ObjectProp(true)
  private readonly device!: DevicePanelQuery['data'];

  private get meterReading(): DataPoint | undefined {
    return this.latestDataPoint('ELECTRICITY_METER_READING');
  }
}
</script>
