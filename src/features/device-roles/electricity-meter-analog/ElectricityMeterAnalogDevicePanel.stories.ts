import sensorActions from '@/components/sensor/SensorAction.stories';
import SensorAction from '@/components/sensor/SensorAction.vue';
import sensorProperties from '@/components/sensor/SensorProperty.stories';
import SensorProperty from '@/components/sensor/SensorProperty.vue';
import { FRAME } from '@@/storybook/util/frame-decorator';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import ElectricityMeterAnalogDevicePanel from './ElectricityMeterAnalogDevicePanel.vue';

storiesOf('Devices|Electricity Analog Meter', module)
  .addDecorator(withKnobs)
  .add(
    'Electricity Meter',
    () => ({
      components: {
        ElectricityMeterAnalogDevicePanel,
        SensorProperty,
        SensorAction,
      },
      data() {
        return {
          sensorActions,
          sensorProperties,
        };
      },
      template: `
        <div style="width: 240px; height: 320px">
          <electricity-meter-analog-device-panel
            connection-status="RED"
            battery-status="GREEN"
            headline="Stromzähler (analog)"
            description="Flur"
            :meter-reading="11282"
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
          </electricity-meter-analog-device-panel>
        </div>
      `,
    }),
    { [FRAME]: { size: 0 } },
  );
