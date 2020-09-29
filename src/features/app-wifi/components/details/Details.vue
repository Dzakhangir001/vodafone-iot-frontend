<template lang="pug">
  ui-flex(v-if="node && wifi")
    ui-cell(:basis="1")
      core-node-content-header-adapter(:data="node" #breadcrumb)
        ui-breadcrumb-item(:to="{ name: 'AppWifi' }")
          | WoWi LAN
    ui-cell(:basis="200" :min="200" :max="500" :grow="1")
      app-wifi-wifi-panel-control.wifi-panel(
        :wifi="wifi"
        @wifi-configuration-changed="$apollo.queries.data.refetch()"
      )
    ui-cell(:basis="300" :min="300" :grow="4")
      ui-panel
        ui-table(
          :columns="columns"
          :data="wifi ? wifi.gateways : []"
          align="center"
          striped
        )
          template(#icon="{ row }")
            component.state(
              :is="row.gateway.masterOf.length > 0 ? 'master-gateway-icon' : 'gateway-icon'"
              :class="{ error: !row.ok }"
            )
          template(#name="{ row }")
            | {{ row.gateway.masterOf.length > 0 ? 'Master Gateway' : 'IoT Gateway' }}
            br
            span.text-light {{ row.gateway.serial.toUpperCase() }}
          template(#node="{ row }")
            | {{ row.gateway.site.name }}
</template>

<script lang="ts">
import DevicePanel from '@/components/sensor/DevicePanel.vue';
import SensorAction from '@/components/sensor/SensorAction.vue';
import UiTable from '@/components/table/Table.global.vue';
import NodeIdMixin from '@core/components/mixins/node-id';
import NodeLocationGeneratorMixin from '@core/components/mixins/node-location-generator';
import { ApolloQueryResult } from 'apollo-client';
import { Component, Mixins } from 'vue-property-decorator';
import { AppWifiDetailsQuery, AppWifiDetailsQueryVariables } from './__generated__/AppWifiDetailsQuery';
import query from './details.gql';
import GatewayIcon from '../../assets/gateway.svg?vue';
import MasterGatewayIcon from '../../assets/master-gateway.svg?vue';
import exchangeIcon from '../../assets/exchange-device.png';

@Component({
  components: {
    UiTable,
    GatewayIcon,
    MasterGatewayIcon,
    DevicePanel,
    SensorAction,
  },
  apollo: {
    data: {
      query,
      variables(this: Details): AppWifiDetailsQueryVariables {
        return { id: this.nodeId };
      },
      manual: true,
      result(this: Details, { data }: ApolloQueryResult<AppWifiDetailsQuery>): void {
        this.wifi = data.wifi;
        this.node = data.node;
      },
    },
  },
  data() {
    return { node: undefined, wifi: undefined };
  },
  inheritAttrs: false,
})
export default class Details extends Mixins(NodeIdMixin, NodeLocationGeneratorMixin) {
  private readonly columns = [
    { name: 'icon', label: 'Icon' },
    { name: 'name', label: 'Name', align: 'left' },
    { name: 'node', label: 'Node', align: 'left' },
  ];

  private wifi?: AppWifiDetailsQuery['wifi'];
  private node?: AppWifiDetailsQuery['node'];
  private readonly exchangeIcon = exchangeIcon;
  private readonly gatewayIcon = GatewayIcon;

  private changeConfiguration(): void {}
}
</script>

<style lang="scss" scoped>
.wifi-panel {
  height: 320px;
}
.text-light {
  color: colorVodafone(grey);
}
.state {
  font-size: fontSize(fs-50);
  height: 2em;
}
.state .icon {
  stroke: colorVodafone(digital-green);
}
.state.error .icon {
  stroke: colorVodafone(vodafone-red);
}
</style>
