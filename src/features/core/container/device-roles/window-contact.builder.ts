import { MetricKind } from '@/types/iot-portal';
import { option } from '@/util/container';
import lg from '@core/assets/device-roles/window-contact-lg.svg';
import md from '@core/assets/device-roles/window-contact-md.svg';
import sm from '@core/assets/device-roles/window-contact-sm.svg';
import component from '@core/components/device-panel-adapters/WindowContactDevicePanelAdapter.vue';
import { DEVICE_ROLES } from '..';

export default option(DEVICE_ROLES, async () => ({
  name: 'WINDOW_CONTACT',
  label: 'Fensterkontakt',
  shortLabel: 'Fenster',
  icons: { sm, md, lg },
  component,
  history: {
    metrics: [
      {
        descriptor: { name: 'opened', kind: MetricKind.DISCRETE },
        category: 'Information',
        label: 'Tür',
        formatValue(value) {
          return value === '1' ? 'Geöffnet' : 'Geschlossen';
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
    metric: { name: 'opened', kind: MetricKind.DISCRETE },
    chartType: 'STEPPED',
    yLabels: [{ value: 1, label: 'Geöffnet' }, { value: 0, label: 'Keine Daten' }, { value: -1, label: 'Geschlossen' }],
    dataPointToChartPoint({ date, value }) {
      return { x: date, y: value === '1' ? 1 : value === '0' ? -1 : 0 };
    },
  },
  metrics: [
    { name: 'opened', kind: MetricKind.DISCRETE },
    { name: 'CONNECTION', kind: MetricKind.DISCRETE },
    { name: 'low', kind: MetricKind.DISCRETE },
  ],
  connectionMetricName: 'CONNECTION',
  batteryMetricName: 'low',
}));
