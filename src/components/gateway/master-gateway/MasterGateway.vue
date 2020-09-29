<template lang="pug">
  .wrapper
    master-gateway-icon.image(:class="iconColor")
    .content
      .label
        | Master Gateway
      table.properties
        slot
</template>

<script lang="ts">
import { EnumProp } from '@/util/prop-decorators';
import { Component, Vue } from 'vue-property-decorator';
import MasterGatewayIcon from './master-gateway.svg?vue';

@Component({ components: { MasterGatewayIcon } })
export default class MasterGateway extends Vue {
  @EnumProp('GRAY', 'GREEN', 'RED')
  private readonly iconColor!: 'GRAY' | 'GREEN' | 'RED';
}
</script>

<style lang="scss" scoped>
.wrapper {
  box-sizing: border-box;
  border-radius: 4px;
  padding: 16px;
  width: 100%;
  min-width: 250px;
  max-width: 1000px;
  height: 100%;
  min-height: 60px;
  max-height: 240px;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.13);
  background: center no-repeat white;
  color: colorVodafone(black);
}
.image {
  flex: 0 0 auto;
  margin-left: 16px;
}
.content {
  display: flex;
  flex: 0 1 auto;
  flex-wrap: wrap;
  margin-left: 16px;
  align-items: center;
  justify-content: space-between;
}
.label {
  flex: 0 0 auto;
  width: 8rem;
  font-size: fontSize(fs-150);
  margin: 3px 16px 3px 0;
}
.properties {
  flex: 0 1 auto;
  overflow: hidden;
  margin: 3px 0 3px 0;
  font-weight: 400;
}
.GREEN .icon {
  stroke: colorVodafone(digital-green);
}
.RED .icon {
  stroke: colorVodafone(vodafone-red);
}
</style>
