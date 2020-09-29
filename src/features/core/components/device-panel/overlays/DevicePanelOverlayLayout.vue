<template lang="pug">
  .overlay-wrapper
    .top
      overlay-property(v-if="device.meta.serial" label="Seriennummer")
        | {{ device.meta.serial }}
      overlay-property(v-if="device.meta.manufacturer" label="Hersteller")
        | {{ manufacturerLabel }}
      overlay-property(v-if="device.meta.protocol" label="Protokoll")
        | {{ device.meta.protocol }}
    .center
      slot(name="center")
    .bottom
      slot(name="bottom")
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import DevicePanelDataMixin from '../../mixins/device-panel-data';
import ManufacturerMapMixin from '../../mixins/manufacturer-map';
import OverlayProperty from './OverlayProperty.vue';

@Component({
  components: {
    OverlayProperty,
  },
})
export default class DevicePanelOverlayLayout extends Mixins(DevicePanelDataMixin, ManufacturerMapMixin) {
  private get manufacturerLabel(): string | undefined {
    const manufacturer = this.device.meta.manufacturer;
    const manufacturerEntry = this.manufacturerMap[manufacturer || ''];

    return manufacturerEntry ? manufacturerEntry.label : manufacturer || undefined;
  }
}
</script>

<style lang="scss" scoped>
.overlay-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  justify-content: space-between;
  padding: 40px 16px 40px 16px;
  font-size: fontSize(fs-base);
  line-height: 20px;
  font-weight: 600;
  text-align: center;
  color: colorVodafone(white);
}
.top {
  flex: 1;
  width: 100%;
}
.center {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  width: 100%;
}
.bottom {
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
}
</style>
