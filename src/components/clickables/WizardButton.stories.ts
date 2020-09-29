import delay from '@/util/delay';
import { action } from '@@/node_modules/@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import WizardButton from './WizardButton.global.vue';

storiesOf('Utility | WizardButton', module)
  .addDecorator(withKnobs)
  .add('Showcase', () => {
    const actionRequestAdd = action('requestAdd');
    const actionAdded = action('added');
    return {
      components: {
        WizardButton,
      },
      data() {
        return {
          busy: false,
        };
      },
      methods: {
        async onCLick(): Promise<void> {
          // @ts-ignore
          this.busy = true;
          actionRequestAdd();
          await delay(3000);
          // @ts-ignore
          this.busy = false;
          actionAdded();
        },
      },
      template: `
          <wizard-button :busy="busy" @click="onCLick">
            {{ busy ? 'Loading...': 'Wizard button'}}
          </wizard-button>
        `,
    };
  });
