import { Component, Mixins } from 'vue-property-decorator';
import { MANUFACTURER_MAP } from '../../container';
import { Manufacturer } from '../../model';
import ContainerMixin from './container';

@Component
export default class ManufacturerMapMixin extends Mixins(ContainerMixin) {
  protected get manufacturerMap(): Record<string, Manufacturer> {
    return this.container(MANUFACTURER_MAP);
  }
}
