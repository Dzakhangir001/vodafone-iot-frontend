<template lang="pug">
  app-manager-apartment-node-content(:node-id="nodeId" :filter="filter")
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import FilterPropMixin from '@core/components/mixins/filter-prop';
import NodeIdMixin from '@core/components/mixins/node-id';

@Component
export default class RoomNodeContent extends Mixins(NodeIdMixin, FilterPropMixin) {}
</script>
