<template lang="pug">
  ui-layout(node-tree-bar use="core-layout-default" v-bind="$attrs" #default)
    ui-flex(v-if="deviceRoles && gateways")
      ui-cell(:basis="1")
        content-header(headline="Herzlich Willkommen")
          template(v-if="user" #description)
            | {{ user.name }}
      ui-cell(:basis="1")
        summary-panel(
          v-if="gateways"
          key="gateways"
          :state="[deviceTotalCount - devicesWithWarningCount - devicesWithAlertCount, devicesWithWarningCount, devicesWithAlertCount]"
          :colors="['#66cd05', '#f5a623', '#fe004f']"
        )
          | Status Sensoren
      ui-cell(:basis="1")
        core-property-map-panel(
          :property-nodes="propertyNodes"
          @property-click="pushNodeLocation($event)"
        )
      ui-cell(:basis="1")
        ui-tab-bar(v-model="activeFilter")
          ui-tab-button(v-for="[value, label] of filterValues" :key="value" :value="value")
            | {{ label }}
      ui-cell(:basis="1")
        ui-cross-fade-transition
          template(v-if="overview || filteredDevices.length > 0")
            ui-grid-list(:min-column-width="240" :row-height="320")
              template(v-if="overview")
                device-role-panel(
                  v-for="item of deviceRoleData()"
                  :key="item.role.name"
                  :headline="item.role.label"
                  :total-count="item.aggregation.devices.length"
                  :online-count="item.onlineCount"
                  :background-image="item.backgroundImage"
                )
              template(v-else-if="filteredDevices.length > 0")
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
import { Component, Mixins } from 'vue-property-decorator';
import ContentHeader from '@/components/header/ContentHeader.global.vue';
import SummaryPanel from '@/components/summary-panel/SummaryPanel.vue';
import DeviceRolePanel from '@/components/device-role-panel/DeviceRolePanel.vue';
import { User } from '@/features/core/auth';
import DeviceRoleMapMixin from '@/features/core/components/mixins/device-role-map';
import NodeLocationGeneratorMixin from '@/features/core/components/mixins/node-location-generator';
import UrlDeviceRoleFilterMixin, { FilterValue } from '@/features/core/components/mixins/url-device-role-filter';
import { DeviceRole } from '@/features/core/model';
import { RootState } from '@/features/core/store';
import { AlertSeverity, GatewayState } from '@/types/iot-portal';
import { ApolloQueryResult } from 'apollo-client';
import moment, { MomentInput } from 'moment';
import { AppManagerViewQuery, AppManagerViewQueryVariables } from './__generated__/AppManagerViewQuery';
import query from './app-manager-view.gql';

type DeviceRoleAggregation = AppManagerViewQuery['deviceRoles'][number];
type Device = DeviceRoleAggregation['devices'][number];

interface DeviceRoleDataItem {
  aggregation: DeviceRoleAggregation;
  role: DeviceRole;
  backgroundImage: string;
  onlineCount: number;
}

const FILTER_VALUE_OVERVIEW = undefined;

@Component({
  components: { ContentHeader, SummaryPanel, DeviceRolePanel },
  apollo: {
    deviceRoles: {
      query,
      variables(): AppManagerViewQueryVariables {
        return {
          /* roles: Object.keys(this.deviceRoleMap) */
        };
      },
      pollInterval: 60000,
      manual: true,
      result(this: AppManagerView, { data }: ApolloQueryResult<AppManagerViewQuery>): void {
        this.deviceRoles = data.deviceRoles;
        this.gateways = data.gateways;
        this.propertyNodes = data.propertyNodes;
      },
    },
  },
  data() {
    return {
      deviceRoles: undefined,
      gateways: undefined,
      propertyNodes: undefined,
    };
  },
})
export default class AppManagerView extends Mixins(
  DeviceRoleMapMixin,
  NodeLocationGeneratorMixin,
  UrlDeviceRoleFilterMixin,
) {
  @RootState
  private readonly user?: User;

  private lastReportDate = moment();

  private deviceRoles!: AppManagerViewQuery['deviceRoles'];
  private gateways!: AppManagerViewQuery['gateways'];
  private propertyNodes!: AppManagerViewQuery['propertyNodes'];

  private get overview(): boolean {
    return this.activeFilter === FILTER_VALUE_OVERVIEW;
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

  private get deviceTotalCount(): number {
    return this.deviceRoles.reduce((count, { deviceCount }) => count + deviceCount, 0);
  }

  private get devicesWithWarningCount(): number {
    return this.deviceRoles.reduce(
      (count, aggregation) =>
        count +
        aggregation.devices.filter(({ alerts }) => {
          return alerts.severity === AlertSeverity.WARNING;
        }).length,
      0,
    );
  }

  private get devicesWithAlertCount(): number {
    return this.deviceRoles.reduce(
      (count, aggregation) =>
        count +
        aggregation.devices.filter(({ alerts }) => {
          return alerts.severity === AlertSeverity.ALERT;
        }).length,
      0,
    );
  }

  private get deviceOnlineCount(): number {
    return this.deviceRoles.reduce((count, aggregation) => count + this.deviceRoleOnlineCount(aggregation), 0);
  }

  protected get filterableDeviceRoles(): string[] {
    return this.deviceRoles.map(({ role }) => role);
  }

  protected completeFilterValues(values: FilterValue[]): FilterValue[] {
    values.unshift([FILTER_VALUE_OVERVIEW, 'Übersicht']);

    return values;
  }

  protected get filteredDevices(): Device[] {
    if (!this.activeFilter) {
      return [];
    }

    return this.deviceRoles
      .filter((deviceRole) => deviceRole.role === this.activeFilter)
      .map((deviceRole) => deviceRole.devices)
      .flat();
  }

  private deviceRoleOnlineCount(aggregation: DeviceRoleAggregation): number {
    return aggregation.devices.filter(({ bound }) => bound).length;
  }

  private deviceRoleData(): Iterable<DeviceRoleDataItem> {
    if (!this.deviceRoles) {
      return [];
    }

    return this.deviceRoles
      .map((aggregation) => {
        const role = this.deviceRoleMap[aggregation.role];
        const { lg, md } = role.icons;

        return {
          aggregation,
          role,
          backgroundImage: lg || md,
          onlineCount: this.deviceRoleOnlineCount(aggregation),
        };
      })
      .sort((a, b) => a.role.label.localeCompare(b.role.label));
  }
}
</script>
