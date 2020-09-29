<template lang="pug">
  .image(v-if="status === 'NONE'")
  connection.image(v-else :class="status")
</template>

<script lang="ts">
import { ConnectionStatus, ConnectionStatusProp } from '@/components/sensor/prop-decorators';
import { Component, Vue } from 'vue-property-decorator';
import Connection from './images/connection.svg?vue';

@Component({ components: { Connection } })
export default class SensorConnectionStatus extends Vue {
  @ConnectionStatusProp(true)
  public status!: ConnectionStatus;
}
</script>

<style lang="scss" scoped>
.image {
  width: 17px;
  height: 12px;
  margin-right: 3px;
}
.GREEN .icon {
  fill: colorVodafone(digital-green);
}
.RED .icon {
  fill: colorVodafone(vodafone-red);
}
</style>
