<template lang="pug">
  ui-flex(v-if="data")
    ui-cell(:basis="1")
      core-node-content-header-adapter(:data="data")
    ui-cell(:basis="1")
      ui-grid-list(:min-column-width="360")
        app-manager-master-gateway-adapter(key="master" :data="data.masterGateway")
        app-manager-iot-gateway-adapter(v-for="gateway of data.iotGateways" :key="gateway.id" :data="gateway" stretch)
    ui-cell(:basis="1")
      ui-tab-bar(v-model="activeFilter")
        ui-tab-button(v-for="[value, label] of filterValues" :key="value" :value="value")
          | {{ label }}
    ui-cell(:basis="1")
      ui-cross-fade-transition
        app-manager-aggregated-metrics-control(v-if="aggregatedMetrics" :node-id="nodeId")
        apartment-list-panel(v-else-if="apartmentList")
          apartment-list-item(
            v-for="{ apartment, devices } of apartmentListItemData()"
            :key="apartment.id"
            :button-label="apartment.name"
            @click="pushNodeLocation(apartment)"
          )
            ui-clickable(
              v-for="{ device, props } of devices"
              :key="device.id"
              @click="onDeviceClick(device)"
            )
              mini-sensor(v-bind="props")
        template(v-else-if="filteredDevices.length > 0")
          ui-grid-list(:min-column-width="240" :row-height="320")
            core-device-panel-control(
              v-for="device of filteredDevices"
              :key="device.id"
              :device-id="device.id"
              @disconnected="$apollo.queries.data.refetch()"
            )
        .empty(v-else-if="activeFilterLabel")
          | Keine Geräte vom Typ "{{ activeFilterLabel }}" gefunden.
        .empty(v-else)
          | Keine Geräte gefunden.
</template>

<script lang="ts">
import ApartmentListPanel from '@/components/apartment-list-panel/ApartmentListPanel.vue';
import ApartmentListItem from '@/components/apartment-list-panel/ApartmentListItem.vue';
import MiniSensor from '@/components/mini-sensor/MiniSensor.vue';
import DeviceRoleMapMixin from '@core/components/mixins/device-role-map';
import NodeIdMixin from '@core/components/mixins/node-id';
import NodeLocationGeneratorMixin from '@core/components/mixins/node-location-generator';
import UrlDeviceRoleFilterMixin, { FilterValue } from '@core/components/mixins/url-device-role-filter';
import { kebabCase } from 'lodash';
import { Component, Mixins } from 'vue-property-decorator';
import { FloorNodeContentQuery, FloorNodeContentQueryVariables } from './__generated__/FloorNodeContentQuery';
import query from './floor-node-content.gql';

type Apartment = FloorNodeContentQuery['data']['apartments'][number];
type Device = Apartment['devices'][number];

interface ApartmentListItemData {
  apartment: Apartment;
  devices: IterableIterator<ApartmentListItemDeviceItemData>;
}

interface ApartmentListItemDeviceItemData {
  device: Device;
  props: {
    icon: string;
    border: string;
  };
}

const FILTER_VALUE_APARTMENT_LIST = undefined;
const FILTER_VALUE_AGGREGATED_METRICS = 'AGGREGATED_METRICS';

@Component({
  components: { ApartmentListPanel, ApartmentListItem, MiniSensor },
  apollo: {
    data: {
      query,
      variables(): FloorNodeContentQueryVariables {
        return { nodeId: this.nodeId };
      },
    },
  },
  data() {
    return { data: undefined };
  },
})
export default class FloorNodeContent extends Mixins(
  DeviceRoleMapMixin,
  NodeIdMixin,
  NodeLocationGeneratorMixin,
  UrlDeviceRoleFilterMixin,
) {
  private readonly data!: FloorNodeContentQuery['data'];

  protected get devices(): Device[] {
    return this.data.apartments.map((apartment) => apartment.devices).flat();
  }

  private get apartmentList(): boolean {
    return this.activeFilter === FILTER_VALUE_APARTMENT_LIST;
  }

  private get aggregatedMetrics(): boolean {
    return this.activeFilter === FILTER_VALUE_AGGREGATED_METRICS;
  }

  protected completeFilterValues(values: FilterValue[]): FilterValue[] {
    values.unshift([FILTER_VALUE_AGGREGATED_METRICS, 'Zusammenfassung']);
    values.unshift([FILTER_VALUE_APARTMENT_LIST, 'Wohnungen']);

    return values;
  }

  private *apartmentListItemData(): IterableIterator<ApartmentListItemData> {
    for (const apartment of this.data.apartments) {
      yield { apartment, devices: this.apartmentListItemMiniSensorProps(apartment.devices) };
    }
  }

  private *apartmentListItemMiniSensorProps(devices: Device[]): IterableIterator<ApartmentListItemDeviceItemData> {
    for (const device of [...devices].sort((a, b) => a.role.localeCompare(b.role))) {
      const { sm, md } = this.deviceRoleMap[device.role].icons;

      yield { device, props: { icon: sm || md, border: 'NONE' } };
    }
  }

  private onDeviceClick(device: Device): void {
    if (device.site.context) {
      this.pushNodeLocation(device.site.context, { filter: kebabCase(device.role) });
    }
  }
}
</script>
