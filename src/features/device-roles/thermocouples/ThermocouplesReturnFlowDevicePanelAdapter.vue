<template lang="pug">
  thermocouples-device-panel(
    v-bind="$attrs"
    :measurement-date="temperature ? temperature.date : undefined"
    :temperature="temperature ? temperature.value : undefined"
    flow="RETURN"
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
import ThermocouplesDevicePanel from './ThermocouplesDevicePanel.vue';

@Component({ components: { ThermocouplesDevicePanel } })
export default class ThermocouplesReturnFlowDevicePanelAdapter extends Mixins(DeviceRoleMapMixin, MetricMapMixin) {
  @ObjectProp(true)
  private readonly device!: DevicePanelQuery['data'];

  private get temperature(): DataPoint | undefined {
    return this.latestDataPoint('ExternalProbeLastTemperature');
  }
}
</script>
