import { option } from '@/util/container';
import { MANUFACTURERS } from '..';

export default option(MANUFACTURERS, async () => ({
  name: 'SMART_ME',
  label: 'smart-me',
}));
