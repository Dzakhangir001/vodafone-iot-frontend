<template lang="pug">
  li.smoke-detector-protocol-item
    .sensors
      mini-sensor(v-for="device of apartment.devices" :key="device.id" :icon="smoke" :border="resolveBorder(device)")
    .buttons
      ui-button(fixed-width :icon="triangle" @click="$emit('apartment-click', apartment)")
        | {{ apartment.name }}
      vue-json-csv(:data="compileExportData([apartment])" :name="generateExportFilename([apartment])")
        ui-button
          img.arrow(src="./export.svg" alt="Export")
          | CSV
</template>

<script lang="ts">
import smoke from '@/assets/images/mini-sensors/smoke.svg';
import triangle from '@/assets/images/triangle.svg';
import MiniSensor from '@/components/mini-sensor/MiniSensor.vue';
import { ObjectProp } from '@/util/prop-decorators';
import { Component, Mixins } from 'vue-property-decorator';
import VueJsonCsv from 'vue-json-csv';
import { resolveAggregatedMetricsState } from '../../util/metrics';
import { AppSmokeDetectorProtocolFragment } from './__generated__/AppSmokeDetectorProtocolFragment';
import { ExportMixin } from './export';

@Component({ components: { MiniSensor, VueJsonCsv } })
export default class ProtocolItem extends Mixins(ExportMixin) {
  @ObjectProp(true)
  private readonly apartment!: AppSmokeDetectorProtocolFragment['apartments'][number];

  private readonly triangle = triangle;
  private readonly smoke = smoke;

  private resolveBorder(device: AppSmokeDetectorProtocolFragment['apartments'][number]['devices'][number]): string {
    return resolveAggregatedMetricsState(device) === 'RED' ? 'RED' : 'NONE';
  }
}
</script>

<style lang="scss" scoped>
.smoke-detector-protocol-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 6px 15px 6px 15px;
  box-sizing: border-box;
  &:nth-child(odd) {
    background-color: colorVodafone(lighter);
  }
}
.sensors {
  display: flex;
  flex-wrap: wrap;
}
// TODO Get rid of star selector
.sensors > * {
  margin: 4px;
}
.buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 245px;
}
.arrow {
  width: 9px;
  height: 7px;
  margin-right: 6px;
  margin-bottom: 1px;
}
</style>
