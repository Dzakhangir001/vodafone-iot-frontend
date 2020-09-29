import { ROUTES } from '@/features/core/container';
import { option } from '@/util/container';
import { Route } from 'vue-router';
import AppManagerView from '../views/AppManagerView.vue';
import NodeView from '../views/NodeView.vue';
import { APP_MANAGER } from './app.builder';

export default option(ROUTES, async () => {
  return [
    {
      path:
        '/manager/:nodeId([0-9a-fA-F]{8}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{12})/:filter?',
      name: 'Node',
      component: NodeView,
      props: true,
      meta: {
        app: APP_MANAGER,
        authRequired: true,
        key: (route: Route): string => {
          return `${route.name}_${route.params.nodeId}`;
        },
      },
    },
    {
      path: '/manager/:filter?',
      name: 'AppManager',
      component: AppManagerView,
      props: true,
      meta: {
        app: APP_MANAGER,
        authRequired: true,
        key: (route: Route): string => {
          return `${route.name}`;
        },
      },
    },
  ];
});
