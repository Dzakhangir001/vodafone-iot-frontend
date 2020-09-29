import { DEVICE_ROLES } from '@/features/core/container';
import { MetricKind, TimeUnit } from '@/types/iot-portal';
import { option } from '@/util/container';
import moment from 'moment';
import lg from './temperature-humidity-lg.svg';
import md from './temperature-humidity-md.svg';
import sm from './temperature-humidity-sm.svg';
import component from './TemperatureHumidityDevicePanelAdapter.vue';

export default option(DEVICE_ROLES, async () => ({
  name: 'TEMPERATURE_HUMIDITY',
  label: 'Hygrometer',
  shortLabel: 'Hygrometer',
  icons: { sm, md, lg },
  component,
  formatHumidityValue,
  history: {
    metrics: [
      {
        descriptor: { name: 'temperature', resolution: { amount: 1, unit: TimeUnit.DAY } },
        category: 'Information',
        label: 'Temperatur',
        formatTemperatureValue,
      },
      {
        descriptor: { name: 'humidity', resolution: { amount: 1, unit: TimeUnit.DAY } },
        category: 'Information',
        label: 'Luftfeuchtigkeit',
        formatHumidityValue,
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
    metric: { name: 'humidity', resolution: { amount: 1, unit: TimeUnit.DAY } },
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
    { name: 'humidity' },
    { name: 'CONNECTION', kind: MetricKind.DISCRETE },
    { name: 'low', kind: MetricKind.DISCRETE },
  ],
  connectionMetricName: 'CONNECTION',
  batteryMetricName: 'low',
}));

export function formatTemperatureValue(value: any): string {
  return `${Number(value).toLocaleString()}\u200a°C`;
}

export function formatHumidityValue(value: any): string {
  return `${Number(value).toLocaleString()}\u200a%`;
}
