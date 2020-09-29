import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import UserToolbar from './UserToolbar.vue';
import TopBar from '@/components/top-bar/TopBar.vue';
import { actions } from '@storybook/addon-actions';
import { textProp } from '@@/storybook/util';

storiesOf('Visual|User Toolbar', module)
  .addDecorator(withKnobs)
  .add('Showcase', () => ({
    components: {
      UserToolbar,
      TopBar,
    },
    props: {
      name: textProp('Name', 'Sebastian Gross'),
      role: textProp('Role', 'Administrator'),
    },
    methods: {
      ...actions('logoutClick'),
    },
    template: `
        <div style="width: 100%; height: 600px;">
          <top-bar>
            <user-toolbar
              :name="name"
              :role="role"
              @logoutClick="logoutClick"
            >
            </user-toolbar>
          </top-bar>
        </div>
      `,
  }));
