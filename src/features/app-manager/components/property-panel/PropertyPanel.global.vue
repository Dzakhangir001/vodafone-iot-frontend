<template lang="pug">
  ui-panel
    ui-grid-list.summaries(:min-column-width="140" :gap="16")
      slot(name="INDICATORS")
    .floors.roof
      slot(name="ROOF")
    .floors.overground
      slot(name="OVERGROUND")
    .floors.underground(v-if="$scopedSlots['UNDERGROUND']")
      slot(name="UNDERGROUND")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class PropertyPanel extends Vue {}
</script>

<style lang="scss" scoped>
.summaries {
  margin-bottom: 32px;
}
.floors {
  position: relative;
  margin: 0 16px 23px;
  min-height: 100px;
}
.floors:not(.roof) {
  border-left: 1px solid #ccc7cc;
  border-right: 1px solid #ccc7cc;
}
.floors::before,
.floors::after {
  content: '';
  display: block;
  position: absolute;
  bottom: -12px;
  left: -8px;
  right: -8px;
  height: 10px;
  border: 1px solid #ccc7cc;
}
.floors::after {
  bottom: -23px;
}
.roof {
  background: url(./roof.svg) right 10px bottom -1px no-repeat;
  padding-right: 325px;
}
.roof::before,
.overground::after {
  left: -16px;
  right: -16px;
}
.underground::after {
  display: none;
}
</style>
