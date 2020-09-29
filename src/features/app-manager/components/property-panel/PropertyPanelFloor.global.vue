<template lang="pug">
  .property-panel-floor
    ui-flex(items="stretch" root)
      ui-cell(:max="200")
        ui-flex(center root).floor-button-container
          ui-cell(:basis="0")
            ui-button(:icon="triangleIcon" fixed-width @click="$emit('click')")
              | {{ name }}
      ui-cell(:basis="0")
        ui-flex
          slot(name="left")
      ui-cell(v-if="$scopedSlots['right']" :basis="0" :max="200").right-column
        ui-flex
          slot(name="right")
</template>

<script lang="ts">
import triangleIcon from '@/assets/images/triangle.svg';
import { StringProp } from '@/util/prop-decorators';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class PropertyPanelFloor extends Vue {
  @StringProp(true)
  private name!: string;

  private triangleIcon = triangleIcon;
}
</script>

<style lang="scss" scoped>
.property-panel-floor:not(:first-child) {
  border-top: 1px solid #ccc7cc;
}
.right-column {
  background-color: #f7f7f7;
}
.floor-button-container {
  height: 100%;
}
</style>
