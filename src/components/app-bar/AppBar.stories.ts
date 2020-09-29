import { storiesOf } from '@storybook/vue';
import { actions } from '@storybook/addon-actions';
import AppBar from '@/components/app-bar/AppBar.vue';
import AppLink from '@/components/app-bar/AppLink.vue';
import homeIcon from '@core/assets/apps/home.svg?vue';
import supportIcon from '@core/assets/apps/support.svg?vue';

storiesOf('Visual|App Bar', module).add('Showcase', () => ({
  components: { AppBar, AppLink },
  template: `
      <div style="height: 100vh;">
        <app-bar>
          <app-link
            v-for="icon of icons"
            :key="icon.key"
            :icon="icon.component"
            :active="active === icon.component"
            :class="icon.class"
            @click="(void onIconClick(icon.component, ...arguments)) || (active = icon.component)"
          />
        </app-bar>
      </div>
  `,
  data() {
    return {
      icons: [
        {
          key: 'home',
          component: homeIcon,
        },
        {
          key: 'support',
          component: supportIcon,
          class: 'push-down',
        },
      ],
      active: 'home',
    };
  },
  methods: {
    ...actions('onIconClick'),
  },
}));
