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
export default class SensorProperty extends Vue {
  @StringProp()
  public label?: string;
}
</script>

<style lang="scss" scoped>
.item {
  font-size: fontSize(fs-base);
  line-height: lineHeight(lh-50);
  overflow-wrap: break-word;
}
.label {
  padding: 0;
  width: 45%;
  text-align: right;
}
.value {
  box-sizing: border-box;
  width: 62%;
  padding: 0 0 0 5px;
  color: colorVodafone(grey);
}
</style>
