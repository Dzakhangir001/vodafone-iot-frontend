import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import { actions } from '@storybook/addon-actions';
import { FRAME } from '@@/storybook/util/frame-decorator';
import ApartmentListPanel from './ApartmentListPanel.vue';
import MiniSensor from '@/components/mini-sensor/MiniSensor.vue';
import ApartmentListItem from './ApartmentListItem.vue';
import fire from '@/assets/images/mini-sensors/fire.svg';
import lamp from '@/assets/images/mini-sensors/lamp.svg';
import leakage from '@/assets/images/mini-sensors/leakage.svg';
import motion from '@/assets/images/mini-sensors/motion.svg';
import smoke from '@/assets/images/mini-sensors/smoke.svg';
import waterMeter from '@/assets/images/mini-sensors/water-meter.svg';
import waterTemperature from '@/assets/images/mini-sensors/water-temperature.svg';
import window from '@/assets/images/mini-sensors/window.svg';

storiesOf('Visual|Apartment List Panel', module)
  .addDecorator(withKnobs)
  .add(
    'Showcase',
    () => ({
      components: {
        ApartmentListPanel,
        MiniSensor,
        ApartmentListItem,
      },
      data() {
        return {
          fire: fire,
          lamp: lamp,
          leakage: leakage,
          motion: motion,
          smoke: smoke,
          waterMeter: waterMeter,
          waterTemperature: waterTemperature,
          window: window,
        };
      },
      methods: {
        ...actions('onClick'),
      },
      template: `
        <div style="width: 80vw; max-width: 1500px;">
          <apartment-list-panel>
            <apartment-list-item button-label="Wohnung 1" @click="onClick('Apartment 1')">
              <mini-sensor :icon="motion" border="RED"></mini-sensor>
              <mini-sensor :icon="smoke"></mini-sensor>
            </apartment-list-item>
            <apartment-list-item button-label="Wohnung 2" @click="onClick('Apartment 2')">
              <mini-sensor :icon="motion" border="RED"></mini-sensor>
              <mini-sensor :icon="smoke" border="GREEN"></mini-sensor>
              <mini-sensor :icon="waterMeter" border="GREEN"></mini-sensor>
              <mini-sensor :icon="fire"></mini-sensor>
              <mini-sensor :icon="waterTemperature" border="GREEN"></mini-sensor>
            </apartment-list-item>
            <apartment-list-item button-label="Wohnung 3" @click="onClick('Apartment 3')">
              <mini-sensor :icon="fire" border="GREEN"></mini-sensor>
              <mini-sensor :icon="leakage"></mini-sensor>
              <mini-sensor :icon="waterMeter"></mini-sensor>
              <mini-sensor :icon="fire"></mini-sensor>
              <mini-sensor :icon="waterTemperature"></mini-sensor>
              <mini-sensor :icon="motion" border="RED"></mini-sensor>
              <mini-sensor :icon="smoke" border="GREEN"></mini-sensor>
              <mini-sensor :icon="waterMeter" border="GREEN"></mini-sensor>
              <mini-sensor :icon="fire"></mini-sensor>
              <mini-sensor :icon="waterTemperature" border="GREEN"></mini-sensor>
            </apartment-list-item>
            <apartment-list-item button-label="Wohnung 4" @click="onClick('Apartment 4')">
              <mini-sensor :icon="motion" border="RED"></mini-sensor>
              <mini-sensor :icon="smoke" border="RED"></mini-sensor>
              <mini-sensor :icon="waterMeter" border="RED"></mini-sensor>
              <mini-sensor :icon="fire"></mini-sensor>
              <mini-sensor :icon="waterTemperature" border="GREEN"></mini-sensor>
            </apartment-list-item>
          </apartment-list-panel>
        </div>
      `,
    }),
    { [FRAME]: { size: 0 } },
  );
