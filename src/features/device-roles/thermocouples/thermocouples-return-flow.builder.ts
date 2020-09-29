import { DEVICE_ROLES } from '@/features/core/container';
import { MetricKind, TimeUnit } from '@/types/iot-portal';
import { option } from '@/util/container';
import moment from 'moment';
import lg from './return-flow-lg.svg';
import md from './return-flow-md.svg';
import sm from './return-flow-sm.svg';
import component from './ThermocouplesReturnFlowDevicePanelAdapter.vue';
import { formatValue } from './util';

export default option(DEVICE_ROLES, async () => ({
  name: 'THERMOCOUPLES_RETURN_FLOW',
  label: 'Rücklauftemperatur',
  shortLabel: 'Rücklauf',
  icons: { sm, md, lg },
  component,
  formatValue,
  history: {
    metrics: [
      {
        descriptor: { name: 'ExternalProbeLastTemperature', resolution: { amount: 1, unit: TimeUnit.DAY } },
        category: 'Information',
        label: 'Temperatur',
        formatValue,
      },
      {
        descriptor: { name: 'LowBattery', kind: MetricKind.DISCRETE },
        category: 'Batterie',
        label: 'Zustand',
        formatValue(value) {
          return value === '1' ? 'Niedrig' : 'Ok';
        },
      },
    ],
  },
  statistics: {
    metric: { name: 'ExternalProbeLastTemperature', resolution: { amount: 1, unit: TimeUnit.DAY } },
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
    { name: 'ExternalProbeLastTemperature' },
    { name: 'CONNECTION', kind: MetricKind.DISCRETE },
    { name: 'LowBattery', kind: MetricKind.DISCRETE },
  ],
  connectionMetricName: 'CONNECTION',
  batteryMetricName: 'LowBattery',
}));
