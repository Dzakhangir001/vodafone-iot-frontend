import sensorActions from '@/components/sensor/SensorAction.stories';
import SensorAction from '@/components/sensor/SensorAction.vue';
import sensorProperties from '@/components/sensor/SensorProperty.stories';
import SensorProperty from '@/components/sensor/SensorProperty.vue';
import { selectProp } from '@@/storybook/util';
import { FRAME } from '@@/storybook/util/frame-decorator';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import moment from 'moment';
import ThermocouplesDevicePanel from './ThermocouplesDevicePanel.vue';

storiesOf('Devices|Thermocouples', module)
  .addDecorator(withKnobs)
  .add(
    'Device panel',
    () => ({
      components: {
        ThermocouplesDevicePanel,
        SensorProperty,
        SensorAction,
      },
      props: {
        flow: selectProp('Flow', 'SUPPLY', 'RETURN'),
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
          <thermocouples-device-panel
            connectionStatus="RED"
            batteryStatus="GREEN"
            :headline="flow === 'SUPPLY' ? 'Vorlauf' : 'Rücklauf'"
            description="Küche"
            :temperature="26.5"
            :flow="flow"
            :measurement-date="lastActivityDate"
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
          </thermocouples-device-panel>
        </div>
      `,
    }),
    { [FRAME]: { size: 0 } },
  );
