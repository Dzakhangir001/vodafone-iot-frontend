<template lang="pug">
  p.label(:class="{ error }")
    slot
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { BooleanProp } from '@/util/prop-decorators';

@Component
export default class StepLabel extends Vue {
  @BooleanProp()
  private error!: boolean;
}
</script>

<style lang="scss" scoped>
.label {
  margin: 0 0 25px 0;
  color: colorVodafone(black);
  font-size: fontSize(fs-base);

  line-height: lineHeight(lh-reset);
}
.label.error {
  color: colorVodafone(maroon);
}
</style>
