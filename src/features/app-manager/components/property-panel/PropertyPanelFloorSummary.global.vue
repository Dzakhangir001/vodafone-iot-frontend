<template lang="pug">
  ui-clickable(@click="$emit('click')")
    ui-panel.property-panel-floor-summary
      ui-state-indicator.side(:state="state" :size="18")
      .label
        slot
      img.side(src="./arrow-down.svg")
</template>

<script lang="ts">
import StateProperty from '@/components/state-indicator/state-property-mixin';
import { Component, Mixins } from 'vue-property-decorator';

@Component
export default class PropertyPanelFloorSummary extends Mixins(StateProperty) {}
</script>

<style lang="scss" scoped>
.property-panel-floor-summary {
  display: flex;
  align-items: center;
}
.side {
  flex: 0 0 auto;
  margin-bottom: 2px;
}
.label {
  flex: 1 0 0;
  margin: 0 8px;
  @include textOverflow();
}
</style>
