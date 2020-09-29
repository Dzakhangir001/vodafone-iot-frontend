import { builder } from '@/util/container';
import Vuex from 'vuex';
import { APP_MAP, STORE, VUE } from '.';
import { createStore } from '../store';

export default builder(({ configure, provide }) => {
  provide(STORE, async (get) => createStore(await get(APP_MAP)));
  configure(async (get) => void (await get(VUE)).use(Vuex));
});
