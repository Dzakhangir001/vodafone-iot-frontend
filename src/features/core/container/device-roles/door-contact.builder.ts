import { MetricKind } from '@/types/iot-portal';
import { option } from '@/util/container';
import lg from '@core/assets/device-roles/door-contact-lg.svg';
import md from '@core/assets/device-roles/door-contact-md.svg';
import sm from '@core/assets/device-roles/door-contact-sm.svg';
import component from '@core/components/device-panel-adapters/DoorContactDevicePanelAdapter.vue';
import { DEVICE_ROLES } from '..';

export default option(DEVICE_ROLES, async () => ({
  name: 'DOOR_CONTACT',
  label: 'Türkontakt',
  shortLabel: 'Tür',
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
      {
        descriptor: { name: 'ALERT_RULES_V1_5', kind: MetricKind.DISCRETE },
        category: 'Alarm',
        label: 'mehr als 6h geöffnet',
        formatValue(value) {
          return value === '2' ? 'Alarm' : 'Ok';
        },
      },
      {
        descriptor: { name: 'ALERT_RULES_V1_6', kind: MetricKind.DISCRETE },
        category: 'Alarm',
        label: 'geöffnet außerhalb Geschäftszeiten',
        formatValue(value) {
          return value === '2' ? 'Alarm' : 'Ok';
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
