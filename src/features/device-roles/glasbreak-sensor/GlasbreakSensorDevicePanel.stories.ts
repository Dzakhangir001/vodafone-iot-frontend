import sensorActions from '@/components/sensor/SensorAction.stories';
import SensorAction from '@/components/sensor/SensorAction.vue';
import sensorProperties from '@/components/sensor/SensorProperty.stories';
import SensorProperty from '@/components/sensor/SensorProperty.vue';
import { selectProp } from '@@/storybook/util';
import { FRAME } from '@@/storybook/util/frame-decorator';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import moment from 'moment';
import GlasbreakSensorDevicePanel from './GlasbreakSensorDevicePanel.vue';

storiesOf('Devices|Glasbreak Sensor', module)
  .addDecorator(withKnobs)
  .add(
    'Device Panel',
    () => ({
      components: {
        GlasbreakSensorDevicePanel,
        SensorProperty,
        SensorAction,
      },
      props: {
        state: selectProp('CO Status', 'UNKNOWN', 'OK', 'BAD'),
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
          <glasbreak-sensor-device-panel
            :state="state === 'UNKNOWN' ? undefined : state"
            :measurement-date="measurementDate"
            connection-status="RED"
            battery-status="GREEN"
            headline="Glasbruch"
            description="Küche"
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
          </glasbreak-sensor-device-panel>
        </div>
      `,
    }),
    { [FRAME]: { size: 0 } },
  );
