import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import { FRAME } from '@@/storybook/util/frame-decorator';
import FloorPlanPanel from './FloorPlanPanel.vue';
import FloorPlanRoom from './FloorPlanRoom.vue';
import MiniSensor from '@/components/mini-sensor/MiniSensor.vue';
import fire from '@/assets/images/mini-sensors/fire.svg';
import lamp from '@/assets/images/mini-sensors/lamp.svg';
import leakage from '@/assets/images/mini-sensors/leakage.svg';
import motion from '@/assets/images/mini-sensors/motion.svg';
import smoke from '@/assets/images/mini-sensors/smoke.svg';
import waterMeter from '@/assets/images/mini-sensors/water-meter.svg';
import waterTemperature from '@/assets/images/mini-sensors/water-temperature.svg';
import window from '@/assets/images/mini-sensors/window.svg';

storiesOf('Visual|Floor Plan Panel', module)
  .addDecorator(withKnobs)
  .add(
    'Showcase',
    () => ({
      components: {
        FloorPlanPanel,
        FloorPlanRoom,
        MiniSensor,
      },
      data() {
        return {
          fire,
          lamp,
          leakage,
          motion,
          smoke,
          waterMeter,
          waterTemperature,
          window,
        };
      },
      template: `
        <div style="width: 800px; height: auto;">
          <floor-plan-panel name="Wählen Sie einen Raum">
            <floor-plan-room name="Küche">
              <mini-sensor :icon="waterMeter" border="GREEN"></mini-sensor>
              <mini-sensor :icon="fire"></mini-sensor>
              <mini-sensor :icon="waterTemperature" border="GREEN"></mini-sensor>
              <mini-sensor :icon="fire"></mini-sensor>
              <mini-sensor :icon="motion" border="RED"></mini-sensor>
              <mini-sensor :icon="smoke" border="GREEN"></mini-sensor>
              <mini-sensor :icon="waterMeter" border="GREEN"></mini-sensor>
              <mini-sensor :icon="fire"></mini-sensor>
              <mini-sensor :icon="waterTemperature" border="GREEN"></mini-sensor>
            </floor-plan-room>
            <floor-plan-room name="Flur">
              <mini-sensor :icon="waterTemperature" border="GREEN"></mini-sensor>
              <mini-sensor :icon="motion" border="RED"></mini-sensor>
              <mini-sensor :icon="smoke" border="GREEN"></mini-sensor>
              <mini-sensor :icon="waterTemperature" border="GREEN"></mini-sensor>
            </floor-plan-room>
            <floor-plan-room name="Wohnzimmer">
              <mini-sensor :icon="waterMeter" border="GREEN"></mini-sensor>
              <mini-sensor :icon="fire"></mini-sensor>
            </floor-plan-room>
            <floor-plan-room name="Badezimmer 1">
              <mini-sensor :icon="motion" border="RED"></mini-sensor>
              <mini-sensor :icon="smoke" border="GREEN"></mini-sensor>
              <mini-sensor :icon="waterMeter" border="GREEN"></mini-sensor>
              <mini-sensor :icon="fire"></mini-sensor>
              <mini-sensor :icon="motion" border="RED"></mini-sensor>
            </floor-plan-room>
            <floor-plan-room name="Schlafzimmer">
              <mini-sensor :icon="motion" border="RED"></mini-sensor>
              <mini-sensor :icon="motion" border="RED"></mini-sensor>
              <mini-sensor :icon="smoke" border="GREEN"></mini-sensor>
              <mini-sensor :icon="waterMeter" border="GREEN"></mini-sensor>
            </floor-plan-room>
          </floor-plan-panel>
        </div>
      `,
    }),
    { [FRAME]: { size: 0 } },
  );
