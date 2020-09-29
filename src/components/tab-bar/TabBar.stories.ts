import { selectProp } from '@@/storybook/util';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import TabBar from './TabBar.global.vue';
import TabButton from './TabButton.global.vue';
import { FRAME } from '@@/storybook/util/frame-decorator';

const components = {
  TabButton,
  TabBar,
};

const tabs = [
  'Wohnungsansicht',
  'Alle Sensoren',
  'RWM',
  'WMZ',
  'KWZ',
  'Fenster',
  'Türe',
  'Leckage',
  'Legionellen',
  'Aufzug',
];

storiesOf('Visual|Tab Bar', module)
  .addDecorator(withKnobs)

  .add('Showcase', () => ({
    components,
    template: `
      <ui-flex root>
        <ui-cell :basis="1">
          <tab-bar v-model="value">
            <tab-button v-for="tab of tabs" :key="tab" :value="tab">{{ tab }}</tab-button>
          </tab-bar>
        </ui-cell>
        <ui-cell :basis="1">
          <input v-model="jsonValue" />
        </ui-cell>
        <ui-cell :basis="1">
          <tab-bar v-model="value" align="top">
            <tab-button v-for="tab of tabs" :key="tab" :value="tab">{{ tab }}</tab-button>
          </tab-bar>
        </ui-cell>
      </ui-flex>
    `,
    data() {
      return {
        tabs,
        value: tabs[0],
      };
    },
    computed: {
      jsonValue: {
        get(this: any) {
          return JSON.stringify(this.value);
        },
        set(this: any, value) {
          try {
            this.value = JSON.parse(value);
          } catch (e) {
            // nothing
          }
        },
      },
    },
  }))

  .add(
    'Dev',
    () => ({
      components,
      template: `
        <tab-bar v-model="value" :align="align">
          <tab-button v-for="i of 9" :key="i" :value="i">{{ i }}{{ i }}{{ i }}{{ i }}{{ i }}</tab-button>
        </tab-bar>
      `,
      props: {
        align: selectProp('Align', 'bottom', 'top'),
      },
      data() {
        return {
          value: 1,
        };
      },
    }),
    {
      [FRAME]: true,
    },
  );
