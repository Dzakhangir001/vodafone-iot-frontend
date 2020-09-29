import { option } from '@/util/container';
import { isString } from '@/util/lang';
import { Route } from 'vue-router';
import { AUTHENTICATOR, ROUTES } from '.';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';

export default option(ROUTES, async (get) => {
  const authenticator = await get(AUTHENTICATOR);

  return [
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
      beforeEnter: async (to, from, next) => {
        if (await authenticator.isAuthenticated()) {
          const location = isString(to.query.r) ? { path: to.query.r } : { name: 'Home' };

          return next({ ...location, replace: true });
        }

        next();
      },
    },
    {
      path: '/:filter?',
      name: 'Home',
      component: HomeView,
      props: true,
      meta: {
        authRequired: true,
        key: (route: Route): string => {
          return `${route.name}`;
        },
      },
    },
    {
      path: 'https://bestellung-stage.unitymediabusiness.de/formulare/wohnungswirtschaft-iot',
      name: 'Support',
    },
  ];
});
