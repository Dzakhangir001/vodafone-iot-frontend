import { MetricKind, TimeUnit } from '@/types/iot-portal';
import { option } from '@/util/container';
import lg from '@core/assets/device-roles/water-meter-cold-lg.svg';
import md from '@core/assets/device-roles/water-meter-cold-md.svg';
import sm from '@core/assets/device-roles/water-meter-cold-sm.svg';
import component from '@core/components/device-panel-adapters/WaterMeterColdDevicePanelAdapter.vue';
import moment from 'moment';
import { DEVICE_ROLES } from '..';

export default option(DEVICE_ROLES, async () => ({
  name: 'WATER_METER_COLD',
  label: 'Kaltwasserzähler',
  shortLabel: 'Kaltwasser',
  icons: { sm, md, lg },
  component,
  formatValue,
  history: {
    metrics: [
      {
        descriptor: { name: 'CurrentVolume', resolution: { amount: 1, unit: TimeUnit.DAY } },
        category: 'Information',
        label: 'Wasservolumen',
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
    metric: { name: 'CurrentVolume', resolution: { amount: 1, unit: TimeUnit.DAY } },
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
    { name: 'CurrentVolume' },
    { name: 'LastPeriodEnd', kind: MetricKind.DISCRETE },
    { name: 'LastPeriodVolume' },
    { name: 'LastMonthEnd', kind: MetricKind.DISCRETE },
    { name: 'LastMonthVolume' },
    { name: 'CONNECTION', kind: MetricKind.DISCRETE },
    { name: 'BatteryLow', kind: MetricKind.DISCRETE },
  ],
  connectionMetricName: 'CONNECTION',
  batteryMetricName: 'BatteryLow',
}));

function formatValue(value: any): string {
  return `${Number(value).toLocaleString()}\xa0m³`;
}
