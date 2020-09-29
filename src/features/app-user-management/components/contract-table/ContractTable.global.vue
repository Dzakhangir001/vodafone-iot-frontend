<template lang="pug">
  ui-table(
    :columns="columns"
    :data="contracts"
    align="left"
    striped
  )
    template(#contact="{ value }")
      template(v-if="value === null")
        | –
      template(v-else)
        ui-clickable(:href="`mailto:${value.email}`")
          | {{ value.name }}
    template(#action="{ row }")
      ui-clickable(:to="{ name: 'AppUserManagementContractView', params: { contractId: row.id } }")
        | Bearbeiten
</template>

<script lang="ts">
import { Column } from '@/components/table/model';
import { ArrayProp } from '@/util/prop-decorators';
import { Vue, Component } from 'vue-property-decorator';
import { AppUserManagmentContractTableFragment } from './__generated__/AppUserManagmentContractTableFragment';

@Component
export default class ContractTable extends Vue {
  @ArrayProp(() => [])
  private readonly contracts?: AppUserManagmentContractTableFragment[];

  private readonly columns: Column[] = [
    { name: 'externalId', label: 'Vertragsnummer' },
    { name: 'customerName', field: 'customer.name', label: 'Kunde', hideable: true },
    { name: 'customerExternalId', field: 'customer.externalId', label: 'Kundennummer', hideable: true },
    { name: 'metaSalesPartner', field: 'meta.salesPartner', label: 'Vertriebspartner', hideable: true },
    { name: 'metaOffer', field: 'meta.offer', label: 'Angebot', hideable: true },
    { name: 'metaCompanyName', field: 'meta.companyName', label: 'Vertragspartner', hideable: true },
    {
      name: 'metaCompanyAddressStreet',
      field: 'meta.companyAddress.street',
      label: 'Vertragspartner Straße',
      hideable: true,
    },
    {
      name: 'metaCompanyAddressPostal',
      field: 'meta.companyAddress.postal',
      label: 'Vertragspartner PLZ',
      hideable: true,
    },
    {
      name: 'metaCompanyAddressLocality',
      field: 'meta.companyAddress.locality',
      label: 'Vertragspartner Ort',
      hideable: true,
    },
    { name: 'metaSigningDate', field: 'meta.signingDate', label: 'Unterschriftsdatum', hideable: true },
    { name: 'metaStartDate', field: 'meta.startDate', label: 'Vertragsbeginn', hideable: true },
    { name: 'metaEndDate', field: 'meta.endDate', label: 'Vertragsende', hideable: true },
    { name: 'metaApartmentCount', field: 'meta.apartmentCount', label: 'WE #', align: 'right', hideable: true },
    { name: 'properties', field: 'properties.count', label: 'Objekte #', align: 'right' },
    { name: 'action', label: '', align: 'right' },
  ];
}
</script>
