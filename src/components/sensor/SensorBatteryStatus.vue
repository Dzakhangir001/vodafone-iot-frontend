<template lang="pug">
  .image(v-if="status === 'NONE'")
  battery.image(v-else :class="status")
</template>

<script lang="ts">
import { BatteryStatus, BatteryStatusProp } from '@/components/sensor/prop-decorators';
import { Component, Vue } from 'vue-property-decorator';
import Battery from './images/battery.svg?vue';

@Component({ components: { Battery } })
export default class SensorBatteryStatus extends Vue {
  @BatteryStatusProp(true)
  public status!: BatteryStatus;
}
</script>

<style lang="scss" scoped>
.image {
  width: 20px;
  height: 10px;
}
.GREEN .icon .fill {
  fill: colorVodafone(digital-green);
}
.GREEN .icon .stroke {
  stroke: colorVodafone(digital-green);
}
.RED .icon .fill {
  fill: colorVodafone(vodafone-red);
}
.RED .icon .stroke {
  stroke: colorVodafone(voadfone-red);
}
</style>
