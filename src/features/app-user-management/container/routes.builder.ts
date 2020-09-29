import { ROUTES } from '@/features/core/container';
import { option } from '@/util/container';
import ContractPanelControl from '../components/contract-panel-control/ContractPanelControl.global.vue';
import CustomerPanelControl from '../components/customer-panel-control/CustomerPanelControl.global.vue';
import UserPanelControl from '../components/user-panel/UserPanelControl.global.vue';
import AppUserManagementContractView from '../views/AppUserManagementContractView.vue';
import AppUserManagementCustomerView from '../views/AppUserManagementCustomerView.vue';
import AppUserManagementView from '../views/AppUserManagementView.vue';
import { APP_USER_MANAGEMENT } from './app.builder';

export default option(ROUTES, async () => {
  return [
    {
      path: '/admin',
      name: 'AppUserManagementView',
      redirect: { name: 'AppUserManagementView/UserPanelControl' },
      component: AppUserManagementView,
      meta: { app: APP_USER_MANAGEMENT, authRequired: true },
      children: [
        {
          path: '/admin/users',
          name: 'AppUserManagementView/UserPanelControl',
          component: UserPanelControl,
          meta: { app: APP_USER_MANAGEMENT, authRequired: true, key: (): string => 'AppUserManagementView' },
        },
        {
          path: '/admin/customers',
          name: 'AppUserManagementView/CustomerPanelControl',
          component: CustomerPanelControl,
          meta: { app: APP_USER_MANAGEMENT, authRequired: true, key: (): string => 'AppUserManagementView' },
        },
        {
          path: '/admin/contracts',
          name: 'AppUserManagementView/ContractPanelControl',
          component: ContractPanelControl,
          meta: { app: APP_USER_MANAGEMENT, authRequired: true, key: (): string => 'AppUserManagementView' },
        },
      ],
    },
    {
      path: '/admin/customers/:customerId',
      name: 'AppUserManagementCustomerView',
      component: AppUserManagementCustomerView,
      props: true,
      meta: { app: APP_USER_MANAGEMENT, authRequired: true },
    },
    {
      path: '/admin/contracts/:contractId',
      name: 'AppUserManagementContractView',
      component: AppUserManagementContractView,
      props: true,
      meta: { app: APP_USER_MANAGEMENT, authRequired: true },
    },
  ];
});
