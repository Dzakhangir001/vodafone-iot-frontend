import { builder } from '@/util/container';
import { APPS } from '.';
import homeIcon from '../assets/apps/home.svg?vue';
import supportIcon from '../assets/apps/support.svg?vue';

export const APP_HOME = 'APP_HOME';
export const APP_HELP = 'APP_HELP';

export default builder(({ option }) => {
  option(APPS, async () => {
    return {
      name: APP_HOME,
      alwaysAllowed: true,
      link: {
        to: { name: 'Home' },
        icon: homeIcon,
        exact: true,
      },
      order: -1,
    };
  });
  option(APPS, async () => {
    return {
      name: APP_HELP,
      alwaysAllowed: true,
      link: {
        to: { name: 'Support' },
        icon: supportIcon,
        target: '_blank',
        class: 'push-down',
      },
      order: Number.POSITIVE_INFINITY,
    };
  });
});
