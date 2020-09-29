<template>
  <li class="alarm-item">
    <img src="@/components/floor-list-panel/icons/alarm.svg" alt="alarm" />
    <p class="alarm-text">{{ name }}</p>
  </li>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { StringProp } from '@/util/prop-decorators';

@Component
export default class AlarmItem extends Vue {
  @StringProp()
  private name!: string;
}
</script>

<style lang="scss" scoped>
.alarm-item {
  display: flex;
  align-items: center;
  &:not(:first-child) {
    padding-left: 20px;
  }
  &.hide {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }
}

.alarm-text {
  color: colorVodafone(vodafone-red);
  font-size: 11px;
  line-height: 11px;
  text-transform: uppercase;
  margin: 0;
  margin-left: 10px;
  width: 34px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
