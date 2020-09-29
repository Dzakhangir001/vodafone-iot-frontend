<template lang="pug">
  .indicator-container
    .state(v-if="state" :class="{ [state]: true }")
      | {{ state }}
</template>

<script lang="ts">
import { StringProp } from '@/util/prop-decorators';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class OccupancyIndicator extends Vue {
  @StringProp()
  private readonly state?: string;
}
</script>

<style lang="scss" scoped>
.indicator-container {
  display: flex;
  border-radius: 10px;
  padding: 3px;
  width: 150px;
  height: 24px;
  background-color: #c5c5c5;
  user-select: none;
}
.state {
  border: 1px solid white;
  border-radius: 8px;
  padding: 6px;
  width: 60px;
  font-size: 10px;
  line-height: 10px;
  color: #fff;
  transition: background-color 0.3s, margin-left 0.3s;
  font-size: fontSize(fs-50);
}
.VACANT {
  background-color: colorVodafone(digital-green);
  margin-left: 50%;
}
.OCCUPIED {
  background-color: colorVodafone(vodafone-red);
  margin-left: 0;
}
</style>
