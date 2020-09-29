<template lang="pug">
  .smoke-detector-protocol-panel
    .header
      .title
        | Wohnungen
      .export
        vue-json-csv(:data="compileExportData(apartments)" :name="generateExportFilename(apartments)")
          ui-button
            img.arrow(src="./export.svg" alt="Export")
            | CSV
    .sub-header
      span Sensoren
      .buttons
        .apartment
          span Wohnungen
        .export
          span Export
    .body
      slot
        span.no-device
          | Keine Rauchwarnmelder gefunden
</template>

<script lang="ts">
import { ArrayProp } from '@/util/prop-decorators';
import { Component, Mixins } from 'vue-property-decorator';
import VueJsonCsv from 'vue-json-csv';
import { AppSmokeDetectorProtocolFragment } from './__generated__/AppSmokeDetectorProtocolFragment';
import { ExportMixin } from './export';

@Component({ components: { VueJsonCsv } })
export default class ProtocolPanel extends Mixins(ExportMixin) {
  @ArrayProp(true)
  private readonly apartments!: AppSmokeDetectorProtocolFragment['apartments'];
}
</script>

<style lang="scss" scoped>
.smoke-detector-protocol-panel {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 35px 30px 20px 30px;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.13);
  border-radius: 4px;
  background-color: colorVodafone(white);
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  padding: 0 15px 0 0;
}
.arrow {
  width: 9px;
  height: 7px;
  margin-right: 6px;
  margin-bottom: 1px;
}
.title {
  width: 100%;
  height: 22px;
  color: colorVodafone(black);
  font-size: fontSize(fs-base);
  line-height: lineHeight(lh-100);
  padding: 0 10px 0 10px;
  box-sizing: border-box;
}
.sub-header {
  display: flex;
  justify-content: space-between;
  font-size: fontSize(fs-base);
  line-height: lineHeight(lh-100);
  padding: 0 15px 0 15px;
  box-sizing: border-box;
}
.buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 245px;
}
.apartment {
  width: 160px;
  text-align: center;
}
.export {
  width: 70px;
  text-align: center;
}
.body {
  text-align: center;
}
.body > div {
  padding: 0;
}
.no-device {
  margin-top: 5px;
  text-align: center;
}
</style>
