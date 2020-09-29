import AppSmokeDetectorView from '@/features/app-smoke-detector/views/AppSmokeDetectorView.vue';
import AppSmokeDetectorNodeView from '@/features/app-smoke-detector/views/AppSmokeDetectorNodeView.vue';
import { ROUTES } from '@/features/core/container';
import { Route } from 'vue-router';
import { option } from '@/util/container';
import { APP_SMOKE_DETECTOR } from './app.builder';

export default option(ROUTES, async () => {
  return [
    {
      path: '/smoke-detector',
      name: 'AppSmokeDetector',
      component: AppSmokeDetectorView,
      meta: { app: APP_SMOKE_DETECTOR, authRequired: true },
    },
    {
      path: '/smoke-detector/:nodeId/:tab?',
      name: 'AppSmokeDetectorNode',
      component: AppSmokeDetectorNodeView,
      props: true,
      meta: {
        app: APP_SMOKE_DETECTOR,
        authRequired: true,
        key: (route: Route): string => {
          return `${route.name}_${route.params.nodeId}`;
        },
      },
    },
  ];
});
