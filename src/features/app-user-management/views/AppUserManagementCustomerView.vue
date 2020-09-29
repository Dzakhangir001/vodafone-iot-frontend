<template lang="pug">
  ui-layout(use="core-layout-default" #default)
    ui-flex(v-if="customer")
      ui-cell(:basis="1")
        ui-content-header(:headline="customer.name" back-link @back-click="$router.go(-1)")
          ui-breadcrumb-item(:to="{ name: 'AppUserManagementView' }")
            | Verwaltung
          | {{ ' ' }}
          ui-breadcrumb-item(:to="{ name: 'AppUserManagementView/CustomerPanelControl' }")
            | Kunden
      ui-cell(:basis="1")
        ui-panel
          ui-flex
            ui-cell(:basis="1")
              ui-panel-header(title="Verträge")
                app-user-management-add-contract-wizard-control(
                  #default="{ show }"
                  :initial-form-data="{ customerId: customer.id }"
                  @contract-added="$router.push({ name: 'AppUserManagementContractView', params: { contractId: $event } })"
                )
                  ui-button(front :icon="plusIcon" @click="show")
                    | Vertrag anlegen
            ui-cell(:basis="1")
              app-user-management-contract-table(:contracts="customer.contracts.items")
      ui-cell(v-if="!$store.state.production" :basis="1")
        ui-panel
          pre
            | {{ customer }}
</template>

<script lang="ts">
import plusIcon from '@/features/ui/assets/icons/plus.svg';
import { StringProp } from '@/util/prop-decorators';
import { Component, Vue } from 'vue-property-decorator';
import {
  AppUserManagmentCustomerViewQuery,
  AppUserManagmentCustomerViewQueryVariables,
} from './__generated__/AppUserManagmentCustomerViewQuery';
import query from './app-user-managment-customer-view.gql';

@Component({
  apollo: {
    customer: {
      query,
      fetchPolicy: 'no-cache',
      variables(): AppUserManagmentCustomerViewQueryVariables {
        return { id: this.customerId };
      },
    },
  },
  data() {
    return { customer: undefined };
  },
})
export default class AppUserManagementCustomerView extends Vue {
  @StringProp()
  private readonly customerId!: string;

  private customer?: AppUserManagmentCustomerViewQuery['customer'];

  private readonly plusIcon = plusIcon;
}
</script>
