import AppWifi from '@/features/app-wifi/views/AppWifi.vue';
import AppWifiNodeView from '@/features/app-wifi/views/AppWifiNodeView.vue';
import { ROUTES } from '@/features/core/container';
import { option } from '@/util/container';
import { APP_WIFI } from './app.builder';

export default option(ROUTES, async () => {
  return [
    {
      path: '/wifi',
      name: 'AppWifi',
      component: AppWifi,
      meta: { app: APP_WIFI, authRequired: true },
    },
    {
      path: '/wifi/:nodeId',
      name: 'AppWifiNodeView',
      component: AppWifiNodeView,
      props: true,
      meta: { app: APP_WIFI, authRequired: true },
    },
  ];
});
