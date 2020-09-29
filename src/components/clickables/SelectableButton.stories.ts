import { textProp, selectProp } from '@@/storybook/util';
import centered from '@storybook/addon-centered/dist/vue';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import SelectableButton from './SelectableButton.global.vue';

storiesOf('Utility|Selectable Button', module)
  .addDecorator(centered)
  .addDecorator(withKnobs)

  .add('Showcase', () => ({
    components: {
      SelectableButton,
    },
    props: {
      label: textProp('label', 'letzte Woche'),
      color: selectProp('background', 'RED', 'GREEN', 'BLUE'),
    },
    data() {
      return {
        state: true,
        state1: true,
        state2: true,
        state3: true,
      };
    },
    template: `
      <div style="display: flex; flex-direction: column; height: 300px; justify-content: space-between;">
        <selectable-button :selected="state" :color="color" @click="onClick">
          {{ label }}
        </selectable-button>
        <selectable-button :selected="state1" color="GREEN" @click="state1 = $event">
          letzte Woche
        </selectable-button>
        <selectable-button :selected="state2" color="RED" @click="state2 = $event">
          letzten 2 Wochen
        </selectable-button>
        <selectable-button :selected="state3" color="BLUE" @click="state3 = $event">
          letzter Monat
        </selectable-button>
      </div>
    `,
    methods: {
      onClick: function(this: any, state) {
        this.state = state;
      },
    },
  }));
