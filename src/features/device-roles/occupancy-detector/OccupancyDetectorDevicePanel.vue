<template lang="pug">
  device-panel(
    v-bind="$attrs"
    :background-image="state === undefined ? occupancyDetectorLg : state === 'OCCUPIED' ? occupancyDetectorLgOccupied : occupancyDetectorLgVacant"
  )
    template(#actions)
      slot(name="actions")
    template(#properties)
      slot(name="properties")
    template(#overlay)
      slot(name="overlay")
    template(#footer)
      .metric
        .indicator
          occupancy-indicator(:state="state")
        p(v-if="measurementDate")
          ui-relative-time(:date="measurementDate" #default="{ displayDate }")
            | {{ displayDate.replace('vor', 'seit') }} {{ state === 'OCCUPIED' ? 'belegt' : 'frei' }}
        p(v-else)
          | Keine Daten verfügbar
</template>

<script lang="ts">
import DevicePanel from '@/components/sensor/DevicePanel.vue';
import { EnumProp, OptionalProp } from '@/util/prop-decorators';
import { MomentInput } from 'moment';
import { Component, Vue } from 'vue-property-decorator';
import occupancyDetectorLg from './occupancy-detector-lg.svg';
import occupancyDetectorLgOccupied from './occupancy-detector-lg-occupied.svg';
import occupancyDetectorLgVacant from './occupancy-detector-lg-vacant.svg';
import OccupancyIndicator from './OccupancyIndicator.vue';

@Component({ components: { DevicePanel, OccupancyIndicator } })
export default class OccupancyDetectorDevicePanel extends Vue {
  @OptionalProp()
  private readonly measurementDate?: Exclude<MomentInput, void>;

  @EnumProp(false, 'OCCUPIED', 'VACANT')
  private readonly state?: 'OCCUPIED' | 'VACANT';

  private readonly occupancyDetectorLg = occupancyDetectorLg;
  private readonly occupancyDetectorLgOccupied = occupancyDetectorLgOccupied;
  private readonly occupancyDetectorLgVacant = occupancyDetectorLgVacant;
}
</script>

<style lang="scss" scoped>
.indicator {
  display: inline-block;
}
.metric {
  padding: 0 16px;
  font-size: fontSize(fs-50);
  line-height: lineHeight(lh-reset);
  text-align: center;
  @include textOverflow();
}
</style>
