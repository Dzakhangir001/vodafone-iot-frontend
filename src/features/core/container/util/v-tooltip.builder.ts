import { configure } from '@/util/container';
import { VUE } from '..';
import VPopover from 'v-tooltip';

export default configure(async (get) => void (await get(VUE)).use(VPopover));
