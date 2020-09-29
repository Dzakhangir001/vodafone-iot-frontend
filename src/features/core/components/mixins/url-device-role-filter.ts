import { StringProp } from '@/util/prop-decorators';
import { kebabCase, snakeCase, uniq } from 'lodash';
import { Component, Mixins } from 'vue-property-decorator';
import { DeviceRole } from '../../model';
import DeviceRoleMapMixin from './device-role-map';

interface Device {
  role: string;
}

export type FilterValue = readonly [string | undefined, string];

@Component
export default class UrlDeviceRoleFilterMixin extends Mixins(DeviceRoleMapMixin) {
  @StringProp()
  protected readonly filter?: string;

  protected get devices(): Device[] {
    return [];
  }

  protected get filterableDeviceRoles(): string[] {
    return uniq(this.devices.map((device) => device.role));
  }

  protected get filterValues(): FilterValue[] {
    const values = this.filterableDeviceRoles
      .map((role) => this.deviceRoleMap[role] || { name: role, shortLabel: role })
      .sort((a, b) => a.shortLabel.localeCompare(b.shortLabel))
      .map(({ name, shortLabel }) => [name, shortLabel] as FilterValue);

    return this.completeFilterValues(values);
  }

  protected get activeFilter(): string | undefined {
    if (this.filter === undefined) {
      return undefined;
    }

    const filter = snakeCase(this.filter).toUpperCase();

    return this.filterValues.find(([value]) => value === filter) ? filter : undefined;
  }

  protected set activeFilter(value: string | undefined) {
    const activeFilter = value === undefined ? undefined : kebabCase(value);
    const { filter, ...params } = this.$route.params;

    if (filter === activeFilter) {
      return;
    }

    if (activeFilter !== undefined) {
      params.filter = activeFilter;
    }

    this.$router.push({ ...this.$route, params });
  }

  protected get activeFilterRole(): DeviceRole | undefined {
    return this.deviceRoleMap[this.activeFilter || ''];
  }

  protected get activeFilterLabel(): string | undefined {
    return this.activeFilterRole ? this.activeFilterRole.label : undefined;
  }

  protected get filteredDevices(): Device[] {
    const devices = this.devices;

    if (!this.activeFilterRole) {
      return devices;
    }

    return devices.filter(({ role }) => role === this.activeFilter);
  }

  protected completeFilterValues(values: FilterValue[]): FilterValue[] {
    return values;
  }
}
