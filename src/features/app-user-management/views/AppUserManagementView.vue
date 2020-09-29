<template lang="pug">
  ui-layout(use="core-layout-default" #default)
    ui-flex
      ui-cell(:basis="1")
        ui-content-header(headline="Verwaltung")
      ui-cell(:basis="1")
        ui-tab-bar(:value="$route.name" @update="$router.push({ name: $event })")
          ui-tab-button(value="AppUserManagementView/UserPanelControl")
            | Benutzer
          ui-tab-button(value="AppUserManagementView/CustomerPanelControl")
            | Kunden
          ui-tab-button(value="AppUserManagementView/ContractPanelControl")
            | Verträge
      ui-cell(:basis="1")
        ui-cross-fade-transition
          router-view
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AppUserManagementView extends Vue {}
</script>
