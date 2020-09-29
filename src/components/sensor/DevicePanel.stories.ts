import { storiesOf } from '@storybook/vue';
import { FRAME } from '@@/storybook/util/frame-decorator';
import DevicePanel from './DevicePanel.vue';
import SensorProperty from './SensorProperty.vue';
import SensorAction from './SensorAction.vue';
import statisticIcon from '@/assets/images/statistic.png';
import lamp from './images/lamp.svg';
import { booleanProp, selectProp, textProp, numberProp } from '@@/storybook/util';
import { withKnobs } from '@storybook/addon-knobs';

storiesOf('UI|Device Panel', module)
  .addDecorator(withKnobs)
  .add(
    'Dev',
    () => ({
      components: {
        DevicePanel,
        SensorProperty,
        SensorAction,
      },
      props: {
        headline: textProp('Headline', 'Lampe'),
        description: textProp('Description', 'Küche'),
        danger: booleanProp('Danger', false),
        alarm: booleanProp('Alarm', true),
        background: booleanProp('Background', true),
        connectionStatus: selectProp('Connection Status', 'GREEN', 'RED', 'GRAY', 'NONE'),
        batteryStatus: selectProp('Battery Status', 'GREEN', 'RED', 'GRAY', 'NONE'),
        width: numberProp('Width', 240, 120, 480),
        height: numberProp('Height', 320, 160, 640),
      },
      data() {
        return {
          statisticIcon,
          lamp,
        };
      },
      template: `
        <div :style="\`width: \${width}px; height: \${height}px;\`">
          <device-panel
            :alarm="alarm"
            :danger="danger"
            :connection-status="connectionStatus"
            :battery-status="batteryStatus"
            :headline="headline"
            :description="description"
            :background-image="background ? lamp : undefined"
          >
            <template #actions>
              <sensor-action :icon="statisticIcon" to="/">Statistik</sensor-action>
              <sensor-action :icon="statisticIcon" to="/">Historie</sensor-action>
              <sensor-action :icon="statisticIcon" to="/">Export</sensor-action>
              <sensor-action :icon="statisticIcon" to="/">Gerät tauschen</sensor-action>
              <sensor-action :icon="statisticIcon" to="/">Disconnect</sensor-action>
            </template>
            <template #properties>
              <sensor-property label="Sensor">Rauchmelder</sensor-property>
              <sensor-property label="Ort">Badezimmer</sensor-property>
              <sensor-property label="Modell">Lorem Ipsum</sensor-property>
              <sensor-property v-if="true" label="ID">02000000000001000000BD72</sensor-property>
              <sensor-property label="Name">WGZ-012345</sensor-property>
              <sensor-property label="Sensor">Rauchmelder</sensor-property>
            </template>
          </device-panel>
        </div>
      `,
    }),
    { [FRAME]: { size: 0 } },
  );
