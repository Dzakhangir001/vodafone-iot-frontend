<template lang="pug">
  ui-panel
    ui-table(v-if="alertCollection.items.length > 0" :columns="columns" :data="alertCollection.items" striped)
      template(#name="{ row, value }")
        .name(:class="row.severity > 1 ? 'alert' : 'warning'")
          | {{ value }}
      template(#location="{ row }")
        | {{ generateLocation(row) }}
      template(#role="{ row }")
        | {{ deviceRoleMap[row.device.role].label }}
        br
        | {{ row.device.meta.serial }}
      template(#startDate="{ value }")
        ui-relative-time(:date="value" min="-PT30M")
    p.text-center(v-else)
      | Zur Zeit liegen keine Alarme oder Warnungen vor.
</template>

<script lang="ts">
import { Column } from '@/components/table/model';
import { ObjectProp } from '@/util/prop-decorators';
import { Component, Mixins } from 'vue-property-decorator';
import { AlertPanelFragment } from './__generated__/AlertPanelFragment';
import DeviceRoleMapMixin from '../mixins/device-role-map';

@Component
export default class AlertPanelAdapter extends Mixins(DeviceRoleMapMixin) {
  @ObjectProp()
  private readonly alertCollection?: AlertPanelFragment;

  private readonly columns: Column[] = [
    { name: 'name', label: 'Name' },
    { name: 'location', label: 'Ort' },
    { name: 'role', label: 'Gerät' },
    { name: 'startDate', label: 'Datum', align: 'right' },
  ];

  private generateLocation(alert: AlertPanelFragment['items'][number]): string {
    return alert.device.site.name;
  }
}
</script>

<style lang="scss" scoped>
.name.alert {
  color: colorVodafone(vodafone-red);
}
.name.warning {
  color: colorVodafone(fresh-orange);
}
.text-center {
  text-align: center;
}
</style>
