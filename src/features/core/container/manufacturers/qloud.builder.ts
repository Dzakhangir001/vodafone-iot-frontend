import image from '@/assets/images/manufacturers/qloud.png';
import { option } from '@/util/container';
import { MANUFACTURERS } from '..';

export default option(MANUFACTURERS, async () => ({
  name: 'QLOUD',
  label: 'Q-Loud',
  image,
}));
