<template lang="pug">
  p.hint
    slot
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class StepHint extends Vue {}
</script>

<style lang="scss" scoped>
.hint {
  color: colorVodafone(black);
  font-size: fontSize(fs-base);
  margin: 0 0 30px 0;
}
</style>
