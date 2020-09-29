import sensorActions from '@/components/sensor/SensorAction.stories';
import SensorAction from '@/components/sensor/SensorAction.vue';
import sensorProperties from '@/components/sensor/SensorProperty.stories';
import SensorProperty from '@/components/sensor/SensorProperty.vue';
import { FRAME } from '@@/storybook/util/frame-decorator';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import moment from 'moment';
import LiftingStationDevicePanel from './LiftingStationDevicePanel.vue';

storiesOf('Devices|Lifting Station', module)
  .addDecorator(withKnobs)
  .add(
    'Device Panel',
    () => ({
      components: {
        LiftingStationDevicePanel,
        SensorProperty,
        SensorAction,
      },
      data() {
        return {
          sensorActions,
          sensorProperties,
          measurementDate: moment().subtract(5, 'minutes'),
        };
      },
      template: `
        <div style="width: 240px; height: 320px">
          <lifting-station-device-panel
            connection-status="RED"
            battery-status="GREEN"
            headline="Hebeanlage"
            description="Keller"
            mode="ON"
            :measurement-date="measurementDate"
          >
            <template #actions>
              <sensor-action
                v-for="action of sensorActions"
                :icon="action.icon"
                @click="onActionClick(action.label, $event)"
              >
                {{ action.label }}
              </sensor-action>
            </template>
            <template #properties>
              <sensor-property
                v-for="property of sensorProperties"
                :label="property.label"
              >
                {{ property.value }}
              </sensor-property>
            </template>
          </lifting-station-device-panel>
        </div>
      `,
    }),
    { [FRAME]: { size: 0 } },
  );
