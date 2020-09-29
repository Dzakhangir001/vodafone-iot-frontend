import { DEVICE_ROLES } from '@/features/core/container';
import { MetricKind } from '@/types/iot-portal';
import { option } from '@/util/container';
import lg from './lamp-control-lg.svg';
import md from './lamp-control-md.svg';
import sm from './lamp-control-sm.svg';
import component from './LampControlDevicePanelAdapter.vue';

export default option(DEVICE_ROLES, async () => ({
  name: 'LAMP_CONTROL',
  label: 'Lichtschalter',
  shortLabel: 'Licht',
  icons: { sm, md, lg },
  component,
  history: {
    metrics: [
      {
        descriptor: { name: 'onoff', kind: MetricKind.DISCRETE },
        category: 'Information',
        label: 'Licht',
        formatValue(value) {
          return value === '1' ? 'An' : 'Aus';
        },
      },
    ],
  },
  metrics: [
    { name: 'onoff', kind: MetricKind.DISCRETE },
    { name: 'CONNECTION', kind: MetricKind.DISCRETE },
    { name: 'BATTERY_LOW', kind: MetricKind.DISCRETE },
  ],
  connectionMetricName: 'CONNECTION',
  batteryMetricName: 'BATTERY_LOW',
}));
