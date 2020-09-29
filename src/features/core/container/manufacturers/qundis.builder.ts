import image from '@/assets/images/manufacturers/qundis.png';
import { option } from '@/util/container';
import { MANUFACTURERS } from '..';

export default option(MANUFACTURERS, async () => ({
  name: 'QUNDIS',
  label: 'Qundis',
  image,
}));
