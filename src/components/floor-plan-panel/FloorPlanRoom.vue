<template lang="pug">
  .room-grid-container
    .mini-sensors
      p.name {{ name }}
      slot
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { StringProp } from '@/util/prop-decorators';

@Component
export default class FloorPlanRoom extends Vue {
  @StringProp(true)
  public name!: string;
}
</script>

<style lang="scss" scoped>
.room-grid-container {
  height: fit-content;
  padding: 7px 6px 7px 6px;
  outline: 1px solid #cacaca;
  background-color: colorVodafone(white);
  box-sizing: border-box;
}
.mini-sensors {
  padding: 24px 0 10px 0;
  outline: 1px solid #cacaca;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}
.mini-sensors > * {
  margin: 5px 8px 5px 8px;
}
.name {
  width: 100%;
  font-size: fontSize(fs-base);
  line-height: lineHeight(lh-100);

  text-align: center;
}
</style>
