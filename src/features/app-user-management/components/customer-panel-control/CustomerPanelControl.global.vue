<template lang="pug">
  ui-panel(v-if="customers")
    ui-flex
      ui-cell(:grow="0" push-right)
        app-user-management-add-customer-wizard-control(
          #default="{ show }"
          @customer-added="$router.push({ name: 'AppUserManagementCustomerView', params: { customerId: $event } })"
        )
          ui-button(front :icon="plusIcon" @click="show")
            | Kunde anlegen
    ui-table(
      :columns="columns"
      :data="customers.items"
      align="left"
      striped
    )
      template(#externalId="{ value }")
        | {{ value || '–' }}
      template(#contact="{ value }")
        template(v-if="value === null")
          | –
        template(v-else)
          ui-clickable(:href="`mailto:${value.email}`")
            | {{ value.name }}
      template(#action="{ row }")
        ui-clickable(:to="{ name: 'AppUserManagementCustomerView', params: { customerId: row.id } }")
          | Bearbeiten
    ui-pagination(v-model="currentPage" :total-pages="totalPages")
</template>

<script lang="ts">
import TextInput from '@/components/form/TextInput.vue';
import { Column } from '@/components/table/model';
import plusIcon from '@/features/ui/assets/icons/plus.svg';
import { Vue, Component } from 'vue-property-decorator';
import {
  AppUserManagmentCustomerPanelQuery,
  AppUserManagmentCustomerPanelQueryVariables,
} from './__generated__/AppUserManagmentCustomerPanelQuery';
import query from './customer-panel.gql';

const TAKE = 30;

@Component({
  apollo: {
    customers: {
      query,
      fetchPolicy: 'no-cache',
      variables(): AppUserManagmentCustomerPanelQueryVariables {
        return {
          take: TAKE,
          skip: TAKE * (this.currentPage - 1),
        };
      },
    },
  },
  components: { TextInput },
  data() {
    return { customers: undefined };
  },
})
export default class CustomerPanelControl extends Vue {
  private readonly customers?: AppUserManagmentCustomerPanelQuery['customers'];
  private searchQuery = '';
  private currentPage = 1;
  private readonly plusIcon = plusIcon;

  private readonly columns: Column[] = [
    { name: 'name', label: 'Kunde' },
    { name: 'externalId', label: 'Kundennummer' },
    { name: 'contact', label: 'Kontakt' },
    { name: 'contracts', field: 'contracts.count', label: 'Verträge #', align: 'right' },
    { name: 'action', label: '', align: 'right' },
  ];

  private get totalPages(): number {
    return this.customers ? Math.ceil(this.customers.count / TAKE) : 0;
  }
}
</script>
