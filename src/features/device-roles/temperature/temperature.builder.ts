import { DEVICE_ROLES } from '@/features/core/container';
import { MetricKind, TimeUnit } from '@/types/iot-portal';
import { option } from '@/util/container';
import moment from 'moment';
import lg from './temperature-lg.svg';
import md from './temperature-md.svg';
import sm from './temperature-sm.svg';
import component from './TemperatureDevicePanelAdapter.vue';

export default option(DEVICE_ROLES, async () => ({
  name: 'TEMPERATURE',
  label: 'Lufttemperatur',
  shortLabel: 'Temperatur',
  icons: { sm, md, lg },
  component,
  formatValue,
  history: {
    metrics: [
      {
        descriptor: { name: 'temperature', resolution: { amount: 1, unit: TimeUnit.DAY } },
        category: 'Information',
        label: 'Temperatur',
        formatValue,
      },
      {
        descriptor: { name: 'low', kind: MetricKind.DISCRETE },
        category: 'Batterie',
        label: 'Zustand',
        formatValue(value) {
          return value === '1' ? 'Niedrig' : 'Ok';
        },
      },
    ],
  },
  statistics: {
    metric: { name: 'temperature', resolution: { amount: 1, unit: TimeUnit.DAY } },
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
    { name: 'temperature' },
    { name: 'CONNECTION', kind: MetricKind.DISCRETE },
    { name: 'low', kind: MetricKind.DISCRETE },
  ],
  connectionMetricName: 'CONNECTION',
  batteryMetricName: 'low',
}));

export function formatValue(value: any): string {
  return `${Number(value).toLocaleString()}\u200a°C`;
}
