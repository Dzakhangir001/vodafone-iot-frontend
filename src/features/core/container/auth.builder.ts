import { builder } from '@/util/container';
import { API_CLIENT, AUTHENTICATOR, STORE } from '.';
import { Authenticator } from '../auth';

export default builder(({ configure, provide }) => {
  provide(AUTHENTICATOR, async (get) => {
    return new Authenticator(await get(STORE), await get(API_CLIENT), sessionStorage, localStorage);
  });
  configure(async (get) => void (await get(AUTHENTICATOR)).restoreLogin());
});
