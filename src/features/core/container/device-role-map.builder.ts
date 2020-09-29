import { provide } from '@/util/container';
import { groupBy, mapValues } from 'lodash';
import { DEVICE_ROLES, DEVICE_ROLE_MAP } from '.';

export default provide(DEVICE_ROLE_MAP, async (get) => {
  const roles = await get(DEVICE_ROLES);

  return mapValues(groupBy(roles, 'name'), (roles) => Object.assign({}, ...roles));
});
