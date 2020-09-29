import sensorActions from '@/components/sensor/SensorAction.stories';
import SensorAction from '@/components/sensor/SensorAction.vue';
import sensorProperties from '@/components/sensor/SensorProperty.stories';
import SensorProperty from '@/components/sensor/SensorProperty.vue';
import { selectProp } from '@@/storybook/util';
import { FRAME } from '@@/storybook/util/frame-decorator';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import moment from 'moment';
import OccupancyDetectorDevicePanel from './OccupancyDetectorDevicePanel.vue';

storiesOf('Devices|Occupancy Detector', module)
  .addDecorator(withKnobs)
  .add(
    'Device Panel',
    () => ({
      components: {
        OccupancyDetectorDevicePanel,
        SensorProperty,
        SensorAction,
      },
      props: {
        state: selectProp('Battery Status', 'VACANT', 'OCCUPIED', 'UNKNOWN'),
      },
      data() {
        return {
          sensorActions,
          sensorProperties,
          measurementDate: moment().subtract(3, 'minutes'),
        };
      },
      template: `
        <div style="width: 240px; height: 320px">
          <occupancy-detector-device-panel
            :state="state === 'UNKNOWN' ? undefined : state"
            :measurement-date="measurementDate"
            connection-status="RED"
            battery-status="GREEN"
            headline="Belegung"
            description="Meeting room"
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
          </occupancy-detector-device-panel>
        </div>
      `,
    }),
    { [FRAME]: { size: 0 } },
  );
