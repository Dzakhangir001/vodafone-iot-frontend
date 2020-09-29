<template lang="pug">
  device-panel(v-bind="$attrs" :background-image="fire")
    template(#actions)
      slot(name="actions")
    template(#properties)
      slot(name="properties")
    template(#footer)
      .state
        p.last-activity
          relative-time(:date="lastActivityDate" #default="{ displayDate }")
            | {{ displayDate }} zuletzt geöffnet
</template>

<script lang="ts">
import { MomentInput } from 'moment';
import { RequiredProp } from '@/util/prop-decorators';
import { Component, Vue } from 'vue-property-decorator';
import RelativeTime from '@/components/datetime/RelativeTime.global.vue';
import DevicePanel from '../DevicePanel.vue';
import fire from './fire.svg';

@Component({
  components: {
    DevicePanel,
    RelativeTime,
  },
})
export default class FireSensorPanel extends Vue {
  @RequiredProp()
  private lastActivityDate!: Exclude<MomentInput, void>;

  private fire = fire;
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
