<template lang="pug">
  app-user-management-add-user-wizard(
    v-if="addUserWizard"
    @user-added="addUserWizard = false; $apollo.queries.collection.refetch();"
  )
  ui-panel(v-else-if="collection")
    ui-flex
      ui-cell
        .search-filter
          text-input(v-model="searchQuery" :empty-value="null" placeholder="Suchen")
      ui-cell(:grow="0" push-right)
        ui-button(front :icon="plusIcon" @click="addUserWizard = true")
          | Benutzer anlegen
    ui-table(
      :columns="columns"
      :data="collection.items"
      align="left"
      striped
    )
      template(#role="{ row }")
        img(:src="userIcon")
      template(#name="{ row }")
        | {{ row.name }}
      template(#action="{ row }")
        | Bearbeiten
    ui-pagination(v-model="currentPage" :total-pages="totalPages")
</template>

<script lang="ts">
import TextInput from '@/components/form/TextInput.vue';
import { Column } from '@/components/table/model';
import plusIcon from '@/features/ui/assets/icons/plus.svg';
import { Vue, Component } from 'vue-property-decorator';
import {
  AppUserManagmentUserPanelQuery,
  AppUserManagmentUserPanelQueryVariables,
} from './__generated__/AppUserManagmentUserPanelQuery';
import query from './user-panel.gql';
import userIcon from './user.svg';

const TAKE = 30;

@Component({
  apollo: {
    collection: {
      query,
      fetchPolicy: 'no-cache',
      variables(): AppUserManagmentUserPanelQueryVariables {
        return {
          take: TAKE,
          skip: TAKE * (this.currentPage - 1),
          query: this.searchQuery,
        };
      },
    },
  },
  components: { TextInput },
  data() {
    return { collection: undefined };
  },
})
export default class UserPanelControl extends Vue {
  private readonly collection?: AppUserManagmentUserPanelQuery['collection'];

  private searchQuery = null;
  private currentPage = 1;

  private readonly userIcon = userIcon;
  private readonly plusIcon = plusIcon;
  private addUserWizard = false;

  private readonly columns: Column[] = [
    { name: 'role', label: '' },
    { name: 'name', label: 'Name' },
    { name: 'email', label: 'E-Mail' },
    { name: 'action', label: '', align: 'right' },
  ];

  private get totalPages(): number {
    return this.collection ? Math.ceil(this.collection.count / TAKE) : 0;
  }
}
</script>

<style scoped lang="scss">
.search-filter {
  width: 250px;
}
</style>
