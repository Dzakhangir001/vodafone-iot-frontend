<template lang="pug">
  .info-item
    .label
      | {{ label }}
    .value
      | {{ value }}
</template>

<script lang="ts">
import { StringProp } from '@/util/prop-decorators';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class InfoItem extends Vue {
  @StringProp()
  private readonly label!: string;

  @StringProp()
  private readonly value!: string;
}
</script>

<style lang="scss" scoped>
.info-item {
  margin-top: 10px;
  padding: 0 5px 0 5px;
  min-width: 110px;
}
.label {
  color: colorVodafone(vodafone-red);
  font-size: 12px;
  line-height: lineHeight(lh-reset);
}
.value {
  color: colorVodafone(grey);
  font-size: fontSize(fs-100);
  line-height: lineHeight(lh-reset);
}
</style>
