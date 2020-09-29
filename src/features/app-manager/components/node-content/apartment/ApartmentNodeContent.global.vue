<template lang="pug">
  ui-flex(v-if="data")
    ui-cell(:basis="1")
      core-node-content-header-adapter(:data="data")
    ui-cell(:basis="1")
      ui-grid-list(:min-column-width="360")
        app-manager-master-gateway-adapter(key="master" :data="data.masterGateway")
        app-manager-iot-gateway-adapter(v-for="gateway of data.iotGateways" :key="gateway.id" :data="gateway" stretch)
    ui-cell(:basis="1")
      ui-flex
        ui-cell
          ui-tab-bar(v-model="activeFilter")
            ui-tab-button(v-for="[value, label] of filterValues" :key="value" :value="value")
              | {{ label }}
        ui-cell(:grow="0" style="margin-left: auto;")
          ui-panel(stretch)
            ui-flex(items="center" stretch)
              ui-cell
                app-manager-binding-wizard-modal-control(
                  :data="data"
                  @added="$apollo.queries.data.refetch()"
                )
    ui-cell(:basis="1")
      ui-cross-fade-transition
        floor-plan-panel(v-if="floorPlan" name="")
          floor-plan-room(v-for="{ room, devices } of floorPlanRoomData()" :key="room.id" :name="room.name")
            mini-sensor(v-for="device of devices" :key="device.id" v-bind="device")
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
import FloorPlanPanel from '@/components/floor-plan-panel/FloorPlanPanel.vue';
import FloorPlanRoom from '@/components/floor-plan-panel/FloorPlanRoom.vue';
import MiniSensor from '@/components/mini-sensor/MiniSensor.vue';
import DeviceRoleMapMixin from '@core/components/mixins/device-role-map';
import NodeIdMixin from '@core/components/mixins/node-id';
import NodeLocationGeneratorMixin from '@core/components/mixins/node-location-generator';
import UrlDeviceRoleFilterMixin, { FilterValue } from '@core/components/mixins/url-device-role-filter';
import { Component, Mixins } from 'vue-property-decorator';
import {
  ApartmentNodeContentQuery,
  ApartmentNodeContentQueryVariables,
} from './__generated__/ApartmentNodeContentQuery';
import query from './apartment-node-content.gql';

type Room = Exclude<ApartmentNodeContentQuery['data']['context'], null>['rooms'][number];
type Device = Room['devices'][number];

interface FloorPlanRoomData {
  room: Room;
  devices: IterableIterator<FloorPlanRoomDeviceItemData>;
}

interface FloorPlanRoomDeviceItemData {
  key: Device['id'];
  icon: string;
  border: string;
}

// See UN-124: Floor Plan is temperarily disabled,
// so we use FILTER_VALUE_ALL as default
// const FILTER_VALUE_FLOOR_PLAN = undefined;
// const FILTER_VALUE_ALL = 'ALL';
const FILTER_VALUE_FLOOR_PLAN = 'UNUSED';
const FILTER_VALUE_ALL = undefined;

@Component({
  components: { FloorPlanPanel, FloorPlanRoom, MiniSensor },
  apollo: {
    data: {
      query,
      variables(): ApartmentNodeContentQueryVariables {
        return { nodeId: this.nodeId };
      },
    },
  },
  data() {
    return { data: undefined };
  },
})
export default class ApartmentNodeContent extends Mixins(
  DeviceRoleMapMixin,
  NodeIdMixin,
  NodeLocationGeneratorMixin,
  UrlDeviceRoleFilterMixin,
) {
  private readonly data!: ApartmentNodeContentQuery['data'];

  private get rooms(): Room[] {
    const { context } = this.data;

    return context ? context.rooms : [];
  }

  protected get devices(): Device[] {
    return this.rooms.map(({ devices }) => devices).flat();
  }

  private get floorPlan(): boolean {
    return this.activeFilter === FILTER_VALUE_FLOOR_PLAN;
  }

  protected completeFilterValues(values: FilterValue[]): FilterValue[] {
    if (values.length === 1) {
      values.length = 0;
    }

    values.unshift([FILTER_VALUE_ALL, 'Alle Sensoren']);

    // See UN-124: Floor Plan is temperarily disabled
    // values.unshift([FILTER_VALUE_FLOOR_PLAN, 'Wohnungsansicht']);

    return values;
  }

  private *floorPlanRoomData(): IterableIterator<FloorPlanRoomData> {
    for (const room of this.rooms) {
      yield { room, devices: this.floorPlanRoomDeviceItemData(room.devices) };
    }
  }

  private *floorPlanRoomDeviceItemData(devices: Device[]): IterableIterator<FloorPlanRoomDeviceItemData> {
    for (const device of devices) {
      const { sm, md } = this.deviceRoleMap[device.role].icons;

      yield { key: device.id, icon: sm || md, border: 'NONE' };
    }
  }
}
</script>

<style lang="scss" scoped>
.empty {
  padding: 10px;
  text-align: center;
}
</style>
