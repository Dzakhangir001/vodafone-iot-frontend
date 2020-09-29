<template lang="pug">
  master-gateway(v-if="data" :icon-color="stateColor")
    gateway-property(label="ID") {{ data.serial }}
    gateway-property(v-if="data.firmware" label="Firmware") {{ data.firmware }}
    gateway-property(v-if="data.bootDate" label="Gestartet")
      ui-relative-time(:date="data.bootDate")
</template>

<script lang="ts">
import GatewayProperty from '@/components/gateway/GatewayProperty.vue';
import MasterGateway from '@/components/gateway/master-gateway/MasterGateway.vue';
import { ObjectProp } from '@/util/prop-decorators';
import { GatewayState } from '@/types/iot-portal';
import { Component, Vue } from 'vue-property-decorator';
import { MasterGatewayFragment } from './__generated__/MasterGatewayFragment';

@Component({ components: { GatewayProperty, MasterGateway } })
export default class MasterGatewayAdapter extends Vue {
  @ObjectProp()
  private readonly data?: MasterGatewayFragment['masterGateway'];

  private get stateColor(): string {
    if (!this.data || this.data.state === GatewayState.UNKNOWN) {
      return 'GRAY';
    }

    return this.data.state === GatewayState.ONLINE ? 'GREEN' : 'RED';
  }
}
</script>
