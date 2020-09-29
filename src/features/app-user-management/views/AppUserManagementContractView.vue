<template lang="pug">
  ui-layout(use="core-layout-default" #default)
    ui-flex(v-if="contract")
      ui-cell(:basis="1")
        ui-content-header(:headline="contract.externalId" back-link @back-click="$router.go(-1)")
          ui-breadcrumb-item(:to="{ name: 'AppUserManagementView' }")
            | Verwaltung
          | {{ ' ' }}
          ui-breadcrumb-item(:to="{ name: 'AppUserManagementView/CustomerPanelControl' }")
            | Kunden
          | {{ ' ' }}
          ui-breadcrumb-item(:to="{ name: 'AppUserManagementCustomerView', params: { customerId: contract.customer.id } }")
            | {{ contract.customer.name }}
          | {{ ' ' }}
          ui-breadcrumb-item(:to="{ name: 'AppUserManagementView/ContractPanelControl' }")
            | Verträge
      ui-cell(v-if="!$store.state.production" :basis="1")
        ui-panel
          pre
            | {{ contract }}
</template>

<script lang="ts">
import { StringProp } from '@/util/prop-decorators';
import { Component, Vue } from 'vue-property-decorator';
import {
  AppUserManagmentContractViewQuery,
  AppUserManagmentContractViewQueryVariables,
} from './__generated__/AppUserManagmentContractViewQuery';
import query from './app-user-managment-contract-view.gql';

@Component({
  apollo: {
    contract: {
      query,
      fetchPolicy: 'no-cache',
      variables(this: AppUserManagementContractView): AppUserManagmentContractViewQueryVariables {
        return { id: this.contractId };
      },
    },
  },
  data() {
    return { contract: undefined };
  },
})
export default class AppUserManagementContractView extends Vue {
  @StringProp()
  private readonly contractId!: string;

  private contract?: AppUserManagmentContractViewQuery['contract'];
}
</script>
