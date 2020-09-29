import { FRAME } from '@@/storybook/util/frame-decorator';
import sensorActions from '../SensorAction.stories';
import SensorAction from '../SensorAction.vue';
import sensorProperties from '../SensorProperty.stories';
import SensorProperty from '../SensorProperty.vue';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import moment from 'moment';
import HeatMeterDevicePanel from './HeatMeterDevicePanel.vue';

storiesOf('Visual|Sensor/Heat Meter Sensor', module)
  .addDecorator(withKnobs)
  .add(
    'Heat Meter Sensor',
    () => ({
      components: {
        HeatMeterDevicePanel,
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
          <heat-meter-device-panel
            connection-status="RED"
            battery-status="GREEN"
            headline="Vorlauf/Rücklauf"
            description="Küche"
            :max="26.5"
            :min="21.4"
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
          </heat-meter-device-panel>
        </div>
      `,
    }),
    { [FRAME]: true },
  );
