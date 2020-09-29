import { APPS } from '@/features/core/container';
import { option } from '@/util/container';
import icon from '../assets/app-user-management.svg?vue';

export const APP_USER_MANAGEMENT = 'APP_USER_MANAGEMENT';

export default option(APPS, async () => {
  return {
    name: APP_USER_MANAGEMENT,
    label: 'Nutzerverwaltung',
    link: {
      to: { name: 'AppUserManagementView' },
      icon,
    },
  };
});
