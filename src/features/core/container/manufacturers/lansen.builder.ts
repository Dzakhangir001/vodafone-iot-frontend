import image from '@/assets/images/manufacturers/lansen.png';
import { option } from '@/util/container';
import { MANUFACTURERS } from '..';

export default option(MANUFACTURERS, async () => ({
  name: 'LANSEN',
  label: 'Lansen',
  image,
}));
