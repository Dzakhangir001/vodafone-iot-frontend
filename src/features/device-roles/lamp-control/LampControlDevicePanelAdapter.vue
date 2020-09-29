<template lang="pug">
  lamp-control-device-panel(
    v-bind="$attrs"
    v-model="targetState"
    :state="state"
    :state-date="stateDate"
    :switch-disabled="switchDisabled"
  )
    template(#actions)
      slot(name="actions")
    template(#properties)
      slot(name="properties")
    template(#overlay)
      slot(name="overlay")
</template>

<script lang="ts">
import { DevicePanelQuery } from '@/features/core/components/device-panel/__generated__/DevicePanelQuery';
import MetricMapMixin, { DataPoint } from '@/features/core/components/device-panel-adapters/metric-map-mixin';
import DeviceRoleMapMixin from '@/features/core/components/mixins/device-role-map';
import { ObjectProp } from '@/util/prop-decorators';
import delay from '@/util/delay';
import { LampState } from '@/types/iot-portal';
import moment, { MomentInput } from 'moment';
import { Component, Mixins } from 'vue-property-decorator';
import {
  LampControlSwitchLampMutation,
  LampControlSwitchLampMutationVariables,
} from './__generated__/LampControlSwitchLampMutation';
import LampControlDevicePanel from './LampControlDevicePanel.vue';
import switchLampMutation from './switch-lamp.gql';
import { TargetState, State } from './util';

@Component({ components: { LampControlDevicePanel } })
export default class LampControlDevicePanelAdapter extends Mixins(DeviceRoleMapMixin, MetricMapMixin) {
  @ObjectProp(true)
  private readonly device!: DevicePanelQuery['data'];

  private switchDisabled = false;
  private transientTargetState: TargetState = 'OFF';
  private transientTargetStateDate = moment(0);

  private get onOff(): DataPoint | undefined {
    return this.latestDataPoint('onoff');
  }

  private get state(): State {
    return this.onOff ? (this.onOff.value === '1' ? 'ON' : 'OFF') : 'UNKNOWN';
  }

  private get stateDate(): Exclude<MomentInput, void> | undefined {
    return this.onOff ? this.onOff.date : undefined;
  }

  private get targetState(): TargetState {
    if (this.state !== 'UNKNOWN' && this.transientTargetStateDate.isBefore(this.stateDate)) {
      return this.state;
    }

    return this.transientTargetState;
  }

  private set targetState(value: TargetState) {
    this.switchLamp(value);
  }

  private async switchLamp(state: TargetState): Promise<void> {
    const { transientTargetState, transientTargetStateDate } = this;

    this.transientTargetState = state;
    if (this.onOff) {
      this.transientTargetStateDate = moment(this.onOff.date);
    }

    try {
      const variables: LampControlSwitchLampMutationVariables = {
        input: {
          deviceId: this.device.id,
          state: LampState[state],
        },
      };

      const mutation = this.$apollo.mutate<LampControlSwitchLampMutation>({
        mutation: switchLampMutation,
        variables,
      });
      this.suspendSwitch(mutation);

      await mutation;
    } catch {
      this.transientTargetState = transientTargetState;
      this.transientTargetStateDate = transientTargetStateDate;

      // TODO logging
    }
  }

  private async suspendSwitch(mutation: Promise<unknown>): Promise<void> {
    this.switchDisabled = true;

    await Promise.all([mutation.catch(() => Promise.resolve()), delay(500)]);

    this.switchDisabled = false;
  }
}
</script>
