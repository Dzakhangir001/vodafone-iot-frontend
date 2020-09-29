import { DEVICE_ROLES } from '@/features/core/container';
import { MetricKind } from '@/types/iot-portal';
import { option } from '@/util/container';
import lg from './glasbreak-sensor-lg.svg';
import md from './glasbreak-sensor-md.svg';
import sm from './glasbreak-sensor-sm.svg';
import component from './GlasbreakSensorDevicePanelAdapter.vue';

export default option(DEVICE_ROLES, async () => ({
  name: 'GLASBREAK_SENSOR',
  label: 'Glasbruch',
  shortLabel: 'Glasbruch',
  icons: { sm, md, lg },
  component,
  history: {
    metrics: [
      {
        descriptor: { name: 'glasbreak', kind: MetricKind.DISCRETE },
        category: 'Information',
        label: 'Glasbruch',
        formatValue(value) {
          return value === '1' ? 'Okay' : 'Schlecht';
        },
      },
    ],
  },
  metrics: [{ name: 'glasbreak', kind: MetricKind.DISCRETE }, { name: 'CONNECTION', kind: MetricKind.DISCRETE }],
  connectionMetricName: 'CONNECTION',
}));
