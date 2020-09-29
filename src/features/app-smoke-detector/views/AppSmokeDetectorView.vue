<template lang="pug">
  ui-layout(use="core-layout-default" node-tree-bar #default)
    ui-flex
      ui-cell(:basis="1")
        content-header(headline="Rauchwarnmelder")
      //- ui-cell(:basis="1")
      //-   p TBD: Mini FAQ
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ContentHeader from '@/components/header/ContentHeader.global.vue';

@Component({ components: { ContentHeader } })
export default class AppSmokeDetectorView extends Vue {}
</script>
