import VueRouter from 'vue-router';
import { Authenticator } from '../auth';

export function setupLoginRedirect(router: VueRouter, auth: Authenticator): void {
  router.beforeEach(async (to, from, next) => {
    if (to.name === 'Login') {
      return next();
    }

    const authRequired = to.matched.some((route) => route.meta && route.meta.authRequired);

    if (!authRequired) {
      return next();
    }

    if (await auth.isAuthenticated()) {
      return next();
    }

    const query = to.path === '/' ? undefined : { r: to.fullPath };
    next({ name: 'Login', query, replace: true });
  });
}
