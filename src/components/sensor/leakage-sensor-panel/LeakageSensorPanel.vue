<template lang="pug">
  device-panel(v-bind="$attrs" :background-image="leakage")
    template(#actions)
      slot(name="actions")
    template(#properties)
      slot(name="properties")
    template(#footer)
      .state
        p.last-activity
          relative-time(:date="lastActivityDate" #default="{ displayDate }")
            | {{ displayDate }} ausgelöst
</template>

<script lang="ts">
import { MomentInput } from 'moment';
import { Component, Vue } from 'vue-property-decorator';
import RelativeTime from '@/components/datetime/RelativeTime.global.vue';
import { RequiredProp } from '@/util/prop-decorators';
import DevicePanel from '../DevicePanel.vue';
import leakage from './leakage.svg';

@Component({
  components: {
    DevicePanel,
    RelativeTime,
  },
})
export default class LeakageSensorPanel extends Vue {
  @RequiredProp()
  private lastActivityDate!: Exclude<MomentInput, void>;

  private leakage = leakage;
}
</script>

<style lang="scss" scoped>
.state {
  position: relative;
  margin: 0 0 16px;
  font-size: fontSize(fs-50);
  line-height: lineHeight(lh-25);
  text-align: center;
}
.last-activity {
  margin: 0;
  padding: 0 16px;
  @include textOverflow();
}
</style>
