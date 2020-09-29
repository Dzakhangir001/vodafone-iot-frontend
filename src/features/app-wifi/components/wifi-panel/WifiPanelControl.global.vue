<template lang="pug">
  .wifi-panel-control-container(:class="{ 'fill-height': fillHeight }")
    ui-modal(ref="configurationWizardModal" :visible="configurationWizard" no-close-on-backdrop)
      app-wifi-wifi-configuration-wizard(
        :name="wifi.node.name"
        :initial-config="wifi.configuration"
        :apply-action="changeConfiguration"
        @close="configurationWizard = false"
      )
    device-panel(
      :headline="wifi.node.name"
      :description="wifi.configuration ? wifi.configuration.ssid : ''"
      :danger="!wifi.ok"
      :background-image="gatewayIcon"
    )
      template(#actions)
        sensor-action(:icon="exchangeIcon" @click="configurationWizard = true") Konfiguration ändern
        sensor-action(v-if="detailsLink" :icon="exchangeIcon" @click="pushNodeLocation(wifi.node)") Details ansehen
      template(#footer)
        .footer
          template(v-if="wifi.configuration")
            | Netzwerkschlüssel
            br
            span.text-lighter {{ wifi.configuration.encryptionKey }}
          template(v-else)
            | Nicht konfiguriert
</template>

<script lang="ts">
import UiModal from '@/components/modal/Modal.global.vue';
import DevicePanel from '@/components/sensor/DevicePanel.vue';
import SensorAction from '@/components/sensor/SensorAction.vue';
import { BooleanProp, RequiredProp } from '@/util/prop-decorators';
import NodeLocationGeneratorMixin from '@core/components/mixins/node-location-generator';
import { Component, Mixins } from 'vue-property-decorator';
import exchangeIcon from '../../assets/exchange-device.png';
import GatewayIcon from '../../assets/gateway.svg?vue';
import { WifiConfiguration } from '../wifi-configuration-wizard/model';
import {
  AppWifiChangeWifiConfigurationMutation,
  AppWifiChangeWifiConfigurationMutationVariables,
} from './__generated__/AppWifiChangeWifiConfigurationMutation';
import { AppWifiWifiPanelFragment } from './__generated__/AppWifiWifiPanelFragment';
import changeWifiConfigurationMutation from './change-wifi-configuration.gql';

@Component({ components: { DevicePanel, SensorAction } })
export default class WifiPanelControl extends Mixins(NodeLocationGeneratorMixin) {
  @RequiredProp()
  private wifi!: AppWifiWifiPanelFragment;

  @BooleanProp()
  private detailsLink!: boolean;

  @BooleanProp()
  private fillHeight!: boolean;

  private configurationWizard = false;
  public readonly $refs!: { configurationWizardModal: UiModal };
  private readonly exchangeIcon = exchangeIcon;
  private readonly gatewayIcon = GatewayIcon;

  private async changeConfiguration(configuration: WifiConfiguration): Promise<void> {
    const variables: AppWifiChangeWifiConfigurationMutationVariables = {
      input: { id: this.wifi.id, configuration },
    };

    const { data } = await this.$apollo.mutate<AppWifiChangeWifiConfigurationMutation>({
      mutation: changeWifiConfigurationMutation,
      variables,
    });

    if (!data) {
      throw new Error('WLAN Einstellungen konnten nicht angewendet werden!');
    }

    this.$emit('wifi-configuration-changed', data);

    this.configurationWizard = false;
    await this.$refs.configurationWizardModal.hidden();
  }
}
</script>

<style lang="scss" scoped>
.fill-height {
  height: 100%;
}
.footer {
  position: relative;
  margin: 0 0 16px;
  font-size: fontSize(fs-base);
  line-height: lineHeight(lh-100);
  text-align: center;
}
.text-lighter {
  color: colorVodafone(grey);
}
</style>
