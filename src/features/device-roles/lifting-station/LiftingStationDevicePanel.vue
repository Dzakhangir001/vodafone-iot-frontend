<template lang="pug">
  device-panel(v-bind="$attrs" :background-image="mode === 'ON' ? on : off")
    template(#actions)
      slot(name="actions")
    template(#properties)
      slot(name="properties")
    template(#overlay)
      slot(name="overlay")
    template(#footer)
      .state
        p.last-activity
          ui-relative-time(v-if="measurementDate" :date="measurementDate" #default="{ displayDate }")
            | {{ displayDate }} {{ mode === 'ON' ? 'aktiviert' : 'ausgeschaltet' }}
          template(v-else)
            | Keine Daten verfügbar
</template>

<script lang="ts">
import DevicePanel from '@/components/sensor/DevicePanel.vue';
import { EnumProp, OptionalProp } from '@/util/prop-decorators';
import { MomentInput } from 'moment';
import { Component, Vue } from 'vue-property-decorator';
import off from './lifting-station-lg-off.svg';
import on from './lifting-station-lg-on.svg';

@Component({ components: { DevicePanel } })
export default class LiftingStationDevicePanel extends Vue {
  @OptionalProp()
  private readonly measurementDate?: Exclude<MomentInput, void>;

  @EnumProp(false, 'OFF', 'ON')
  private readonly mode?: 'OFF' | 'ON';

  private readonly on = on;
  private readonly off = off;
}
</script>

<style lang="scss" scoped>
.state {
  padding: 0 16px;
  font-size: fontSize(fs-50);
  line-height: lineHeight(lh-reset);
  text-align: center;
}
.last-activity {
  @include textOverflow();
}
</style>
