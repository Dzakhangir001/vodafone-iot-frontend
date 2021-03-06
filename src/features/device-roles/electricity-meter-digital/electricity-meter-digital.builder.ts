import { DEVICE_ROLES } from '@/features/core/container';
import { MetricKind, TimeUnit } from '@/types/iot-portal';
import { option } from '@/util/container';
import moment from 'moment';
import lg from './electricity-meter-digital-lg.svg';
import md from './electricity-meter-digital-md.svg';
import sm from './electricity-meter-digital-sm.svg';
import component from './ElectricityMeterDigitalDevicePanelAdapter.vue';

export default option(DEVICE_ROLES, async () => ({
  name: 'ELECTRICITY_METER_DIGITAL',
  label: 'Stromzähler (digital)',
  shortLabel: 'Strom',
  icons: { sm, md, lg },
  component,
  formatValue,
  history: {
    metrics: [
      {
        descriptor: { name: 'ELECTRICITY_METER_READING', resolution: { amount: 1, unit: TimeUnit.DAY } },
        category: 'Information',
        label: 'Zählerstand',
        formatValue,
      },
      {
        descriptor: { name: 'BATTERY_LOW', kind: MetricKind.DISCRETE },
        category: 'Batterie',
        label: 'Zustand',
        formatValue(value) {
          return value === '1' ? 'Niedrig' : 'Ok';
        },
      },
    ],
  },
  statistics: {
    metric: { name: 'ELECTRICITY_METER_READING', resolution: { amount: 1, unit: TimeUnit.DAY } },
    chartType: 'LINE',
    dataPointToChartPoint({ date, value }) {
      return { x: date, y: Number(value) };
    },
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
  },
  metrics: [
    { name: 'ELECTRICITY_METER_READING', kind: MetricKind.CONTINUOUS },
    { name: 'CONNECTION', kind: MetricKind.DISCRETE },
    { name: 'BATTERY_LOW', kind: MetricKind.DISCRETE },
  ],
  connectionMetricName: 'CONNECTION',
  batteryMetricName: 'BATTERY_LOW',
}));

function formatValue(value: any): string {
  return `${Number(value).toLocaleString()}\xa0kWh`;
}
