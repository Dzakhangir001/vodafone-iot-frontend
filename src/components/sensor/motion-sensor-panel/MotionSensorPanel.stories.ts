// import { booleanProp, textProp, objectProp } from '@@/storybook/util';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import moment from 'moment';
import { FRAME } from '@@/storybook/util/frame-decorator';
import sensorActions from '../SensorAction.stories';
import SensorAction from '../SensorAction.vue';
import sensorProperties from '../SensorProperty.stories';
import SensorProperty from '../SensorProperty.vue';
import MotionSensorPanel from './MotionSensorPanel.vue';

storiesOf('Visual|Sensor/Motion Sensor', module)
  .addDecorator(withKnobs)
  .add(
    'Motion Sensor',
    () => ({
      components: {
        MotionSensorPanel,
        SensorProperty,
        SensorAction,
      },
      data() {
        return {
          sensorActions,
          sensorProperties,
          lastActivityDate: moment().subtract(5, 'minutes'),
        };
      },
      template: `
        <div style="width: 240px; height: 320px">
          <motion-sensor-panel
            connectionStatus="RED"
            batteryStatus="GREEN"
            headline="Bewegung"
            description="Flur"
            :lastActivityDate="lastActivityDate"
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
          </motion-sensor-panel>
        </div>
      `,
    }),
    { [FRAME]: { size: 0 } },
  );
