<template lang="pug">
  ui-tooltip
    template(#default)
      slot(name="trigger")
    template(#content)
      iot-gateway-content(v-bind="$attrs" compact)
        slot
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import IotGatewayContent from './IotGatewayContent.vue';

@Component({
  components: { IotGatewayContent },
  inheritAttrs: false,
})
export default class IotGatewayTooltip extends Vue {}
</script>
