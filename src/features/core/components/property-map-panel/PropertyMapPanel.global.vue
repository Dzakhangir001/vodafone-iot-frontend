<template lang="pug">
  ui-map-panel(:height="350")
    ui-map-overlay(
      v-for="node of propertyNodes"
      v-if="node.meta.propertyLocation"
      :key="node.id"
      :position="[node.meta.propertyLocation.longitude, node.meta.propertyLocation.latitude]"
    )
      ui-tooltip(:hide-delay="0")
        template(#default)
          ui-clickable(@click="$emit('property-click', node)")
            property-marker(:class="node.alerts.severity")
        template(#content)
          | {{ node.name }}
</template>

<script lang="ts">
import { ArrayProp } from '@/util/prop-decorators';
import { Component, Vue } from 'vue-property-decorator';
import { PropertyMapPanelFragment } from './__generated__/PropertyMapPanelFragment';
import PropertyMarker from './property-marker.svg?vue';

@Component({ components: { PropertyMarker } })
export default class PropertyMapPanel extends Vue {
  @ArrayProp(() => [])
  private propertyNodes!: PropertyMapPanelFragment['propertyNodes'];
}
</script>

<style lang="scss" scoped>
.WARNING .icon {
  fill: colorVodafone(fresh-orange);
}
.ALERT .icon {
  fill: colorVodafone(vodafone-red);
}
</style>
