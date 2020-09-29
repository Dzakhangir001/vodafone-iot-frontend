<template lang="pug">
  ui-layout(use="core-layout-default" v-bind="$attrs" #default)
    ui-flex(v-if="deviceRoles && gateways")
      ui-cell(:basis="1")
        content-header(headline="Herzlich Willkommen")
          template(v-if="user" #description)
            | {{ user.name }}
      ui-cell(:basis="0.5")
        ui-flex
          ui-cell(:basis="1")
            ui-grid-list(:min-column-width="360")
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
              @property-click="pushAppNodeLocation('MANAGER', $event)"
            )
      ui-cell(:basis="0" :min="300")
        core-news-panel-control
      ui-cell(:basis="1")
        ui-tab-bar(v-model="activeFilter")
          ui-tab-button(value="ALERTS")
            | Alarme &amp; Warnungen
          ui-tab-button(value="OBJECT")
            | Objekte
          ui-tab-button(value="GATEWAY")
            | Gateways
      ui-cell(:basis="1")
        ui-cross-fade-transition
          core-alert-panel-adapter(v-if="activeFilter === 'ALERTS'" :alert-collection="recentAlerts")
</template>

<script lang="ts">
import ContentHeader from '@/components/header/ContentHeader.global.vue';
import DeviceRolePanel from '@/components/device-role-panel/DeviceRolePanel.vue';
import SummaryPanel from '@/components/summary-panel/SummaryPanel.vue';
import DeviceRoleMapMixin from '@/features/core/components/mixins/device-role-map';
import { AlertSeverity, GatewayState } from '@/types/iot-portal';
import { ApolloQueryResult } from 'apollo-client';
import moment, { MomentInput } from 'moment';
import { Component, Mixins } from 'vue-property-decorator';
import { User } from '../auth';
import NodeLocationGeneratorMixin from '../components/mixins/node-location-generator';
import { RootState } from '../store';
import { HomeViewQuery, HomeViewQueryVariables } from './__generated__/HomeViewQuery';
import query from './home-view.gql';

type DeviceRoleAggregation = HomeViewQuery['deviceRoles'][number];

@Component({
  components: { ContentHeader, SummaryPanel, DeviceRolePanel },
  apollo: {
    deviceRoles: {
      query,
      variables(): HomeViewQueryVariables {
        return {
          /* roles: Object.keys(this.deviceRoleMap) */
        };
      },
      pollInterval: 60000,
      manual: true,
      result(this: HomeView, { data }: ApolloQueryResult<HomeViewQuery>): void {
        this.deviceRoles = data.deviceRoles;
        this.gateways = data.gateways;
        this.propertyNodes = data.propertyNodes;
        this.recentAlerts = data.recentAlerts;
      },
    },
  },
  data() {
    return {
      deviceRoles: undefined,
      gateways: undefined,
      propertyNodes: undefined,
      recentAlerts: undefined,
    };
  },
})
export default class HomeView extends Mixins(DeviceRoleMapMixin, NodeLocationGeneratorMixin) {
  @RootState
  private readonly user?: User;

  private lastReportDate = moment();

  private deviceRoles!: HomeViewQuery['deviceRoles'];
  private gateways!: HomeViewQuery['gateways'];
  private propertyNodes!: HomeViewQuery['propertyNodes'];
  private recentAlerts!: HomeViewQuery['recentAlerts'];
  private activeFilter: 'ALERTS' | 'OBJECT' | 'GATEWAY' = 'ALERTS';

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

  private deviceRoleOnlineCount(aggregation: DeviceRoleAggregation): number {
    return aggregation.devices.filter(({ bound }) => bound).length;
  }
}
</script>
