<template lang="pug">
  ui-flex(v-if="node && wifis")
    ui-cell(:basis="1")
      core-node-content-header-adapter(:data="node" #breadcrumb)
        ui-breadcrumb-item(:to="{ name: 'AppWifi' }")
          | WoWi LAN
    ui-cell(:basis="1")
      ui-grid-list(:min-column-width="240" :row-height="320")
        app-wifi-wifi-panel-control(
          v-for="wifi of wifis"
          :key="wifi.id"
          :wifi="wifi"
          details-link
          fill-height
          @wifi-configuration-changed="$apollo.queries.data.refetch()"
        )
</template>

<script lang="ts">
import NodeIdMixin from '@core/components/mixins/node-id';
import { ApolloQueryResult } from 'apollo-client';
import { Component, Mixins } from 'vue-property-decorator';
import { AppWifiOverviewQuery, AppWifiOverviewQueryVariables } from './__generated__/AppWifiOverviewQuery';
import query from './overview.gql';

@Component({
  apollo: {
    data: {
      query,
      variables(this: Overview): AppWifiOverviewQueryVariables {
        return { id: this.nodeId };
      },
      manual: true,
      result(this: Overview, { data }: ApolloQueryResult<AppWifiOverviewQuery>): void {
        this.node = data.node;
        this.wifis = data.wifis;
      },
    },
  },
  data() {
    return { node: undefined, wifis: undefined };
  },
})
export default class Overview extends Mixins(NodeIdMixin) {
  private node?: AppWifiOverviewQuery['node'];
  private wifis?: AppWifiOverviewQuery['wifis'];
}
</script>
