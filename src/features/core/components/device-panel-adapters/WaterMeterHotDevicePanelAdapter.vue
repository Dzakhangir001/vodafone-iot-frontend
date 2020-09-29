<template lang="pug">
  device-panel(v-bind="$attrs")
    template(#actions)
      slot(name="actions")
    template(#properties)
      slot(name="properties")
    template(#overlay)
      slot(name="overlay")
    template(#content)
      counter(v-if="currentPeriodVolume" :icon="icon" digit-color="RED" :value="currentPeriodVolume.value")
        | {{ currentPeriod.format('YYYY') }} (m³)
      counter(v-if="lastPeriodVolume && lastPeriod" :icon="icon" digit-color="RED" :value="lastPeriodVolume.value")
        | {{ lastPeriod.format('YYYY') }} (m³)
      counter(v-if="periodDiffVolume !== undefined" :icon="icon" digit-color="RED" :value="periodDiffVolume")
        | Differenz {{ lastPeriod.format('YYYY') }} / {{ currentPeriod.format('YYYY') }} (m³)
      counter(v-if="lastMonthVolume" :icon="icon" digit-color="RED" :value="lastMonthVolume.value")
        | Letzter Monat {{ lastMonth.format('MMMM YYYY') }} (m³)
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import Counter from '@/components/sensor/Counter.vue';
import DevicePanel from '@/components/sensor/DevicePanel.vue';
import { ObjectProp } from '@/util/prop-decorators';
import moment, { Moment } from 'moment';
import { DevicePanelQuery } from '../device-panel/__generated__/DevicePanelQuery';
import DeviceRoleMapMixin from '../mixins/device-role-map';
import MetricMapMixin, { DataPoint } from './metric-map-mixin';

@Component({ components: { DevicePanel, Counter } })
export default class WaterMeterHotDevicePanelAdapter extends Mixins(DeviceRoleMapMixin, MetricMapMixin) {
  @ObjectProp(true)
  private readonly device!: DevicePanelQuery['data'];

  private get icon(): string {
    const { sm, md } = this.deviceRoleMap.WATER_METER_HOT.icons;

    return sm || md;
  }

  private get currentPeriod(): Moment {
    const point = this.latestDataPoint('CurrentDate');

    return moment(point ? point.value : moment.invalid());
  }

  private get currentPeriodVolume(): DataPoint | undefined {
    return this.latestDataPoint('CurrentVolume');
  }

  private get lastPeriod(): Moment {
    const point = this.latestDataPoint('LastPeriodEnd');

    return moment(point ? point.value : moment.invalid());
  }

  private get lastPeriodVolume(): DataPoint | undefined {
    return this.latestDataPoint('LastPeriodVolume');
  }

  private get periodDiffVolume(): number | undefined {
    const current = this.currentPeriodVolume;
    const last = this.lastPeriodVolume;

    return current && last ? Math.max(0, Number(current.value) - Number(last.value)) : undefined;
  }

  private get lastMonth(): Moment {
    const point = this.latestDataPoint('LastMonthEnd');

    return moment(point ? point.value : moment.invalid());
  }

  private get lastMonthVolume(): DataPoint | undefined {
    return this.latestDataPoint('LastMonthVolume');
  }
}
</script>
