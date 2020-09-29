<template lang="pug">
  device-panel(v-bind="$attrs" :background-image="flow === 'SUPPLY' ? supplyFlowLg : returnFlowLg")
    template(#actions)
      slot(name="actions")
    template(#properties)
      slot(name="properties")
    template(#overlay)
      slot(name="overlay")
    template(#footer)
      .metric
        template(v-if="measurementDate !== undefined && temperature !== undefined")
          .temperature(:class="flow")
            | {{ temperature }}{{ '\u200a' }}°C
          p
            relative-time(:date="measurementDate" #default="{ displayDate }")
              | {{ displayDate }} gemessen
        p(v-else)
          | Keine Messdaten verfügbar
</template>

<script lang="ts">
import RelativeTime from '@/components/datetime/RelativeTime.global.vue';
import DevicePanel from '@/components/sensor/DevicePanel.vue';
import { RequiredProp, NumberProp, EnumProp } from '@/util/prop-decorators';
import { MomentInput } from 'moment';
import { Component, Vue } from 'vue-property-decorator';
import supplyFlowLg from './supply-flow-lg.svg';
import returnFlowLg from './return-flow-lg.svg';

@Component({ components: { DevicePanel, RelativeTime } })
export default class ThermocouplesDevicePanel extends Vue {
  @RequiredProp()
  private readonly measurementDate?: Exclude<MomentInput, void>;

  @NumberProp()
  private readonly temperature!: number;

  @EnumProp(true, 'SUPPLY', 'RETURN')
  private readonly flow!: 'SUPPLY' | 'RETURN';

  private readonly supplyFlowLg = supplyFlowLg;
  private readonly returnFlowLg = returnFlowLg;
}
</script>

<style lang="scss" scoped>
.metric {
  padding: 0 16px;
  font-size: fontSize(fs-50);
  line-height: lineHeight(lh-reset);
  text-align: center;
  @include textOverflow();
}
.temperature {
  font-size: fontSize(fs-300);
  line-height: lineHeight(lh-100);
}
.SUPPLY {
  color: colorVodafone(vodafone-red);
}
.RETURN {
  color: colorVodafone(aqua-blue);
}
</style>
