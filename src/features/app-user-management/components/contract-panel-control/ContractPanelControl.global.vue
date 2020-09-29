<template lang="pug">
  ui-panel(v-if="collection")
    app-user-management-contract-table(:contracts="collection.items")
    ui-pagination(v-model="currentPage" :total-pages="totalPages")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import {
  AppUserManagmentContractPanelQuery,
  AppUserManagmentContractPanelQueryVariables,
} from './__generated__/AppUserManagmentContractPanelQuery';
import query from './contract-panel.gql';

const TAKE = 30;

@Component({
  apollo: {
    collection: {
      query,
      fetchPolicy: 'no-cache',
      variables(): AppUserManagmentContractPanelQueryVariables {
        return {
          take: TAKE,
          skip: TAKE * (this.currentPage - 1),
        };
      },
    },
  },
  data() {
    return { collection: undefined };
  },
})
export default class ContractPanelControl extends Vue {
  private readonly collection?: AppUserManagmentContractPanelQuery['collection'];
  private searchQuery = '';
  private currentPage = 1;

  private get totalPages(): number {
    return this.collection ? Math.ceil(this.collection.count / TAKE) : 0;
  }
}
</script>
