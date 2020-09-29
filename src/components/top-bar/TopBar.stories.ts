import { storiesOf } from '@storybook/vue';
import TopBar from './TopBar.vue';

storiesOf('Visual|Top Bar', module).add('Showcase', () => ({
  components: { TopBar },
  template: `
    <top-bar />
  `,
}));
