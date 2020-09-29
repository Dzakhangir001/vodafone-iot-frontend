import { provide } from '@/util/container';
import { groupBy, mapValues } from 'lodash';
import { MANUFACTURERS, MANUFACTURER_MAP } from '.';

export default provide(MANUFACTURER_MAP, async (get) => {
  const manufacturers = await get(MANUFACTURERS);

  return mapValues(groupBy(manufacturers, 'name'), (manufacturer) => Object.assign({}, ...manufacturer));
});
