import { DEVICE_ROLES } from '@/features/core/container';
import { MetricKind } from '@/types/iot-portal';
import { option } from '@/util/container';
import lg from './lifting-station-lg-off.svg';
import md from './lifting-station-md.svg';
import sm from './lifting-station-sm.svg';
import component from './LiftingStationDevicePanelAdapter.vue';

export default option(DEVICE_ROLES, async () => ({
  name: 'LIFTING_STATION',
  label: 'Abwasserhebeanlage',
  shortLabel: 'Wasser',
  icons: { sm, md, lg },
  component,
  history: {
    metrics: [
      {
        descriptor: { name: 'onoff', kind: MetricKind.DISCRETE },
        category: 'Information',
        label: 'Aktivität',
        formatValue(value) {
          return value === '1' ? 'An' : 'Aus';
        },
      },
    ],
  },
  metrics: [{ name: 'onoff', kind: MetricKind.DISCRETE }, { name: 'CONNECTION', kind: MetricKind.DISCRETE }],
  connectionMetricName: 'CONNECTION',
}));
