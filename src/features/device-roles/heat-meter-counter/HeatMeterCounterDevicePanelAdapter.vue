<template lang="pug">
  device-panel(v-bind="$attrs")
    template(#actions)
      slot(name="actions")
    template(#properties)
      slot(name="properties")
    template(#overlay)
      slot(name="overlay")
    template(#content)
      counter(v-if="currentPeriodEnergy" :icon="icon" :value="currentPeriodEnergy.value / 1000")
        | {{ currentPeriod.format('YYYY') }} (kWh)
      counter(v-if="lastPeriodEnergy && lastPeriod" :icon="icon" :value="lastPeriodEnergy.value / 1000")
        | {{ lastPeriod.format('YYYY') }} (kWh)
      counter(v-if="periodDiffEnergy !== undefined" :icon="icon" :value="periodDiffEnergy / 1000")
        | Differenz {{ lastPeriod.format('YYYY') }} / {{ currentPeriod.format('YYYY') }} (kWh)
      counter(v-if="lastMonthEnergy" :icon="icon" :value="lastMonthEnergy.value / 1000")
        | Letzter Monat {{ lastMonth.format('MMMM YYYY') }} (kWh)
</template>

<script lang="ts">
import Counter from '@/components/sensor/Counter.vue';
import DevicePanel from '@/components/sensor/DevicePanel.vue';
import { DevicePanelQuery } from '@/features/core/components/device-panel/__generated__/DevicePanelQuery';
import MetricMapMixin, { DataPoint } from '@/features/core/components/device-panel-adapters/metric-map-mixin';
import DeviceRoleMapMixin from '@/features/core/components/mixins/device-role-map';
import { ObjectProp } from '@/util/prop-decorators';
import { Component, Mixins } from 'vue-property-decorator';
import moment, { Moment } from 'moment';

@Component({ components: { DevicePanel, Counter } })
export default class HeatMeterCounterDevicePanelAdapter extends Mixins(DeviceRoleMapMixin, MetricMapMixin) {
  @ObjectProp(true)
  private readonly device!: DevicePanelQuery['data'];

  private get icon(): string {
    const { sm, md } = this.deviceRoleMap.HEAT_METER_COUNTER.icons;

    return sm || md;
  }

  private get currentPeriod(): Moment {
    const point = this.latestDataPoint('CurrentDate');

    return moment(point ? point.value : moment.invalid());
  }

  private get currentPeriodEnergy(): DataPoint | undefined {
    return this.latestDataPoint('CurrentEnergy');
  }

  private get lastPeriod(): Moment {
    const point = this.latestDataPoint('LastPeriodEnd');

    return moment(point ? point.value : moment.invalid());
  }

  private get lastPeriodEnergy(): DataPoint | undefined {
    return this.latestDataPoint('LastPeriodEnergy');
  }

  private get periodDiffEnergy(): number | undefined {
    const current = this.currentPeriodEnergy;
    const last = this.lastPeriodEnergy;

    return current && last ? Math.max(0, Number(current.value) - Number(last.value)) : undefined;
  }

  private get lastMonth(): Moment {
    const point = this.latestDataPoint('LastMonthEnd');

    return moment(point ? point.value : moment.invalid());
  }

  private get lastMonthEnergy(): DataPoint | undefined {
    return this.latestDataPoint('LastMonthEnergy');
  }
}
</script>
