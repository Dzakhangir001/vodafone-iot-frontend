<template lang="pug">
  component(
    v-if="data"
    :is="tooltip ? iotGatewayTooltip : iotGatewayPanel"
    :total-count="data.devices.length"
    :online-count="onlineCount"
    :icon-color="stateColor"
  )
    template(v-if="tooltip" #trigger)
      slot
    template(#default)
      gateway-property(label="ID") {{ data.serial }}
      gateway-property(v-if="data.firmware" label="Firmware") {{ data.firmware }}
      gateway-property(v-if="data.bootDate" label="Gestartet")
        ui-relative-time(:date="data.bootDate")
</template>

<script lang="ts">
import GatewayProperty from '@/components/gateway/GatewayProperty.vue';
import IotGatewayPanel from '@/components/gateway/iot-gateway/IotGatewayPanel.vue';
import IotGatewayTooltip from '@/components/gateway/iot-gateway/IotGatewayTooltip.vue';
import { ObjectProp, BooleanProp } from '@/util/prop-decorators';
import { GatewayState } from '@/types/iot-portal';
import { Component, Vue } from 'vue-property-decorator';
import { IotGatewaysFragment } from './__generated__/IotGatewaysFragment';

@Component({ components: { GatewayProperty } })
export default class IotGatewayAdapter extends Vue {
  @ObjectProp(true)
  private readonly data!: IotGatewaysFragment['iotGateways'][number];

  @BooleanProp()
  private readonly tooltip!: boolean;

  private readonly iotGatewayPanel = IotGatewayPanel;
  private readonly iotGatewayTooltip = IotGatewayTooltip;

  private get stateColor(): string {
    if (!this.data || this.data.state === GatewayState.UNKNOWN) {
      return 'GRAY';
    }

    return this.data.state === GatewayState.ONLINE ? 'GREEN' : 'RED';
  }

  private get onlineCount(): number {
    return this.data.devices.filter(({ bound }) => bound).length;
  }
}
</script>
