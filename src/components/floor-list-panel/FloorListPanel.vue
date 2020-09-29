<template>
  <div class="wrapper">
    <h4 class="title">Wählen Sie ein Stockwerk aus:</h4>
    <div class="list-wrapper">
      <div class="subtitle-box">
        <h5 class="subtitle">IoT Gateways</h5>
        <h5 class="subtitle">Alarme</h5>
      </div>

      <div class="list-box">
        <ul class="list">
          <slot />
        </ul>
        <building :floors-amount="floorsAmount" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { NumberProp } from '@/util/prop-decorators';
import Building from '@/components/floor-list-panel/Building.vue';

@Component({ components: { Building } })
export default class FloorListPanel extends Vue {
  @NumberProp()
  private floorsAmount!: number;
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  width: 100%;
  background: white;
  padding: 15px;
  box-sizing: border-box;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.13);
  border-radius: 4px;

  * {
    box-sizing: border-box;
  }
  .list-wrapper {
    .subtitle-box {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .subtitle {
        width: 100px;
        color: #9b9b9b;
        font-size: fontSize(fs-base);
        line-height: lineHeight(lh-100);
        margin: 5px 0;

        &:first-child {
          margin-left: 10px;
        }

        &:last-child {
          margin-left: 55px;
        }
      }
    }
    .list-box {
      display: flex;
      .list {
        width: 100%;
        padding: 0;
        margin: 0;
      }
      .building-icon-wrapper /deep/ {
        width: 205px;
        position: absolute;
        top: 24px;
        right: 0;

        .building-icon-content {
          width: 270px;
          margin: -10px 0 0 24px;
          background: white;
          padding: 30px 30px 23px 26px;
        }
      }
    }
  }
  .title {
    color: #000000;
    font-size: fontSize(fs-base);
    line-height: lineHeight(lh-100);
    margin: 15px 0;
  }
}
</style>
