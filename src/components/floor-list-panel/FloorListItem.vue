<template lang="pug">
  li.item-wrapper
    .gateway
      slot(name="gateways")
    .alarm-box
      ul.alarm-list
        slot(name="alarms")
    .floor-name-btn
      ui-summary-tooltip(
        :total-count="totalCount"
        :online-count="onlineCount"
      )
        template(#trigger)
            ui-button(:icon="triangle" fixed-width @click="$emit('buttonClick', $event)")
              | {{ floorName }}
        template(#default)
          | {{ floorName }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { StringProp, NumberProp } from '@/util/prop-decorators';
import Button from '@/components/clickables/Button.global.vue';
import triangle from '@/assets/images/triangle.svg';

@Component({ components: { 'ui-button': Button }, inheritAttrs: false })
export default class FloorListItem extends Vue {
  @StringProp()
  private floorName!: string;

  @NumberProp()
  private onlineCount!: number;

  @NumberProp()
  private totalCount!: number;

  private triangle = triangle;
}
</script>

<style lang="scss" scoped>
.item-wrapper {
  list-style: none;
  padding: 10px 150px 10px 30px;
  display: flex;
  align-items: center;
  box-sizing: border-box;

  &:nth-of-type(odd) {
    background-color: colorVodafone(lighter);
  }

  .gateway {
    line-height: lineHeight(lh-reset);
    min-width: 130px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .alarm-box {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    padding-left: 10px;
    overflow: hidden;
    .alarm-list {
      display: flex;
      align-items: center;
      padding: 0;
    }
  }
  .floor-name-btn {
    z-index: 1;
  }
}
</style>
