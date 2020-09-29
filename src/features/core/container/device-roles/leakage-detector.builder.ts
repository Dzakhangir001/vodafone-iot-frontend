import { MetricKind } from '@/types/iot-portal';
import { option } from '@/util/container';
import lg from '@core/assets/device-roles/leakage-detector-lg.svg';
import md from '@core/assets/device-roles/leakage-detector-md.svg';
import sm from '@core/assets/device-roles/leakage-detector-sm.svg';
import component from '@core/components/device-panel-adapters/LeakageDetectorDevicePanelAdapter.vue';
import { DEVICE_ROLES } from '..';

export default option(DEVICE_ROLES, async () => ({
  name: 'LEAKAGE_DETECTOR',
  label: 'Leckagemelder',
  shortLabel: 'Leckage',
  icons: { sm, md, lg },
  component,
  history: {
    metrics: [
      {
        descriptor: { name: 'water', kind: MetricKind.DISCRETE },
        category: 'Information',
        label: 'Leckage',
        formatValue(value) {
          return value === '1' ? 'Alarm' : 'Ok';
        },
      },
      {
        descriptor: { name: 'tamper', kind: MetricKind.DISCRETE },
        category: 'Gehäuse',
        label: 'Zustand',
        formatValue(value) {
          return value === '1' ? 'Geöffnet' : 'Geschlossen';
        },
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
    metric: { name: 'water', kind: MetricKind.DISCRETE },
    chartType: 'STEPPED',
    yLabels: [{ value: 1, label: 'Alarm' }, { value: 0, label: 'Keine Daten' }, { value: -1, label: 'Ok' }],
    dataPointToChartPoint({ date, value }) {
      return { x: date, y: value === '1' ? 1 : value === '0' ? -1 : 0 };
    },
  },
  metrics: [
    { name: 'water', kind: MetricKind.DISCRETE },
    { name: 'CONNECTION', kind: MetricKind.DISCRETE },
    { name: 'low', kind: MetricKind.DISCRETE },
  ],
  connectionMetricName: 'CONNECTION',
  batteryMetricName: 'low',
}));
