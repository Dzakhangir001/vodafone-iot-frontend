import { configure } from '@/util/container';
import registerHover from '@/util/hover';
import { VUE } from '..';

export default configure(async (get) => void registerHover(await get(VUE)));
