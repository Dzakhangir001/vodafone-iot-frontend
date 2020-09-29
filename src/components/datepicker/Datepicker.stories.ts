import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import UiDatepicker from './Datepicker.global.vue';

storiesOf('Utility | Datepicker', module)
  .addDecorator(withKnobs)
  .add('Showcase', () => {
    return {
      components: {
        UiDatepicker,
      },
      data() {
        return {
          date: new Date('2019-03-05'),
        };
      },
      template: `
          <div style="width: 100vw; height: 100vh;">
            <ui-datepicker v-model="date" />
          </div>
        `,
      watch: {
        date(newValue) {
          console.log(newValue);
        },
      },
    };
  });
