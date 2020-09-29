<template lang="pug">
  .wrapper(
    :class="{ danger, background, alarm }"
    :style="backgroundImageStyle"
    v-click-outside="onOutsideClick"
    @click="onInsideClick"
  )
    .background-container(v-if="!backgroundStyle && backgroundImage && !properties")
      component(:is="backgroundImage" class="state icon" :class="backgroundImageClass")
    .header
      ui-clickable.headline-wrapper(@click="dropdown = !dropdown")
        h3.headline {{ headline }}
        arrow-down.arrow-down
      sensor-battery-status.state(:status="batteryStatus")
    p.description {{ description }}
    .content(v-hover="{ leaveDelay: 300 }" @hover="properties = $event.detail.state")
      table.properties(v-if="properties")
        slot(name="properties")
      slot(v-else name="content")
    .footer
      slot(name="footer")
    .backdrop(v-if="dropdown && !overlay")
      nav.dropdown
        ul.actions(@click="dropdown = false")
          slot(name="actions")
    .overlay(v-if="overlay")
      slot(name="overlay")
</template>

<script lang="ts">
import { BooleanProp, OptionalProp, StringProp } from '@/util/prop-decorators';
import {
  ConnectionStatus,
  ConnectionStatusProp,
  BatteryStatus,
  BatteryStatusProp,
} from '@/components/sensor/prop-decorators';
import { Component, Vue } from 'vue-property-decorator';
import ArrowDown from './images/arrow-down.svg?vue';
import SensorBatteryStatus from './SensorBatteryStatus.vue';
import { Component as ComponentType } from 'vue';
import { isString } from '@/util/lang';

@Component({
  components: {
    ArrowDown,
    SensorBatteryStatus,
  },
})
export default class DevicePanel extends Vue {
  @ConnectionStatusProp('NONE')
  public connectionStatus!: ConnectionStatus;

  @BatteryStatusProp('NONE')
  public batteryStatus!: BatteryStatus;

  @BooleanProp()
  public alarm!: boolean;

  @BooleanProp()
  public danger!: boolean;

  @StringProp(true)
  public headline!: string;

  @StringProp()
  public description?: string;

  @StringProp()
  public backgroundImageClass?: string;

  @OptionalProp()
  public backgroundImage?: string | ComponentType;

  @BooleanProp()
  public overlay!: boolean;

  public dropdown = false;

  public properties = false;

  public get background(): boolean {
    return this.backgroundImage !== undefined;
  }

  public get backgroundStyle(): boolean {
    return isString(this.backgroundImage);
  }

  public get backgroundImageStyle(): string | undefined {
    return this.properties || !isString(this.backgroundImage)
      ? undefined
      : `background-image: url(${this.backgroundImage});`;
  }

  public onOutsideClick(event: Event): void {
    if (!this.dropdown) {
      return;
    }

    this.dropdown = false;

    event.stopImmediatePropagation();
    event.preventDefault();
  }

  public onInsideClick(event: Event): void {
    var element = event.target as HTMLElement;
    if (element.className === 'backdrop') {
      this.dropdown = false;
    }
  }
}
</script>

<style lang="scss" scoped>
/* panel */

.wrapper {
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
  background: center no-repeat white;
  color: colorVodafone(black);
}
.background::before {
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
.alarm::before {
  background-image: radial-gradient(
      circle,
      transparent 45px,
      rgba(255, 5, 0, 0.03) 67px,
      rgba(255, 5, 0, 0.8) 67px,
      rgba(255, 5, 0, 0.8) 69px,
      transparent 69px
    ),
    radial-gradient(
      circle,
      transparent 108px,
      rgba(0, 0, 0, 0.008) 108px,
      rgba(0, 0, 0, 0.008) 110px,
      transparent 110px
    );
}
.danger::after {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 4px;
  border: 2px solid colorVodafone(vodafone-red);
  pointer-events: none;
}
.background-container {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* header */

.header {
  padding: 0 16px;
  display: flex;
  align-items: baseline;
  position: relative;
  z-index: 1;
}
.state {
  font-size: fontSize(fs-50);
  flex: 0 0 auto;
}
.headline-wrapper {
  flex: 1 0 0;
  padding: 20px 10px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.headline {
  flex: 0 1 auto;
  margin: 0;
  @include textOverflow();
  font-size: fontSize(fs-150);
  line-height: lineHeight(lh-50);
  font-weight: 400;
}
.arrow-down {
  flex: 0 0 auto;
  vertical-align: middle;
  margin-left: 4px;
}

/* description */

.description {
  flex: 0 0 auto;
  margin: 0;
  padding: 0 16px;
  @include textOverflow();
  color: colorVodafone(black);
  text-align: center;
  font-size: fontSize(fs-base);
  line-height: lineHeight(lh-50);
}

/* content */

.content {
  flex: 1 0 0;
  z-index: 1;
}
.properties {
  box-sizing: border-box;
  display: table;
  width: 100%;
  padding: 16px;
  overflow: hidden;
  table-layout: fixed;
}

/* footer */

.footer {
  flex: 0 0 auto;
  z-index: 0;
}

/* dropdown */

.backdrop {
  position: absolute;
  top: 48px;
  left: 0;
  bottom: 0;
  right: 0;
  border-radius: 0 0 4px 4px;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 10;
}
.dropdown {
  padding: 0 16px 16px;
  display: flex;
  justify-content: center;
  background-color: white;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.12);
}
.actions {
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10;
}
.state .icon {
  stroke: colorVodafone(digital-green);
}

.state.error .icon {
  stroke: colorVodafone(vodafone-red);
}
</style>
