import image from '@/assets/images/manufacturers/sontex.png';
import { option } from '@/util/container';
import { MANUFACTURERS } from '..';

export default option(MANUFACTURERS, async () => ({
  name: 'SONTEX',
  label: 'Sontex',
  image,
}));
