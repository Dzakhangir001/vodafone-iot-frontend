import { DEVICE_ROLES } from '@/features/core/container';
import { MetricKind, TimeUnit } from '@/types/iot-portal';
import { option } from '@/util/container';
import moment from 'moment';
import lg from './heat-meter-counter-lg.svg';
import md from './heat-meter-counter-md.svg';
import sm from './heat-meter-counter-sm.svg';
import component from './HeatMeterCounterDevicePanelAdapter.vue';

export default option(DEVICE_ROLES, async () => ({
  name: 'HEAT_METER_COUNTER',
  label: 'Wärmemengenzähler',
  shortLabel: 'WMZ',
  icons: { sm, md, lg },
  component,
  formatValue,
  history: {
    metrics: [
      {
        descriptor: { name: 'CurrentEnergy', resolution: { amount: 1, unit: TimeUnit.DAY } },
        category: 'Information',
        label: 'Wärmemenge',
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
    metric: { name: 'CurrentEnergy', resolution: { amount: 1, unit: TimeUnit.DAY } },
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
    { name: 'CurrentDate', kind: MetricKind.DISCRETE },
    { name: 'CurrentEnergy' },
    { name: 'LastPeriodEnd', kind: MetricKind.DISCRETE },
    { name: 'LastPeriodEnergy' },
    { name: 'LastMonthEnd', kind: MetricKind.DISCRETE },
    { name: 'LastMonthEnergy' },
    { name: 'CONNECTION', kind: MetricKind.DISCRETE },
    { name: 'BatteryLow', kind: MetricKind.DISCRETE },
  ],
  connectionMetricName: 'CONNECTION',
  batteryMetricName: 'BatteryLow',
}));

function formatValue(value: any): string {
  return `${(Number(value) / 1000).toLocaleString()}\xa0kWh`;
}
