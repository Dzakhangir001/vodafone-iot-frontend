<template lang="pug">
  device-panel-overlay-layout(v-bind="$attrs")
    template(#center)
      | Bitte betätigen Sie die Taste am Sensor um die Verbindung aufzubauen.
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DevicePanelOverlayLayout from './DevicePanelOverlayLayout.vue';

@Component({
  components: {
    DevicePanelOverlayLayout,
  },
  inheritAttrs: false,
})
export default class BindingProcessWaitingOverlay extends Vue {}
</script>
