<template lang="pug">
  ui-flex(v-if="data")
    ui-cell(:basis="1")
      core-node-content-header-adapter(:data="data")
    ui-cell(:basis="1")
      ui-grid-list(:min-column-width="360")
        app-manager-master-gateway-adapter(key="master" :data="data.masterGateway")
        summary-panel(
          v-if="gateways"
          key="gateways"
          :state="[deviceTotalCount - devicesWithWarningCount - devicesWithAlertCount, devicesWithWarningCount, devicesWithAlertCount]"
          :colors="['#66cd05', '#f5a623', '#fe004f']"
        )
          | Status Sensoren
    ui-cell(:basis="1")
      ui-tab-bar(v-model="activeFilter")
        ui-tab-button(value="PROPERTY_PANEL")
          | Gebäude
        ui-tab-button(value="ALERT_PANEL")
          | Alarme &amp; Warnungen {{ data.alerts.items.length > 0 ? `(${data.alerts.items.length})` : '' }}
        ui-tab-button(value="AGGREGATED_METRICS")
          | Zusammenfassung
    ui-cell(:basis="1")
      ui-cross-fade-transition
        .property-panel(v-if="activeFilter === 'PROPERTY_PANEL'")
          app-manager-property-panel
            template(#INDICATORS)
              app-manager-property-panel-floor-summary(
                v-for="floor in data.floors"
                :key="floor.id"
                :state="floor.alerts.count > 0 ? 'RED' : 'GREEN'"
                @click="scrollToFloor(floor)"
              )
                | {{ floor.name }}
            template(v-for="(floors, type) in floorsByType" #[type])
              app-manager-property-panel-floor(
                v-for="floor of floors"
                :ref="floor.id"
                :key="floor.id"
                :name="floor.name"
                @click="pushNodeLocation(floor)"
              )
                template(#left)
                  app-manager-property-panel-device-summary(
                    v-for="apartment of type === 'ROOF' ? floor.apartments.concat(floor.rooms) : floor.apartments"
                    :key="apartment.id"
                    :label="apartment.name"
                    :state="apartment.alerts.count ? 'RED' : 'GREEN'"
                  )
                    template(#devices)
                      app-manager-property-panel-device(
                        v-for="group of groupDevicesByRole(apartment.devices)"
                        :key="group.role.name"
                        :icon="group.role.icons.sm || group.role.icons.md"
                        :alerted="group.alerted"
                        @click="pushNodeLocation(apartment, { filter: kebabCase(group.role.name) })"
                      )
                    template(#actions)
                      app-manager-property-panel-action Add Device
                      app-manager-property-panel-action Configure rules
                template(v-if="type !== 'ROOF'" #right)
                  app-manager-property-panel-device-summary(
                    v-for="room of floor.rooms"
                    :key="room.id"
                    :label="room.name"
                    :state="room.alerts.count ? 'RED' : 'GREEN'"
                    color="white"
                  )
                    template(#devices)
                      app-manager-property-panel-device(
                        v-for="group of groupDevicesByRole(room.devices)"
                        :key="group.role.name"
                        :icon="group.role.icons.sm || group.role.icons.md"
                        :alerted="group.alerted"
                        @click="pushNodeLocation(room, { filter: kebabCase(group.role.name) })"
                      )
                    template(#actions)
                      app-manager-property-panel-action Add Device
                      app-manager-property-panel-action Configure rules
        core-alert-panel-adapter(v-else-if="activeFilter === 'ALERT_PANEL'" :alert-collection="data.alerts")
        app-manager-aggregated-metrics-control(v-else-if="activeFilter === 'AGGREGATED_METRICS'" :node-id="nodeId")
</template>

<script lang="ts">
import SummaryPanel from '@/components/summary-panel/SummaryPanel.vue';
import DeviceRoleMapMixin from '@/features/core/components/mixins/device-role-map';
import NodeIdMixin from '@/features/core/components/mixins/node-id';
import NodeLocationGeneratorMixin from '@/features/core/components/mixins/node-location-generator';
import { DeviceRole } from '@/features/core/model';
import scrollToElement from '@/util/scroll-to-element';
import { GatewayState } from '@/types/iot-portal';
import { groupBy, kebabCase } from 'lodash';
import { MomentInput } from 'moment';
import { Component, Mixins } from 'vue-property-decorator';
import PropertyPanelFloor from '../../property-panel/PropertyPanelFloor.global.vue';
import { PropertyNodeContentFloorChildrenFragment } from './__generated__/PropertyNodeContentFloorChildrenFragment';
import { PropertyNodeContentQuery, PropertyNodeContentQueryVariables } from './__generated__/PropertyNodeContentQuery';
import query from './property-node-content.gql';
import { AlertSeverity } from '../../../../../types/iot-portal';

type Floor = PropertyNodeContentQuery['data']['floors'][number];
type Device = PropertyNodeContentFloorChildrenFragment['devices'][number];

interface DeviceRoleGroup {
  role: DeviceRole;
  devices: Device[];
  alerted: boolean;
}

@Component({
  components: { SummaryPanel },
  apollo: {
    data: {
      query,
      variables(): PropertyNodeContentQueryVariables {
        return { nodeId: this.nodeId };
      },
    },
  },
  data() {
    return { data: undefined };
  },
})
export default class PropertyNodeContent extends Mixins(NodeIdMixin, NodeLocationGeneratorMixin, DeviceRoleMapMixin) {
  private readonly data!: PropertyNodeContentQuery['data'];

  public $refs!: Record<string, PropertyPanelFloor[]>;

  private activeFilter = 'PROPERTY_PANEL';

  private kebabCase = kebabCase;

  protected get devices(): Floor['devices'] {
    return this.data.floors.map(({ devices }) => devices).flat();
  }

  private get deviceTotalCount(): number {
    return this.devices.length;
  }

  private get devicesWithWarningCount(): number {
    return this.devices.filter(({ alerts }) => {
      return alerts.severity === AlertSeverity.WARNING;
    }).length;
  }

  private get devicesWithAlertCount(): number {
    return this.devices.filter(({ alerts }) => {
      return alerts.severity === AlertSeverity.ALERT;
    }).length;
  }

  private get gateways(): PropertyNodeContentQuery['data']['gateways'] {
    return this.data ? this.data.gateways.concat(this.data.floors.map(({ iotGateways }) => iotGateways).flat()) : [];
  }

  private get gatewayOnlineCount(): number {
    return this.gateways.reduce((count, { state }) => count + Number(state === GatewayState.ONLINE), 0);
  }

  private get gatewayLastReportDate(): MomentInput | undefined {
    return this.gateways.reduce<Date | undefined>((latest, { lastReportDate }) => {
      const date = lastReportDate ? new Date(lastReportDate) : undefined;

      return !latest || (date && date > latest) ? date : latest;
    }, undefined);
  }

  private get floorsByType(): Record<string, Floor[]> {
    return groupBy(this.data.floors, ({ meta }) => meta.floorType || 'OVERGROUND');
  }

  private groupDevicesByRole(devices: Device[]): DeviceRoleGroup[] {
    return Object.entries(groupBy(devices, ({ role }) => role))
      .map(([role, devices]) => ({
        role: this.deviceRoleMap[role],
        devices,
        alerted: devices.reduce((alerted, { alerts }) => alerted || alerts.count > 0, false),
      }))
      .sort((a, b) => a.role.label.localeCompare(b.role.label));
  }

  private scrollToFloor(floor: Floor): void {
    scrollToElement(this.$refs[floor.id][0].$el, 60);
  }
}
</script>
