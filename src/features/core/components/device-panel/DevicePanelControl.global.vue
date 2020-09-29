<template lang="pug">
  .device-panel-control-container(v-if="data" style="width: 100%; height: 100%;")
    ui-modal(:visible="Boolean(details)" no-close-on-backdrop)
      core-device-details-control(:device="data" :initial-tab="details" @close="details = undefined")
    component(
      :is="role.component"
      :headline="role.shortLabel"
      :description="description"
      :device="data"
      :overlay="!data.bound"
      :metric-map="metricMap"
      :connection-status="connectionStateIndicator"
      :battery-status="batteryStateIndicator"
    )
      template(#actions)
        sensor-action(:icon="historyIcon" @click="details = 'HISTORY'") Historie
        sensor-action(v-if="role.statistics" :icon="statisticIcon" @click="details = 'STATISTICS'") Statistik
        //- sensor-action(:icon="exportIcon" to="/") Export
        //- sensor-action(:icon="exchangeDeviceIcon" to="/") Gerät tauschen
        sensor-action(:icon="disconnectIcon" @click="onDisconnectClick") Verbindung trennen
      template(#properties)
        sensor-property(label="Gerätetyp") {{ role.label }}
        sensor-property(v-if="data.meta.manufacturer" label="Hersteller") {{ data.meta.manufacturer}}
        sensor-property(v-if="data.meta.serial" label="Seriennummer") {{ data.meta.serial }}
        sensor-property(v-if="data.gateway" label="Gateway") {{ data.gateway.serial }}
        sensor-property(label="Wohnung") {{ apartment }}
        sensor-property(label="Raum") {{ data.site.name }}
      template(v-if="!data.bound && bindingProcess" #overlay)
        component(
          v-if="overlayComponent"
          :is="overlayComponent"
          :device="data"
          @startBindingProcess="onStartBindingProcess"
          @remove="onDisconnectClick"
        )
</template>

<script lang="ts">
// import exportIcon from '@/assets/images/export.png';
import disconnectIcon from '@/assets/images/disconnect.png';
// import exchangeDeviceIcon from '@/assets/images/exchange-device.png';
import historyIcon from '@/assets/images/history.png';
import statisticIcon from '@/assets/images/statistic.png';
import SensorAction from '@/components/sensor/SensorAction.vue';
import SensorProperty from '@/components/sensor/SensorProperty.vue';
import { StringProp } from '@/util/prop-decorators';
import { BindingProcessState, MetricDescriptorInput } from '@/types/iot-portal';
import { DeviceRole } from '@core/model';
import { ApolloQueryResult } from 'apollo-client';
import { FetchResult } from 'apollo-link';
import { kebabCase, keyBy } from 'lodash';
import { Component, Mixins, Watch } from 'vue-property-decorator';
import { DeviceDetailsTab } from '../device-details/model';
import DeviceRoleMapMixin from '../mixins/device-role-map';
import { BindingProcessQuery, BindingProcessQueryVariables } from './__generated__/BindingProcessQuery';
import { DevicePanelQuery, DevicePanelQueryVariables } from './__generated__/DevicePanelQuery';
import {
  CoreDevicePanelMetricsQuery,
  CoreDevicePanelMetricsQueryVariables,
} from './__generated__/CoreDevicePanelMetricsQuery';
import {
  MetricChangesSubscriptionVariables,
  MetricChangesSubscription,
} from './__generated__/MetricChangesSubscription';
import { RemoveDeviceMutation, RemoveDeviceMutationVariables } from './__generated__/RemoveDeviceMutation';
import {
  StartBindingProcessMutation,
  StartBindingProcessMutationVariables,
} from './__generated__/StartBindingProcessMutation';
import devicePanelQuery from './device-panel.gql';
import bindingProcessQuery from './binding-process.gql';
import coreDevicePanelMetricsQuery from './metrics.gql';
import metricChangesSubscription from './metric-changes.gql';
import removeDeviceMutation from './remove-device.gql';
import startBindingProcessMutation from './start-binding-process.gql';
import { ConnectionStatus, BatteryStatus } from '@/components/sensor/prop-decorators';
import { NodeType } from '@/types/iot-portal';

type MetricMap = Record<string, CoreDevicePanelMetricsQuery['metrics'][number]>;

const OVERLAY_STATES = [
  BindingProcessState.FAILED,
  BindingProcessState.IDLE,
  BindingProcessState.IN_PROGRESS,
  BindingProcessState.WAITING,
];

@Component({
  components: { SensorAction, SensorProperty },
  apollo: {
    data: {
      query: devicePanelQuery,
      variables(): DevicePanelQueryVariables {
        return { deviceId: this.deviceId };
      },
    },
    $subscribe: {
      metrics: {
        query: metricChangesSubscription,
        variables(): MetricChangesSubscriptionVariables {
          return { descriptors: this.descriptors };
        },
        skip() {
          return this.descriptors.length === 0 || this.metricMap === undefined;
        },
        result({ data }: FetchResult<MetricChangesSubscription>) {
          if (!data) {
            return;
          }

          const metricChange = data.metricChanges;
          const metricToChange = this.metricMap[metricChange.name];
          if (!metricToChange) {
            return;
          }

          const newValue =
            metricChange.__typename !== 'DiscreteMetricChange' ? metricChange.CONTINUOUS : metricChange.DISCRETE;
          if (
            metricToChange.__typename !== 'DiscreteMetric' &&
            newValue !== null &&
            newValue.__typename !== 'DiscreteDataPoint'
          ) {
            metricToChange.CONTINUOUS = newValue;
          } else if (
            metricToChange.__typename === 'DiscreteMetric' &&
            newValue !== null &&
            newValue.__typename === 'DiscreteDataPoint'
          ) {
            metricToChange.DISCRETE = newValue;
          }
        },
      },
    },
    metrics: {
      query: coreDevicePanelMetricsQuery,
      fetchPolicy: 'no-cache',
      variables(this: DevicePanelControl): CoreDevicePanelMetricsQueryVariables {
        return { descriptors: this.descriptors };
      },
      manual: true,
      result({ data }: ApolloQueryResult<CoreDevicePanelMetricsQuery>) {
        this.metricMap = keyBy(data.metrics || [], 'name');
      },
      skip(): boolean {
        return this.descriptors.length === 0;
      },
    },
    bindingProcess: {
      query: bindingProcessQuery,
      pollInterval: 3000,
      fetchPolicy: 'no-cache',
      variables(): BindingProcessQueryVariables {
        return { deviceId: this.deviceId };
      },
      skip(): boolean {
        if (this.data === undefined || this.data.bound) {
          return true;
        }

        const { state } = this.bindingProcess || { state: undefined };

        return state === BindingProcessState.FAILED;
      },
    },
  },
  data() {
    return {
      data: undefined,
      details: undefined,
      bindingProcess: undefined,
      metricMap: undefined,
    };
  },
})
export default class DevicePanelControl extends Mixins(DeviceRoleMapMixin) {
  @StringProp(true)
  private readonly deviceId!: string;

  private readonly data!: DevicePanelQuery['data'];
  private bindingProcess?: BindingProcessQuery['bindingProcess'];

  private details!: DeviceDetailsTab;
  private metricMap!: MetricMap;

  private readonly statisticIcon = statisticIcon;
  private readonly historyIcon = historyIcon;
  // private readonly exportIcon = exportIcon;
  // private readonly exchangeDeviceIcon = exchangeDeviceIcon;
  private readonly disconnectIcon = disconnectIcon;

  private get role(): DeviceRole | undefined {
    return this.data ? this.deviceRoleMap[this.data.role] : undefined;
  }

  private get descriptors(): MetricDescriptorInput[] {
    if (!this.role || !this.role.metrics) {
      return [];
    }

    return this.role.metrics.map((descriptor) => ({ ...descriptor, deviceId: this.deviceId }));
  }

  private get description(): string {
    return [this.data.site.name, this.data.meta.mountingNotes].filter((value) => Boolean(value)).join(' – ');
  }

  private get apartment(): string {
    console.log(this.data.site.parent);
    return this.data.site && this.data.site.parent && this.data.site.parent.type === NodeType.APARTMENT
      ? this.data.site.parent.name
      : 'n/a';
  }

  private get connectionStateIndicator(): ConnectionStatus {
    if (!this.role || !this.role.connectionMetricName) {
      return 'NONE';
    }

    const metric = this.metricMap[this.role.connectionMetricName];

    if (!metric || metric.__typename !== 'DiscreteMetric' || !metric.DISCRETE) {
      return 'GRAY';
    }

    return metric.DISCRETE.value === '1' ? 'GREEN' : 'RED';
  }

  private get batteryStateIndicator(): BatteryStatus {
    if (!this.role || !this.role.batteryMetricName) {
      return 'NONE';
    }

    const metric = this.metricMap[this.role.batteryMetricName];

    if (!metric || metric.__typename !== 'DiscreteMetric' || !metric.DISCRETE) {
      return 'GRAY';
    }

    return metric.DISCRETE.value === '0' ? 'GREEN' : 'RED';
  }

  private get overlayComponent(): string | undefined {
    if (!this.bindingProcess) {
      return undefined;
    }

    const state = this.bindingProcess.state;

    if (!OVERLAY_STATES.includes(state)) {
      return undefined;
    }

    if (state === BindingProcessState.FAILED) {
      return `core-binding-process-idle-overlay`;
    }

    return `core-binding-process-${kebabCase(state)}-overlay`;
  }

  @Watch('bindingProcess.state')
  private onBindingProcessDone(state: BindingProcessState): void {
    if (state === BindingProcessState.DONE) {
      this.$apollo.queries.data.refetch();
    }
  }

  private async onDisconnectClick(): Promise<void> {
    if (!window.confirm('Möchten sie dieses Gerät wirklich entfernen?')) {
      return;
    }

    const variables: RemoveDeviceMutationVariables = { deviceId: this.deviceId };

    const { errors } = await this.$apollo.mutate<RemoveDeviceMutation>({
      mutation: removeDeviceMutation,
      variables,
    });

    if (errors) {
      throw errors[0];
    }

    this.$apollo.queries.data.refetch();

    this.$emit('disconnected', this.deviceId);
  }

  private async onStartBindingProcess(): Promise<void> {
    const variables: StartBindingProcessMutationVariables = { input: { deviceId: this.deviceId } };

    const { errors } = await this.$apollo.mutate<StartBindingProcessMutation>({
      mutation: startBindingProcessMutation,
      variables,
    });

    if (errors) {
      throw errors[0];
    }

    this.bindingProcess = undefined;
    this.$apollo.queries.bindingProcess.refresh();
  }
}
</script>
