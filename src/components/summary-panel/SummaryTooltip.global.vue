<template lang="pug">
  ui-tooltip
    template(#default)
      slot(name="trigger")
    template(#content)
      summary-content(v-bind="$attrs" :min-width="200")
        slot
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SummaryContent from './SummaryContent.vue';

@Component({
  components: { SummaryContent },
  inheritAttrs: false,
})
export default class SummaryTooltip extends Vue {}
</script>
