<template lang="pug">
  ui-layout(use="core-layout-default" node-tree-bar #default)
    ui-flex
      ui-cell(:basis="1")
        ui-content-header(headline="WoWi LAN")
      //- ui-cell(:basis="1")
      //-   p TBD: Mini FAQ
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AppWifi extends Vue {}
</script>
