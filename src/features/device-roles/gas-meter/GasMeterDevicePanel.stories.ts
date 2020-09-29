import sensorActions from '@/components/sensor/SensorAction.stories';
import SensorAction from '@/components/sensor/SensorAction.vue';
import sensorProperties from '@/components/sensor/SensorProperty.stories';
import SensorProperty from '@/components/sensor/SensorProperty.vue';
import { FRAME } from '@@/storybook/util/frame-decorator';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import GasMeterDevicePanel from './GasMeterDevicePanel.vue';

storiesOf('Devices|Gas Meter', module)
  .addDecorator(withKnobs)
  .add(
    'Gas Meter',
    () => ({
      components: {
        GasMeterDevicePanel,
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
          <gas-meter-device-panel
            connection-status="RED"
            battery-status="GREEN"
            headline="Gas"
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
          </gas-meter-device-panel>
        </div>
      `,
    }),
    { [FRAME]: { size: 0 } },
  );
