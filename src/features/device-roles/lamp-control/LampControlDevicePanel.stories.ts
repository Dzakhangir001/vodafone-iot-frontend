import sensorActions from '@/components/sensor/SensorAction.stories';
import SensorAction from '@/components/sensor/SensorAction.vue';
import sensorProperties from '@/components/sensor/SensorProperty.stories';
import SensorProperty from '@/components/sensor/SensorProperty.vue';
import delay from '@/util/delay';
import { FRAME } from '@@/storybook/util/frame-decorator';
import { actions } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import moment from 'moment';
import LampControlDevicePanel from './LampControlDevicePanel.vue';

storiesOf('Devices|Lamp Control', module)
  .addDecorator(withKnobs)
  .add(
    'Device Panel',
    () => ({
      components: {
        LampControlDevicePanel,
        SensorProperty,
        SensorAction,
      },
      data() {
        return {
          sensorActions,
          sensorProperties,
          state: 'OFF',
          targetState: 'OFF',
          stateDate: moment().subtract(5, 'minutes'),
          i: 0,
        };
      },
      template: `
        <div style="width: 240px; height: 320px">
          <lamp-control-device-panel
            v-model="targetState"
            :state="state"
            :state-date="stateDate"
            connection-status="RED"
            battery-status="GREEN"
            headline="Lampe"
            description="Küche"
            @update:target-state="onTargetStateUpdated"
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
          </lamp-control-device-panel>
          <p>Status: {{ state }}</p>
          <p>Zielstatus: {{ targetState }}</p>
          <p><button @click="state = 'UNKNOWN'">Status auf 'UNKNOWN' setzen</button></p>
        </div>
      `,
      watch: {
        targetState: async function(this: any, targetState) {
          const i = ++this.i;

          await delay(1000);

          if (i !== this.i || this.state === targetState) {
            return;
          }

          this.state = targetState;
          this.stateDate = moment();
        },
      },
      methods: {
        ...actions('onTargetStateUpdated', 'onActionClick'),
      },
    }),
    { [FRAME]: { size: 0 } },
  );
