<template lang="pug">
  device-panel-overlay-layout(v-bind="$attrs")
    template(#center)
      | Es konnten keine Daten vom Sensor empfangen werden. Bitte kontaktieren Sie den Support.
    template(#bottom)
      flat-button(color="BLUE" fixed-width)
       | Support
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DevicePanelOverlayLayout from './DevicePanelOverlayLayout.vue';
import FlatButton from '@/components/clickables/FlatButton.global.vue';

@Component({
  components: {
    DevicePanelOverlayLayout,
    FlatButton,
  },
  inheritAttrs: false,
})
export default class BindingProcessFailedOverlay extends Vue {}
</script>
