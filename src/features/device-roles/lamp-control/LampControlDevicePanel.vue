<template lang="pug">
  device-panel(v-bind="$attrs" :background-image="lampControlLg")
    template(#actions)
      slot(name="actions")
    template(#properties)
      slot(name="properties")
    template(#overlay)
      slot(name="overlay")
    template(#footer)
      .switch
        toggle-button(
          css-colors
          :labels="{ checked: 'An', unchecked: 'Aus' }"
          :width="46"
          :height="16"
          :margin="2"
          :value="targetState === 'ON'"
          :disabled="switchDisabled"
          sync
          @input="$emit('update:target-state', $event ? 'ON' : 'OFF')"
        )
      .state(:class="{ hidden: state === 'UNKNOWN' || stateDate === undefined }")
        p.switching(:class="{ hidden: state === targetState }")
          | wird {{ targetState === 'ON' ? 'eingeschaltet' : 'ausgeschaltet' }}
        p.last-activity
          relative-time(:date="stateDate" #default="{ displayDate }")
            | {{ displayDate }} {{ state === 'ON' ? 'eingeschaltet' : 'ausgeschaltet' }}
</template>

<script lang="ts">
import RelativeTime from '@/components/datetime/RelativeTime.global.vue';
import DevicePanel from '@/components/sensor/DevicePanel.vue';
import { OptionalProp, EnumProp, BooleanProp } from '@/util/prop-decorators';
import { MomentInput } from 'moment';
import { ToggleButton } from 'vue-js-toggle-button';
import { Component, Vue } from 'vue-property-decorator';
import lampControlLg from './lamp-control-lg.svg';
import { TargetState, State } from './util';

@Component({
  components: { DevicePanel, ToggleButton, RelativeTime },
  model: { prop: 'targetState', event: 'update:target-state' },
})
export default class LampSensorPanel extends Vue {
  @OptionalProp()
  private readonly stateDate?: Exclude<MomentInput, void>;

  @EnumProp(true, 'ON', 'OFF', 'UNKNOWN')
  private readonly state!: State;

  @EnumProp(true, 'ON', 'OFF')
  private readonly targetState!: TargetState;

  @BooleanProp()
  private readonly switchDisabled!: boolean;

  private readonly lampControlLg = lampControlLg;
}
</script>

<style lang="scss" scoped>
.switch {
  margin-bottom: 5px;
  text-align: center;
}
.switch /deep/ .v-switch-core {
  background: #c5c5c5;
}
.switch /deep/ .toggled .v-switch-core {
  background: colorVodafone(digital-green);
}

.state {
  position: relative;
  margin: 0 0 16px;
  font-size: fontSize(fs-50);
  line-height: lineHeight(lh-reset);
  text-align: center;
}
.hidden {
  visibility: hidden;
}
.switching,
.last-activity {
  margin: 0;
  padding: 0 16px;
  @include textOverflow();
}
.switching {
  margin-bottom: 10px;
}
</style>
