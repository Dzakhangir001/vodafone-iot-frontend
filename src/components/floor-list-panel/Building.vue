<template>
  <div class="building-icon-wrapper">
    <img src="@/components/floor-list-panel/icons/building-wrapper.svg" alt="wrapper" />
    <div class="building-icon-content">
      <ul class="building-icon-list">
        <li v-for="(floor, i) in floorsAmount" :key="i">
          <div class="window-group">
            <div class="small-window">
              <img src="@/components/floor-list-panel/icons/building-small-window.svg" alt="small" />
            </div>
            <div class="small-window">
              <img src="@/components/floor-list-panel/icons/building-small-window.svg" alt="small" />
            </div>
          </div>
          <div v-if="floor % 2" class="middle-window">
            <img src="@/components/floor-list-panel/icons/building-middle-window.svg" alt="middle" />
          </div>
          <div class="window-group">
            <div class="small-window">
              <img src="@/components/floor-list-panel/icons/building-small-window.svg" alt="small" />
            </div>
            <div class="small-window">
              <img src="@/components/floor-list-panel/icons/building-small-window.svg" alt="small" />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { BooleanProp, NumberProp } from '@/util/prop-decorators';

@Component
export default class Building extends Vue {
  @NumberProp(false)
  private floorsAmount!: number;

  @BooleanProp(false)
  private middleWindow?: boolean;
}
</script>

<style lang="scss" scoped>
.building-icon-wrapper {
  width: 320px;
  overflow: hidden;
}
.building-icon-content {
  width: 286px;
  margin: -10px auto 0;
  border-bottom: 1px solid #cccccc;
  border-left: 1px solid #cccccc;
  border-right: 1px solid #cccccc;
  padding: 30px;
  box-sizing: border-box;
}

.building-icon-list::v-deep {
  padding: 0;
  list-style: none;
  margin: 0;
  li {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    position: relative;
  }
  li:first-child {
    margin-top: 16px;
  }

  li:not(:last-child) {
    margin-bottom: 19px;
  }

  .middle-window {
    position: absolute;
    bottom: 5px;
    left: 50%;
    transform: translateX(-50%);
  }

  .window-group {
    display: flex;
    align-items: flex-end;
  }
  .small-window {
    line-height: lineHeight(lh-reset);
  }

  .window-group > .small-window:first-child {
    margin-right: 15px;
  }
}
</style>
