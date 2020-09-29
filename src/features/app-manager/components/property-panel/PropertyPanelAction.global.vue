<template lang="pug">
  .property-panel-action
    ui-clickable
      slot
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class PropertyPanelAction extends Vue {}
</script>
