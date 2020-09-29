import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import UiModal from '@/components/modal/Modal.global.vue';
import UiButton from '@/components/clickables/Button.global.vue';

storiesOf('Utility | Modal', module)
  .addDecorator(withKnobs)
  .add('Showcase', () => ({
    components: {
      UiButton,
      UiModal,
    },
    data() {
      return {
        open: false,
      };
    },
    template: `
        <div>
          <ui-button @click="open = true">
            Open modal
          </ui-button>
          <ui-modal ref="modal" :visible="open" no-close-on-backdrop>
            <ui-button @click="open = false">
             Close modal
            </ui-button>
          </ui-modal>
        </div>
      `,
  }));
