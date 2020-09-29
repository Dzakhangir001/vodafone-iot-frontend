<template lang="pug">
  .iot-gateway-content-wrapper
    .summary
      iot-gateway-icon.image(:class="iconColor")
      .count
        span.red
          | {{ totalCount - onlineCount }}
        | /
        span.green
          | {{ onlineCount }}
      span.total
        | {{ totalCount }} Sensoren
    .content(:class="{ compact }")
      .label
        | IoT Gateway
      table.properties
        slot
</template>

<script lang="ts">
import { EnumProp, BooleanProp, NumberProp } from '@/util/prop-decorators';
import { Component, Vue } from 'vue-property-decorator';
import IotGatewayIcon from './iot-gateway.svg?vue';

@Component({ components: { IotGatewayIcon } })
export default class IotGatewayContent extends Vue {
  @EnumProp('GRAY', 'GREEN', 'RED')
  private readonly iconColor!: 'GRAY' | 'GREEN' | 'RED';
  @NumberProp(true)
  private readonly onlineCount!: number;
  @NumberProp(true)
  private readonly totalCount!: number;
  @BooleanProp()
  private readonly compact!: boolean;
}
</script>

<style lang="scss" scoped>
.iot-gateway-content-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.summary {
  flex: 0 0 auto;
}
.image {
  display: block;
  margin: 0 auto;
}
.count {
  margin: 0 auto;
  text-align: center;
  font-size: fontSize(fs-200);
  margin-top: 5px;
  line-height: 22px;
  color: colorVodafone(lighter);
}
.red {
  color: colorVodafone(vodafone-red);
}
.green {
  color: colorVodafone(digital-green);
}
.total {
  display: block;
  margin: 0 auto;
  font-size: fontSize(fs-base);

  line-height: 13px;
}
.content {
  display: flex;
  flex: 0 1 auto;
  flex-wrap: wrap;
  margin-left: 16px;
  align-items: center;
  justify-content: space-between;
}
.compact {
  display: block;
}
.label {
  flex: 0 0 auto;
  width: 8rem;
  font-size: fontSize(fs-150);
  margin: 3px 16px 3px 0;
  font-weight: 400;
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
