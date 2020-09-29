import { builder } from '@/util/container';
import { flatten } from 'lodash';
import Router from 'vue-router';
import { AUTHENTICATOR, ROUTER, ROUTES, STORE, VUE } from '.';
import { createRouter } from '../router';
import { setupAllowedAppChecker } from '../router/allowed-app-checker';
import { setupLoginRedirect } from '../router/login-redirect';

export default builder(({ configure, provide }) => {
  provide(ROUTER, async (get) => createRouter(flatten(await get(ROUTES))));
  configure(async (get) => void (await get(VUE)).use(Router));
  configure(async (get) => void setupLoginRedirect(await get(ROUTER), await get(AUTHENTICATOR)));
  configure(async (get) => void setupAllowedAppChecker(await get(ROUTER), await get(AUTHENTICATOR), await get(STORE)));
});
