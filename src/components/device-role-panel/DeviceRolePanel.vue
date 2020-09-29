<template lang="pug">
  .device-role-panel-wrapper(
    :style="backgroundImageStyle"
  )
    .header
      | {{ headline }}
    .footer
      div
        span.online {{ onlineCount }}
        span.slash /
        span.offline {{ totalCount - onlineCount }}
      .total {{ totalCount }} Sensoren
</template>

<script lang="ts">
import { NumberProp, StringProp } from '@/util/prop-decorators';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class DeviceRolePanel extends Vue {
  @StringProp(true)
  private readonly headline!: string;
  @StringProp(true)
  private readonly backgroundImage!: string;
  @NumberProp(true)
  private readonly totalCount!: number;
  @NumberProp(true)
  private readonly onlineCount!: number;

  private get backgroundImageStyle(): string {
    return `background-image: url(${this.backgroundImage});`;
  }
}
</script>

<style lang="scss" scoped>
.device-role-panel-wrapper {
  position: relative;
  width: 100%;
  min-width: 120px;
  max-width: 480px;
  height: 100%;
  min-height: 160px;
  max-height: 640px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.13);
  background: center no-repeat colorVodafone(white);
  color: colorVodafone(black);
}
.device-role-panel-wrapper::before {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: radial-gradient(
      circle,
      transparent 45px,
      rgba(0, 0, 0, 0.004) 67px,
      rgba(0, 0, 0, 0.02) 67px,
      rgba(0, 0, 0, 0.02) 69px,
      transparent 69px
    ),
    radial-gradient(
      circle,
      transparent 108px,
      rgba(0, 0, 0, 0.008) 108px,
      rgba(0, 0, 0, 0.008) 110px,
      transparent 110px
    );
  background-position: center, center;
  background-repeat: no-repeat, no-repeat;
  pointer-events: none;
}
.header {
  text-align: center;
  color: #333333;
  font-size: fontSize(fs-150);
  line-height: lineHeight(lh-xxl);
  font-weight: 600px;
  margin-top: 15px;
}
.online {
  color: colorVodafone(digital-green);
  font-size: fontSize(fs-200);
  line-height: lineHeight(lh-xxl);
}
.slash {
  color: colorVodafone(light);
  font-size: fontSize(fs-200);
  line-height: lineHeight(lh-xxl);
}
.offline {
  color: colorVodafone(vodafone-red);
  font-size: fontSize(fs-200);
  line-height: lineHeight(lh-xxl);
}
.total {
  color: #333333;
  font-size: fontSize(fs-base);

  line-height: lineHeight(lh-xxl);
  margin-top: -15px;
}
.footer {
  text-align: center;
  margin-top: 200px;
}
</style>
