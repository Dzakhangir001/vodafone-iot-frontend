<template lang="pug">
  .overlay-property
    .left
      | {{ label }}:
    .right
      slot
</template>

<script lang="ts">
import { StringProp } from '@/util/prop-decorators';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class OverlayProperty extends Vue {
  @StringProp(true)
  label!: string;
}
</script>

<style lang="scss" scoped>
.overlay-property {
  width: 100%;
  height: 20px;
  font-size: fontSize(fs-base);
  line-height: lineHeight(lh-50);
  letter-spacing: 0;
  display: flex;
}
.left {
  width: 50%;
  text-align: right;
}
.right {
  width: 50%;
  text-align: left;
  padding-left: 7px;
  box-sizing: border-box;
}
</style>
