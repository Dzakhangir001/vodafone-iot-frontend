import { DEVICE_ROLES } from '@/features/core/container';
import { MetricKind, TimeUnit } from '@/types/iot-portal';
import { option } from '@/util/container';
import moment from 'moment';
import lg from './heat-cost-allocator-lg.svg';
import md from './heat-cost-allocator-md.svg';
import sm from './heat-cost-allocator-sm.svg';
import component from './HeatCostAllocatorDevicePanelAdapter.vue';

export default option(DEVICE_ROLES, async () => ({
  name: 'HEAT_COST_ALLOCATOR',
  label: 'Heizkostenverteiler',
  shortLabel: 'Heizung',
  icons: { sm, md, lg },
  component,
  history: {
    metrics: [
      {
        descriptor: { name: 'Consumption', resolution: { amount: 1, unit: TimeUnit.DAY } },
        category: 'Information',
        label: 'Zählerstand',
        formatValue,
      },
      {
        descriptor: { name: 'BatteryLow', kind: MetricKind.DISCRETE, resolution: { amount: 1, unit: TimeUnit.DAY } },
        category: 'Batterie',
        label: 'Zustand',
        formatValue(value) {
          return value === '1' ? 'Niedrig' : 'Ok';
        },
      },
    ],
  },
  statistics: {
    metric: { name: 'Consumption', resolution: { amount: 1, unit: TimeUnit.DAY } },
    chartType: 'LINE',
    dateFilters: [
      {
        label: '7\xa0Tage',
        date() {
          return {
            gte: moment()
              .subtract(7, 'days')
              .toDate(),
          };
        },
      },
      {
        label: '30\xa0Tage',
        date() {
          return {
            gte: moment()
              .subtract(30, 'days')
              .toDate(),
          };
        },
      },
      {
        label: '90\xa0Tage',
        date() {
          return {
            gte: moment()
              .subtract(90, 'days')
              .toDate(),
          };
        },
      },
    ],
    dataPointToChartPoint({ date, value }) {
      return { x: date, y: Number(value) };
    },
  },
  metrics: [
    { name: 'Consumption', kind: MetricKind.CONTINUOUS },
    { name: 'FlowTemperature', kind: MetricKind.CONTINUOUS },
    { name: 'ExternalTemperature', kind: MetricKind.CONTINUOUS },
    { name: 'CONNECTION', kind: MetricKind.DISCRETE },
    { name: 'BatteryLow', kind: MetricKind.DISCRETE },
  ],
  connectionMetricName: 'CONNECTION',
  batteryMetricName: 'BatteryLow',
}));

function formatValue(value: any): string {
  return `${Number(value).toLocaleString()}`;
}
