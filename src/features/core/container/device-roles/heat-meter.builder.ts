import component from '@/components/sensor/heat-meter-sensor-panel/HeatMeterDevicePanel.vue';
import { option } from '@/util/container';
import lg from '@core/assets/device-roles/heat-meter-lg.svg';
import md from '@core/assets/device-roles/heat-meter-md.svg';
import sm from '@core/assets/device-roles/heat-meter-sm.svg';
import { DEVICE_ROLES } from '..';

export default option(DEVICE_ROLES, async () => ({
  name: 'HEAT_METER_TEMPERATURE',
  label: 'Vorlauf/Rücklauf',
  shortLabel: 'Vorlauf/Rücklauf',
  icons: { sm, md, lg },
  component,
}));
