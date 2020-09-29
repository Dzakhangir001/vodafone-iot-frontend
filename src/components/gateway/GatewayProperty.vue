<template lang="pug">
  tr.item
    th.label
      slot(name="label")
        | {{ label }}
    td.value
      slot
</template>

<script lang="ts">
import { StringProp } from '@/util/prop-decorators';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class GatewayProperty extends Vue {
  @StringProp()
  public label?: string;
}
</script>

<style lang="scss" scoped>
.item {
  font-size: fontSize(fs-base);
  line-height: lineHeight(lh-50);
}
.label {
  padding: 0;
  text-align: right;
}
.value {
  box-sizing: border-box;
  padding: 0 0 0 5px;
  word-break: break-all;
  color: colorVodafone(grey);
}
</style>
