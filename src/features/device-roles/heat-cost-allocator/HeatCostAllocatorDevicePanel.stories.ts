import sensorActions from '@/components/sensor/SensorAction.stories';
import SensorAction from '@/components/sensor/SensorAction.vue';
import sensorProperties from '@/components/sensor/SensorProperty.stories';
import SensorProperty from '@/components/sensor/SensorProperty.vue';
import { FRAME } from '@@/storybook/util/frame-decorator';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import HeatCostAllocatorDevicePanel from './HeatCostAllocatorDevicePanel.vue';

storiesOf('Devices|Heat Cost Allocator', module)
  .addDecorator(withKnobs)
  .add(
    'Device Panel',
    () => ({
      components: {
        HeatCostAllocatorDevicePanel,
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
          <heat-cost-allocator-device-panel
            connection-status="RED"
            battery-status="GREEN"
            headline="Heizkostenverteiler"
            description="Küche"
            :radiator-temperature="26.5"
            :room-temperature="23.8"
            :meter-reading="4354"
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
          </heat-cost-allocator-device-panel>
        </div>
      `,
    }),
    { [FRAME]: true },
  );
