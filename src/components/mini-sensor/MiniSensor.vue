<template lang="pug">
  .mini-sensor(:class="border")
    img.image(:src="icon")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { EnumProp, StringProp } from '@/util/prop-decorators';

@Component
export default class MiniSensor extends Vue {
  @EnumProp('NONE', 'RED', 'GREEN')
  public border!: 'NONE' | 'RED' | 'GREEN';
  @StringProp(true)
  public icon!: string;
}
</script>

<style lang="scss" scoped>
.mini-sensor {
  display: flex;
  box-sizing: border-box;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.22);
  border-radius: 6px;
  border: 2px solid transparent;
  padding: 6px;
  width: 40px;
  height: 40px;
  background-color: colorVodafone(white);
  cursor: pointer;
}
.mini-sensor.RED {
  border: 2px solid colorVodafone(vodafone-red);
}
.mini-sensor.GREEN {
  border: 2px solid colorVodafone(digital-green);
}
.mini-sensor:hover {
  border: 2px solid colorVodafone(aqua-blue);
}
.image {
  display: block;
  margin: auto;
  max-width: 100%;
  max-height: 100%;
}
</style>
