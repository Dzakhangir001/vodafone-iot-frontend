<template>
  <gateway :class="status" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { EnumProp } from '@/util/prop-decorators';
import Gateway from '@/components/floor-list-panel/icons/gateway.svg?vue';

@Component({ components: { Gateway } })
export default class GatewayItem extends Vue {
  @EnumProp(true, 'RED', 'GREEN')
  private status!: string;
}
</script>

<style lang="scss" scoped>
.gateway-icon {
  margin: 5px 0;
}
.gateway-icon:not(:last-of-type) {
  margin-right: 15px;
}
.RED {
  .gateway-icon-path {
    stroke: #e60000;
  }
}
</style>
