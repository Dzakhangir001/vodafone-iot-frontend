import { DEVICE_ROLES } from '@/features/core/container';
import { MetricKind } from '@/types/iot-portal';
import { option } from '@/util/container';
import lg from './occupancy-detector-lg.svg';
import md from './occupancy-detector-md.svg';
import sm from './occupancy-detector-sm.svg';
import component from './OccupancyDetectorDevicePanelAdapter.vue';

export default option(DEVICE_ROLES, async () => ({
  name: 'OCCUPANCY_DETECTOR',
  label: 'Belegung',
  shortLabel: 'Belegung',
  icons: { sm, md, lg },
  component,
  history: {
    metrics: [
      {
        descriptor: { name: 'occupancy', kind: MetricKind.DISCRETE },
        category: 'Information',
        label: 'Verfügbarkeit',
        formatValue(value) {
          return value === '1' ? 'Belegt' : 'Frei';
        },
      },
    ],
  },
  metrics: [{ name: 'occupancy', kind: MetricKind.DISCRETE }, { name: 'CONNECTION', kind: MetricKind.DISCRETE }],
  connectionMetricName: 'CONNECTION',
}));
