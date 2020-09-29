<template lang="pug">
  ui-grid-list(v-if="data" :min-column-width="240" :row-height="320")
    heat-meter-counter-device-panel(
      v-if="data.HEAT_METER_COUNTER_CurrentEnergy.total"
      key="HEAT_METER_COUNTER"
      :headline="deviceRoleMap.HEAT_METER_COUNTER.label"
      :meter-reading="data.HEAT_METER_COUNTER_CurrentEnergy.sum / 1000"
      :meter-reading-date="String(data.HEAT_METER_COUNTER_CurrentDate.max)"
      :meter-reading-last-period="data.HEAT_METER_COUNTER_LastPeriodEnergy.sum / 1000"
      :meter-reading-last-period-date="String(data.HEAT_METER_COUNTER_LastPeriodEnd.max)"
      :meter-reading-last-month="data.HEAT_METER_COUNTER_LastMonthEnergy.sum / 1000"
      :meter-reading-last-month-date="String(data.HEAT_METER_COUNTER_LastMonthEnd.max)"
    )
</template>

<script lang="ts">
import DeviceRoleMapMixin from '@/features/core/components/mixins/device-role-map';
import NodeIdMixin from '@/features/core/components/mixins/node-id';
import HeatMeterCounterDevicePanel from '@/features/device-roles/heat-meter-counter/HeatMeterCounterDevicePanel.vue';
import { Component, Mixins } from 'vue-property-decorator';
import {
  AppManagerAggregatedMetricsQuery,
  AppManagerAggregatedMetricsQueryVariables,
} from './__generated__/AppManagerAggregatedMetricsQuery';
import query from './aggregated-metrics.gql';

@Component({
  components: { HeatMeterCounterDevicePanel },
  apollo: {
    data: {
      query,
      variables(): AppManagerAggregatedMetricsQueryVariables {
        return { nodeId: this.nodeId };
      },
    },
  },
  data() {
    return { data: undefined };
  },
})
export default class AggregatedMetricsControl extends Mixins(DeviceRoleMapMixin, NodeIdMixin) {
  private data!: AppManagerAggregatedMetricsQuery['data'];
}
</script>
