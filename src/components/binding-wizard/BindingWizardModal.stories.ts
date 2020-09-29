import Qundis from '@/assets/images/manufacturers/qundis.png';
import Sontex from '@/assets/images/manufacturers/sontex.png';
import Door from '@/assets/images/roles/door.svg';
import Lamp from '@/assets/images/roles/lamp.svg';
import Sensor from '@/assets/images/roles/sensor.svg';
import Water from '@/assets/images/roles/water.svg';
import Window from '@/assets/images/roles/window.svg';
import Wmz from '@/assets/images/roles/wmz.svg';
import Wmz2 from '@/assets/images/roles/wmz2.svg';
import Bathroom from '@/assets/images/rooms/bathroom.svg';
import Floor from '@/assets/images/rooms/floor.svg';
import LivingRoom from '@/assets/images/rooms/livingroom.svg';
import delay from '@/util/delay';
import { FRAME } from '@@/storybook/util/frame-decorator';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/vue';
import BindingWizardModal from './BindingWizardModal.vue';

storiesOf('Visual|Binding Wizard Modal', module).add(
  'Showcase',
  () => {
    const actionRequestAddSensor = action('requestAddSensor');
    const actionSensorAdded = action('sensorAdded');

    return {
      components: { BindingWizardModal },
      template: `
        <binding-wizard-modal
          :initial-config="{ siteId: 'floor' }"
          :room-options="roomOptions"
          :role-options="roleOptions"
          :manufacturer-options="manufacturerOptions"
          :add-action="addAction"
        />
      `,
      data() {
        return {
          roomOptions: [
            {
              value: 'bathroom',
              label: 'Bathroom',
              icon: Bathroom,
            },
            {
              value: 'floor',
              label: 'Floor',
              icon: Floor,
            },
            {
              value: 'livingroom',
              label: 'Living room',
              icon: LivingRoom,
            },
          ],
          roleOptions: [
            {
              value: 'door',
              label: 'Door',
              icon: Door,
            },
            {
              value: 'lamp',
              label: 'Lamp',
              icon: Lamp,
            },
            {
              value: 'sensor',
              label: 'Sensor',
              icon: Sensor,
            },
            {
              value: 'wmz',
              label: 'WMZ',
              icon: Wmz,
            },
            {
              value: 'wmz2',
              label: 'WMZ2',
              icon: Wmz2,
            },
            {
              value: 'water',
              label: 'Water',
              icon: Water,
            },
            {
              value: 'window',
              label: 'Window',
              icon: Window,
            },
          ],
          manufacturerOptions: [
            {
              value: 'qundis',
              label: 'Qundis',
              icon: Qundis,
            },
            {
              value: 'sontex',
              label: 'Sontex',
              icon: Sontex,
            },
            {
              value: 'xyz',
              label: 'XYZ',
              icon: null,
            },
            {
              value: 'zyx',
              label: 'ZYX',
              icon: null,
            },
          ],
        };
      },
      methods: {
        async addAction(): Promise<void> {
          actionRequestAddSensor();

          await delay(3000);

          actionSensorAdded();
        },
      },
    };
  },
  {
    [FRAME]: { size: 0 },
  },
);
