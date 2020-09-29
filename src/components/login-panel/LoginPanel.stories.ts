import delay from '@/util/delay';
import { FRAME } from '@@/storybook/util/frame-decorator';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered/dist/vue';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import LoginPanel from './LoginPanel.vue';

storiesOf('Visual|Login Panel', module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .add(
    'Showcase',
    () => ({
      components: {
        LoginPanel,
      },
      methods: {
        async login({ email, password, rememberMe }): Promise<void> {
          action('onLoginRequest')(email, password, rememberMe);
          await delay(3000);
          action('onLoginSuccess')();
        },
      },
      template: `
        <login-panel
          :login-action="login"
        ></login-panel>
      `,
    }),
    {
      [FRAME]: { size: 0 },
    },
  );
