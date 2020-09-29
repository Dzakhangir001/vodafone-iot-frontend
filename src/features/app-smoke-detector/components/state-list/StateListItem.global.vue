<template lang="pug">
  .smoke-detector-state-wrapper
    .header(@click="open = !open")
      .hblock
        .arrow
          img(v-if="open" src="./up.svg" alt="")
          img(v-else src="./down.svg" alt="")
        .floor
          | {{ apartment.floor.name }}
        .apartment
          | {{ apartment.name }}
      .hblock
        .state
          img.state-image(:src="apartmentStateIcon" alt="")
    ui-table(v-if="open" :columns="columns.concat(stateColumns)" :data="apartment.devices")
      template(#serial="{ value, row }")
        ui-clickable.link(@click="$emit('device-click', row)")
          | {{ value }}
      template(v-for="{ name } of stateColumns" #[name]="{ row }")
        img(:src="stateIndicators[resolveMetricState(row, name)]" alt="")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Column } from '@/components/table/model';
import { ObjectProp } from '@/util/prop-decorators';
import { resolveMetricState, resolveAggregatedMetricsState } from '../../util/metrics';
import { AppSmokeDetectorStateListFragment } from './__generated__/AppSmokeDetectorStateListFragment';
import GREEN from './green.svg';
import GRAY from './gray.svg';
import RED from './red.svg';

@Component
export default class StateListItem extends Vue {
  @ObjectProp(true)
  private readonly apartment!: AppSmokeDetectorStateListFragment['apartments'][number];

  private open = false;

  private readonly stateIndicators = {
    GREEN,
    RED,
    GRAY,
  };
  private readonly resolveMetricState = resolveMetricState;

  private readonly columns: readonly Column[] = [
    { label: 'Ort', name: 'room', field: 'room.name', align: 'left' },
    { label: 'Seriennummer', name: 'serial', field: 'meta.serial', align: 'left' },
  ];

  private readonly stateColumns: readonly Column[] = [
    { label: 'Verbindung', name: 'connection', hideable: true, align: 'center' },
    { label: 'Batterie', name: 'battery', hideable: true, align: 'center' },
    { label: 'Verschmutzung', name: 'pollution', hideable: true, align: 'center' },
    { label: 'Montage', name: 'montage', hideable: true, align: 'center' },
    { label: 'Funkmodul', name: 'radio', hideable: true, align: 'center' },
  ];

  private get apartmentStateIcon(): string {
    let stateIcon = GREEN;
    for (const device of this.apartment.devices) {
      const deviceState = resolveAggregatedMetricsState(device);
      if (deviceState === 'RED') {
        return RED;
      } else if (deviceState === 'GRAY') {
        stateIcon = GRAY;
      }
    }

    return stateIcon;
  }
}
</script>

<style lang="scss" scoped>
.smoke-detector-state-wrapper {
  width: 100%;
  font-size: fontSize(fs-base);
  color: colorVodafone(grey);
}
.smoke-detector-state-wrapper:nth-child(odd) {
  background-color: #f7f7f7;
}
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: fontSize(fs-base);
  padding: 10px 5px 10px 10px;
}
.header:hover {
  cursor: pointer;
}
.hblock {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.state-image {
  margin-top: 4px;
}
.arrow {
  width: 50px;
  text-align: center;
}
.floor {
  min-width: 100px;
}
.table {
  width: 100%;
  padding: 0px 54px 0 29px;
}
.head {
  height: 35px;
  padding: 0;
}
.state {
  font-size: fontSize(fs-50);
  width: 110px;
  text-align: center;
}
.cell {
  height: 35px;
  padding: 0;
}
.link:hover {
  color: colorVodafone(auqa-blue);
}
</style>
