import { Component, Mixins } from 'vue-property-decorator';
import { DEVICE_ROLE_MAP } from '../../container';
import { DeviceRole } from '../../model';
import ContainerMixin from './container';

@Component
export default class DeviceRoleMapMixin extends Mixins(ContainerMixin) {
  protected get deviceRoleMap(): Record<string, DeviceRole> {
    return this.container(DEVICE_ROLE_MAP);
  }
}
