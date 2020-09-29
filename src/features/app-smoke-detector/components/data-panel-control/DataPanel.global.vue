<template lang="pug">
  ui-panel
    .search-filter
      text-input(v-model="searchQuery" placeholder="Suchen")
    ui-table(v-if="data" :columns="columns" :data="devices" :sort-keys.sync="sortKeys" :exportable="true" striped)
    //- ui-pagination(:total-pages="totalPages" :value="currentPage" @input="$emit('update:currentPage', $event)")
</template>

<script lang="ts">
import TextInput from '@/components/form/TextInput.vue';
import { Column, SortKey } from '@/components/table/model';
import NodeIdMixin from '@/features/core/components/mixins/node-id';
import { Order } from '@/types/iot-portal';
import { orderBy } from 'lodash';
import { Component, Mixins } from 'vue-property-decorator';
import {
  AppSmokeDetectorDataQuery,
  AppSmokeDetectorDataQueryVariables,
} from './__generated__/AppSmokeDetectorDataQuery';
import query from './data.gql';

function metricColumn(name: string): Column {
  const field = `${name}.latestDataPoint.value`;

  return { name, field, align: 'right', hideable: true, sortable: field };
}

@Component({
  components: { TextInput },
  apollo: {
    data: {
      query,
      variables(): AppSmokeDetectorDataQueryVariables {
        return { id: this.nodeId };
      },
    },
  },
  data() {
    return { data: undefined };
  },
})
export default class DataPanel extends Mixins(NodeIdMixin) {
  private readonly data!: AppSmokeDetectorDataQuery['data'];

  private searchQuery = '';
  private sortKeys: SortKey[] = [{ key: 'serial', direction: Order.ASC }];

  private get devices(): AppSmokeDetectorDataQuery['data']['devices'] {
    return orderBy(
      this.data.devices.filter(({ meta }) => meta.serial !== null && meta.serial.includes(this.searchQuery)),
      this.sortKeys.map(({ key }) => key),
      this.sortKeys.map(({ direction }) => (direction === Order.ASC ? 'asc' : 'desc')),
    );
  }

  private readonly columns: Column[] = [
    { name: 'site', field: 'site.name', label: 'Ort', sortable: 'site.name' },
    { name: 'serial', field: 'meta.serial', label: 'Seriennummer', sortable: 'meta.serial' },
    metricColumn('Battery'),
    metricColumn('BatteryLow'),
    metricColumn('DustLevel'),
    metricColumn('DustLevelRaw'),
    metricColumn('HeadConnected'),
    metricColumn('HeadFault'),
    metricColumn('OpenClose'),
    metricColumn('SounderFlag'),
    metricColumn('CommsLinkSuccessful'),
    metricColumn('Tamper'),
    metricColumn('EOL'),
    metricColumn('Alarm'),
    metricColumn('AlarmCounter'),
    metricColumn('LastAlarm'),
    metricColumn('IsInRemovedState'),
    metricColumn('RemovalDuration'),
    metricColumn('LastRemoval'),
    metricColumn('CurrentRemovalDuration'),
    metricColumn('IsInFraudState'),
    metricColumn('FraudCount'),
    metricColumn('FraudDuration'),
    metricColumn('LastFraud'),
    metricColumn('CurrentFraudDuration'),
  ];
}
</script>
