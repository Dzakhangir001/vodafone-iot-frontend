<template lang="pug">
  .room-grid-list-container
    p.name {{ name }}
    .room-grids
      slot
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { StringProp } from '@/util/prop-decorators';

@Component
export default class FloorPlanPanel extends Vue {
  @StringProp(true)
  public name!: string;
}
</script>

<style lang="scss" scoped>
.room-grid-list-container {
  box-sizing: border-box;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.13);
  border-radius: 4px;
  padding: 36px;
  width: 100%;
  background-color: colorVodafone(white);
}
.name {
  width: 100%;
  font-size: fontSize(fs-base);
  line-height: lineHeight(lh-100);
}
.room-grids {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 1px;
}
</style>
