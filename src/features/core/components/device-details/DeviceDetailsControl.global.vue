<template lang="pug">
  .device-details-control-container
    .close-button-container
      ui-clickable.close-button(tag="button" @click="$emit('close')")
        img(src="@/components/modal/close.svg" alt="Schließen")
    tab-bar(v-model="tab")
      tab-button(value="HISTORY")
        | Historie
      tab-button(v-if="role.statistics" value="STATISTICS")
        | Statistik
    transition(name="main" mode="out-in")
      .tab-panel(v-if="tab === 'HISTORY'" key="history")
        .date-filter
          .datepicker
            .date-label
              | Von
            ui-datepicker(v-model="startDate")
          .datepicker
            .date-label
              | Bis
            ui-datepicker(v-model="endDate")
        .filters
          ui-vue-multiselect(:options="categoryOptions" v-model="historyFilters.category")
            | Category
          ui-vue-multiselect(:options="aggregationLevelOptions" v-model="historyFilters.aggregationLevel")
            | Aggregation level
          ui-vue-multiselect(:options="dataTypeOptions" v-model="historyFilters.dataType")
            | Data type
        template(v-if="historyItems.length > 0")
          ui-table(:columns="columns" :data="historyItemsFiltered" striped)
            template(#category="{ row }")
              span(:class="getColumnColor(row.category)") {{row.category}}
            template(#metric="{ row }")
              span(:class="getColumnColor(row.category)") {{row.metric}}
            template(#formattedValue="{ row }")
              span(:class="getColumnColor(row.category)") {{row.formattedValue}}
            template(#date="{ row }")
              relative-time(:class="getColumnColor(row.category)" min="-PT30M" :date="row.date" format="L LTS")
        .empty-data(v-else)
          | Keine Daten verfügbar
      .tab-panel(v-else-if="role.statistics && tab === 'STATISTICS'" key="statistics")
        ui-flex(root)
          ui-cell(
            v-for="(filter, index) of role.statistics.dateFilters || []"
            :key="index"
          )
            ui-selectable-button(
              :selected="selectedDateFilter === index"
              color="GREEN"
              @click="selectedDateFilter = index"
            )
              | {{ filter.label }}
        template(v-if="chartPoints.length > 1")
          line-chart.chart(v-if="role.statistics.chartType === 'LINE'" :chart-points="chartPoints" :format-value="role.formatValue")
          stepped-chart.chart(v-else-if="role.statistics.chartType === 'STEPPED'" :y-labels="role.statistics.yLabels" :chart-points="chartPoints" :format-value="role.formatValue")
        .empty-data(v-else)
          | Keine Daten verfügbar
</template>

<script lang="ts">
import LineChart from '@/components/charts/LineChart.vue';
import SteppedChart from '@/components/charts/SteppedChart.vue';
import TabBar from '@/components/tab-bar/TabBar.global.vue';
import TabButton from '@/components/tab-bar/TabButton.global.vue';
import UiTable from '@/components/table/Table.global.vue';
import RelativeTime from '@/components/datetime/RelativeTime.global.vue';
import UiDatepicker from '@/components/datepicker/Datepicker.global.vue';
import { EnumProp, ObjectProp } from '@/util/prop-decorators';
import { ChartPoint } from 'chart.js';
import moment from 'moment';
import { Component, Mixins } from 'vue-property-decorator';
import { DeviceRole, HistoryItem } from '../../model';
import DeviceRoleMapMixin from '../mixins/device-role-map';
import { DevicePanelQuery } from '../device-panel/__generated__/DevicePanelQuery';
import { DeviceDetailsTab } from './model';
import {
  CoreDeviceDetailsHistoryQuery,
  CoreDeviceDetailsHistoryQueryVariables,
} from './__generated__/CoreDeviceDetailsHistoryQuery';
import {
  CoreDeviceDetailsStatisticsQuery,
  CoreDeviceDetailsStatisticsQueryVariables,
} from './__generated__/CoreDeviceDetailsStatisticsQuery';
import historyQuery from './history.gql';
import statisticsQuery from './statistics.gql';
import { SelectOption } from '@/components/form/model';
import { TimeUnit } from '@/types/iot-portal';

export interface HistoryFilters {
  category: SelectOption;
  dataType: SelectOption;
  aggregationLevel: SelectOption;
}

@Component({
  components: {
    TabBar,
    TabButton,
    UiTable,
    RelativeTime,
    LineChart,
    SteppedChart,
    UiDatepicker,
  },
  apollo: {
    history: {
      query: historyQuery,
      pollInterval: 10000,
      fetchPolicy: 'no-cache',
      variables(this: DeviceDetailsControl): CoreDeviceDetailsHistoryQueryVariables {
        if (!this.role) {
          throw new Error('Dolphins riding rainbows');
        }

        const { metrics = [] } = this.role.history || { metrics: [] };

        const descriptors = metrics.map(({ descriptor }) => ({
          ...descriptor,
          deviceId: this.device.id,
          dateFilter: {
            gte: moment(this.startDate)
              .startOf('day')
              .toDate(),
            lt: moment(this.endDate)
              .add(1, 'day')
              .startOf('day')
              .toDate(),
          },
        }));

        if (this.historyFilters.aggregationLevel && this.historyFilters.aggregationLevel.value) {
          descriptors.forEach((item) => {
            item.resolution = {
              unit: this.historyFilters.aggregationLevel.value as TimeUnit,
              amount: 1,
            };
          });
        }

        return { descriptors };
      },
      skip(): boolean {
        return !this.device || this.tab !== 'HISTORY' || !this.role || !this.role.history;
      },
    },
    statistics: {
      query: statisticsQuery,
      pollInterval: 10000,
      fetchPolicy: 'no-cache',
      variables(this: DeviceDetailsControl): CoreDeviceDetailsStatisticsQueryVariables {
        if (!this.role) {
          throw new Error('Dolphins riding rainbows');
        }

        const { statistics } = this.role;
        if (!statistics) {
          throw new Error('Dolphins riding rainbows');
        }

        const { dateFilters } = statistics;
        const dateFilter =
          dateFilters && dateFilters.length > 0
            ? dateFilters[this.selectedDateFilter].date()
            : {
                gte: moment()
                  .subtract(7, 'days')
                  .toDate(),
              };

        return {
          ...statistics.metric,
          deviceId: this.device.id,
          dateFilter,
        };
      },
      skip(): boolean {
        return !this.device || this.tab !== 'STATISTICS' || !this.role || !this.role.statistics;
      },
    },
  },
  data() {
    return { history: undefined, statistics: undefined };
  },
  inheritAttrs: false,
})
export default class DeviceDetailsControl extends Mixins(DeviceRoleMapMixin) {
  @EnumProp('HISTORY', 'STATISTICS')
  private initialTab!: DeviceDetailsTab;

  @ObjectProp(true)
  private readonly device!: DevicePanelQuery['data'];

  private tab = this.initialTab;
  private selectedDateFilter = 0;
  private startDate = moment()
    .subtract(30, 'days')
    .toDate();
  private endDate = moment().toDate();

  private history!: CoreDeviceDetailsHistoryQuery['history'];
  private statistics!: CoreDeviceDetailsStatisticsQuery['statistics'];

  private readonly columns = [
    { name: 'category', label: 'Kategorie' },
    { name: 'metric', label: 'Datentyp' },
    { name: 'formattedValue', label: 'Wert', align: 'right' },
    { name: 'date', label: 'Datum', align: 'right' },
  ];

  private historyFilters: HistoryFilters = {
    category: { label: 'Alle', value: undefined },
    dataType: { label: 'Alle', value: undefined },
    aggregationLevel: { label: 'Alle', value: undefined },
  };

  private aggregationLevelOptions: SelectOption[] = [
    { label: 'Alle', value: undefined },
    { label: 'Täglich', value: TimeUnit.DAY },
    { label: 'Stündlich', value: TimeUnit.HOUR },
  ];

  private getColumnColor(category: string): string | null {
    return category === 'Alarm' ? 'red' : null;
  }

  private get role(): DeviceRole {
    return this.deviceRoleMap[this.device.role];
  }

  private get categoryOptions(): SelectOption[] {
    return this.role.history
      ? this.role.history.metrics.map((metric) => {
          return {
            label: metric.category,
            value: metric.category,
          };
        })
      : [];
  }

  private get dataTypeOptions(): SelectOption[] {
    return this.role.history
      ? this.role.history.metrics.map((metric) => {
          return {
            label: metric.label,
            value: metric.label,
          };
        })
      : [];
  }

  private get historyItemsFiltered(): HistoryItem[] {
    return this.historyItems
      .filter((item) => {
        if (this.historyFilters.category && this.historyFilters.category.value) {
          return item.category === this.historyFilters.category.value;
        } else {
          return true;
        }
      })
      .filter((item) => {
        if (this.historyFilters.dataType && this.historyFilters.dataType.value) {
          return item.metric === this.historyFilters.dataType.value;
        } else {
          return true;
        }
      });
  }

  private get historyItems(): HistoryItem[] {
    const { history } = this.role;
    if (!history || history.metrics.length === 0 || !this.history) {
      return [];
    }

    return this.history
      .map((dataSet) => {
        const { category, label, formatValue = String } =
          history.metrics.find(({ descriptor }) => descriptor.name === dataSet.metric.name) || history.metrics[0];

        if (dataSet.__typename === 'ContinuousDataSet') {
          return dataSet.CONTINUOUS.map(({ date, value }) => ({
            category,
            metric: label,
            formattedValue: formatValue(value),
            date: moment(date),
          }));
        }

        return dataSet.DISCRETE.map(({ date, value }) => ({
          category,
          metric: label,
          formattedValue: formatValue(value),
          date: moment(date),
        }));
      })
      .flat()
      .sort((a, b) => b.date.unix() - a.date.unix());
  }

  private get chartPoints(): ChartPoint[] {
    if (!this.role.statistics || !this.statistics) {
      return [];
    }

    if (this.statistics.__typename === 'ContinuousMetric') {
      return this.statistics.CONTINUOUS.dataPoints.map(this.role.statistics.dataPointToChartPoint);
    }

    return this.statistics.DISCRETE.dataPoints.map(this.role.statistics.dataPointToChartPoint);
  }
}
</script>

<style lang="scss" scoped>
.device-details-control-container {
  width: 100%;
  height: 100%;
  min-width: 320px;
  padding: 40px 30px;
  box-sizing: border-box;
  align-self: right;
  overflow-x: auto;
  overflow-y: hidden;
}
.close-button-container {
  width: 100%;
  text-align: right;
}
.close-button {
  outline: none;
  margin-left: 5px;
  border: none;
  padding: 0;
  background: transparent;
}
.chart {
  max-width: 800px;
  height: 280px;
}
.main-enter-active,
.main-leave-active {
  transition: opacity 300ms;
}
.main-enter,
.main-leave-to {
  opacity: 0;
}
.date-filter {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
}
.filters {
  display: flex;
  margin-top: 15px;
  flex-wrap: wrap;
}
.datepicker {
  display: flex;
  margin-right: 1em;
}
.date-label {
  margin-right: 0.5em;
}
.empty-data {
  color: colorVodafone(lighter);
  text-align: center;
  padding: 80px 10px 30px;
}
.red {
  color: colorVodafone(vodafone-red);
  font-weight: 700;
}
</style>
