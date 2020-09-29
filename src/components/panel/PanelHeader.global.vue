<template lang="pug">
  ui-flex(items="baseline")
    ui-cell
      h3.title
        slot(name="title")
          | {{ title }}
    ui-cell(:grow="0" push-right)
      slot
</template>

<script lang="ts">
import { StringProp } from '@/util/prop-decorators';
import { Component, Vue } from 'vue-property-decorator';
import UiCell from '../layout/Cell.global.vue';
import UiFlex from '../layout/Flex.global.vue';

@Component({ components: { UiFlex, UiCell } })
export default class PanelHeader extends Vue {
  @StringProp()
  private readonly title?: string;
}
</script>

<style lang="scss" scoped>
.title {
  margin: 0;
}
</style>
