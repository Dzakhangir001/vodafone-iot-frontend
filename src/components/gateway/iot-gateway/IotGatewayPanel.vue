<template lang="pug">
  ui-panel(:stretch="$attrs.stretch" :min-width="250" :max-width="1000" :min-height="60" :max-height="240")
    iot-gateway-content(v-bind="$attrs")
      slot
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import IotGatewayContent from './IotGatewayContent.vue';

@Component({
  components: { IotGatewayContent },
  inheritAttrs: false,
})
export default class IotGatewayPanel extends Vue {}
</script>
