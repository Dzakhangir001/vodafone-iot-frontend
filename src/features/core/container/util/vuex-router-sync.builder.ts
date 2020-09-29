import { sync } from 'vuex-router-sync';
import { configure } from '@/util/container';
import { STORE, ROUTER } from '..';

export default configure(async (get) => void sync(await get(STORE), await get(ROUTER)));
