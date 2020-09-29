<template lang="pug">
  ui-panel(:stretch="$attrs.stretch" :min-width="250" :max-width="1000" :min-height="60" :max-height="240")
    summary-content(v-bind="$attrs")
      slot
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SummaryContent from './SummaryContent.vue';

@Component({
  components: { SummaryContent },
  inheritAttrs: false,
})
export default class SummaryPanel extends Vue {}
</script>
