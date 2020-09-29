import { DEVICE_ROLES } from '@/features/core/container';
import { MetricKind } from '@/types/iot-portal';
import { option } from '@/util/container';
import lg from './monoxid-sensor-lg.svg';
import md from './monoxid-sensor-md.svg';
import sm from './monoxid-sensor-sm.svg';
import component from './MonoxidSensorDevicePanelAdapter.vue';

export default option(DEVICE_ROLES, async () => ({
  name: 'MONOXID_SENSOR',
  label: 'Kohlenmonoxid',
  shortLabel: 'Kohlenmonoxid',
  icons: { sm, md, lg },
  component,
  history: {
    metrics: [
      {
        descriptor: { name: 'monoxid', kind: MetricKind.DISCRETE },
        category: 'Information',
        label: 'Kohlenmonoxid',
        formatValue(value) {
          return value === '1' ? 'Okay' : 'Schlecht';
        },
      },
    ],
  },
  metrics: [{ name: 'monoxid', kind: MetricKind.DISCRETE }, { name: 'CONNECTION', kind: MetricKind.DISCRETE }],
  connectionMetricName: 'CONNECTION',
}));
