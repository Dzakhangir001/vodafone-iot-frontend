import registerClickOutside from '@/util/click-outside';
import { configure } from '@/util/container';
import { VUE } from '..';

export default configure(async (get) => void registerClickOutside(await get(VUE)));
