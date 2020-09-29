import { textProp } from '@@/storybook/util';
import centered from '@storybook/addon-centered/dist/vue';
import { actions } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import Button from './Button.global.vue';
import triangle from '@/assets/images/triangle.svg';
import exchangeDeviceIcon from '@/assets/images/exchange-device.svg';
import disconnectIcon from '@/assets/images/disconnect.svg';

storiesOf('Utility|Button', module)
  .addDecorator(centered)
  .addDecorator(withKnobs)

  .add('Showcase', () => ({
    components: {
      'ui-button': Button,
    },
    data() {
      return {
        triangle,
        exchangeDeviceIcon,
        disconnectIcon,
      };
    },
    props: {
      label: textProp('label', 'Wohnung 3'),
    },
    methods: {
      ...actions('onClick'),
    },
    template: `
      <div style="display: flex; flex-direction: column; height: 270px; justify-content: space-between;">
        <ui-button @click="onClick($event)">
          {{ label }}
        </ui-button>
        <ui-button @click="onClick($event)" :icon="triangle">
          {{ label }}
        </ui-button>
        <ui-button @click="onClick($event)" :icon="triangle" after>
          {{ label }}
        </ui-button>
        <ui-button @click="onClick($event)" :icon="triangle" front>
          {{ label }}
        </ui-button>
        <ui-button @click="onClick($event)" :icon="triangle" back>
          {{ label }}
        </ui-button>
        <ui-button @click="onClick($event)" :icon="exchangeDeviceIcon" front>
          Gerät tauschen
        </ui-button>
        <ui-button @click="onClick($event)" :icon="disconnectIcon" front>
          Disconnect
        </ui-button>
      </div>
    `,
  }));
