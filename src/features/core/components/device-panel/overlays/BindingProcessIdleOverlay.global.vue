<template lang="pug">
  device-panel-overlay-layout(:device="device")
    template(#center)
      | Die Verbindung zum Sensor konnte nicht hergestellt werden.
    template(#bottom)
      flat-button(color="BLUE" fixed-width @click="$emit('startBindingProcess', device.id)")
       | Erneut versuchen
      flat-button(color="RED" fixed-width @click="$emit('remove', device.id)")
       | Gerät entfernen
</template>

<script lang="ts">
import FlatButton from '@/components/clickables/FlatButton.global.vue';
import { Component, Mixins } from 'vue-property-decorator';
import DevicePanelOverlayLayout from './DevicePanelOverlayLayout.vue';
import DevicePanelDataMixin from '../../mixins/device-panel-data';

@Component({
  components: {
    DevicePanelOverlayLayout,
    FlatButton,
  },
})
export default class BindingProcessIdleOverlay extends Mixins(DevicePanelDataMixin) {}
</script>
