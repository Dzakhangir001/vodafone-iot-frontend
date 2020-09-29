import { provide } from '@/util/container';
import { groupBy, mapValues } from 'lodash';
import { APPS, APP_MAP } from '.';

export default provide(APP_MAP, async (get) => {
  const apps = await get(APPS);

  return mapValues(groupBy(apps, 'name'), (roles) => Object.assign({}, ...roles));
});
