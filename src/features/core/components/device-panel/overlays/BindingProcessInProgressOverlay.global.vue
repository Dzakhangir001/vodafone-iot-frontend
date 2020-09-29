<template lang="pug">
  device-panel-overlay-layout(v-bind="$attrs")
    template(#center)
      spinner
    template(#bottom)
      | Die Verbindung zwischen Gateway und Sensor wird hergestellt. Der Verbindungsaufbau kann einige Zeit in Anspruch nehmen.
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DevicePanelOverlayLayout from './DevicePanelOverlayLayout.vue';
import Spinner from '@/components/clickables/Spinner.vue';

@Component({
  components: {
    DevicePanelOverlayLayout,
    Spinner,
  },
  inheritAttrs: false,
})
export default class BindingProcessInProgressOverlay extends Vue {}
</script>
