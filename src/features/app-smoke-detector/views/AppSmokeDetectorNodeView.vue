<template lang="pug">
  ui-layout(use="core-layout-default" node-tree-bar #default)
    ui-flex(v-if="data")
      ui-cell(:basis="1")
        core-node-content-header-adapter(:data="data" #breadcrumb)
          ui-breadcrumb-item(:to="{ name: 'AppSmokeDetector' }")
            | Rauchwarnmelder
          | {{ ' ' }}
      ui-cell(:basis="1")
        ui-tab-bar(v-model="activeTab")
          ui-tab-button(:value="undefined")
            | Status
          ui-tab-button(value="protocol")
            | Protokoll
          ui-tab-button(value="files")
            | Dateien
          ui-tab-button(value="data")
            | Daten
      ui-cell(:basis="1")
        ui-cross-fade-transition
          app-smoke-detector-state-list(v-if="activeTab === undefined")
            app-smoke-detector-state-list-item(v-for="apartment of data.apartments" :key="apartment.id" :apartment="apartment")
          app-smoke-detector-protocol-panel(v-else-if="activeTab === 'protocol'" :apartments="data.apartments")
            app-smoke-detector-protocol-item(
              v-for="apartment of data.apartments"
              :key="apartment.id"
              :apartment="apartment"
              @apartment-click="pushAppNodeLocation('MANAGER', $event)"
            )
          app-smoke-detector-files-panel(
            v-else-if="activeTab === 'files'"
            :files="files"
            :current-page.sync="currentPage"
          )
          app-smoke-detector-data-panel(
            v-else-if="activeTab === 'data'"
            :node-id="nodeId"
          )
</template>

<script lang="ts">
import UrlTabMixin from '@/features/core/components/mixins/url-tab';
import NodeIdMixin from '@/features/core/components/mixins/node-id';
import NodeLocationGeneratorMixin from '@/features/core/components/mixins/node-location-generator';
import { Component, Mixins } from 'vue-property-decorator';
import {
  AppSmokeDetectorNodeViewQuery,
  AppSmokeDetectorNodeViewQueryVariables,
} from './__generated__/AppSmokeDetectorNodeViewQuery';
import query from './app-smoke-detector-node-view.gql';
import { ApolloQueryResult } from 'apollo-client';

const TAKE = 30;

@Component({
  apollo: {
    data: {
      query,
      variables(): AppSmokeDetectorNodeViewQueryVariables {
        return {
          nodeId: this.nodeId,
          skip: TAKE * (this.currentPage - 1),
          take: TAKE,
        };
      },
      manual: true,
      result(this: AppSmokeDetectorNodeView, { data }: ApolloQueryResult<AppSmokeDetectorNodeViewQuery>): void {
        this.data = data.data;
        this.files = data.files;
      },
    },
  },
  data() {
    return {
      data: undefined,
      files: undefined,
    };
  },
})
export default class AppSmokeDetectorNodeView extends Mixins(NodeIdMixin, UrlTabMixin, NodeLocationGeneratorMixin) {
  private data!: AppSmokeDetectorNodeViewQuery['data'];
  private files!: AppSmokeDetectorNodeViewQuery['files'];

  protected tabs = ['protocol', 'files', 'data'];

  private currentPage = 1;
}
</script>
