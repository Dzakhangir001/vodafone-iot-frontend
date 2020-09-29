import { get } from 'lodash';
import VueRouter from 'vue-router';
import { Authenticator } from '../auth';
import { App } from '../model';
import { RootStore } from '../store';

export function setupAllowedAppChecker(router: VueRouter, auth: Authenticator, store: RootStore): void {
  router.beforeEach(async (to, from, next) => {
    await auth.isAuthenticated(); // wait for ongoing authentification to finish

    const app = get(to, 'meta.app');
    if (app === undefined) {
      return next();
    }

    const allowedAppMap = store.getters.allowedAppMap as Record<string, App>;
    if (allowedAppMap[app]) {
      return next();
    }

    next(from.name === 'Login' ? '/' : from.fullPath);
  });
}
