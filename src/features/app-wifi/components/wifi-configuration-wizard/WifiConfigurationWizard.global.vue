<template lang="pug">
  .wifi-configuration-wizard
    .header
      h5.title
        | WLAN Konfiguration ändern
      ui-clickable.close-button(tag="button" @click="$emit('close')")
        img(src="./wizard-close.svg" alt="Schließen")
    p {{ name }}
    p.error(:class="{ show: displayErrors }")
      | {{ displayErrors && errorMessage ? errorMessage : '\xa0' }}
    text-input(v-model="config.ssid" :error="displayErrors && !ssidValid")
      | SSID (Name des Netzwerks)
    text-input(v-model="config.encryptionKey" :error="displayErrors && !encryptionKeyValid")
      | Netzwerkschlüssel
    .controls
      ui-wizard-button.next(:class="{ inactive: !valid }" :busy="busy" @click="apply")
        | Anwenden
</template>

<script lang="ts">
import TextInput from '@/components/form/TextInput.vue';
import Busyable, { Busy } from '@/components/mixins/busyable';
import { FunctionProp, ObjectProp, StringProp } from '@/util/prop-decorators';
import { octetLength } from '@/util/string';
import { defaults, pick } from 'lodash';
import { Component, Mixins } from 'vue-property-decorator';
import { WifiConfiguration, ApplyAction } from './model';

const DEFAULT_CONFIG = {
  ssid: '',
  encryptionKey: '',
} as const;

@Component({
  components: { TextInput },
  data() {
    return { config: undefined };
  },
})
export default class WifiConfigurationWizard extends Mixins(Busyable) {
  @StringProp()
  private readonly name!: string;

  @ObjectProp()
  private readonly initialConfig?: Partial<WifiConfiguration>;

  @FunctionProp()
  private readonly applyAction!: ApplyAction;

  private config!: WifiConfiguration;
  private displayErrors = false;
  private errorMessage = '';

  private get valid(): boolean {
    return this.ssidValid && this.encryptionKeyValid;
  }

  private get ssidValid(): boolean {
    const length = octetLength(this.config.ssid);

    return length > 0 && length <= 32;
  }

  private get encryptionKeyValid(): boolean {
    const length = octetLength(this.config.encryptionKey);

    return length > 0 && length <= 63;
  }

  private created(): void {
    this.config = this.createConfig();
  }

  @Busy()
  private async apply(): Promise<void> {
    if (!this.valid) {
      this.displayErrors = true;

      return;
    }

    this.displayErrors = false;
    this.errorMessage = '';

    try {
      await this.applyAction(this.config);
    } catch (e) {
      this.displayErrors = true;
      this.errorMessage = e instanceof Error ? e.message : '';
    }

    this.config = this.createConfig();
  }

  private createConfig(): WifiConfiguration {
    return defaults(this.initialConfig ? pick(this.initialConfig, Object.keys(DEFAULT_CONFIG)) : {}, DEFAULT_CONFIG);
  }
}
</script>

<style lang="scss" scoped>
.wifi-configuration-wizard {
  padding: 40px 30px;
  width: 420px;
  max-width: 100%;
}
.header {
  margin-bottom: 5px;
  display: flex;
}
.title {
  margin: 0 auto 0 0;
  @include textOverflow();
  color: colorVodafone(black);
  font-size: fontSize(fs-200);
  line-height: lineHeight(lh-reset);
}
.close-button {
  outline: none;
  margin-left: 16px;
  border: none;
  padding: 0;
  background: transparent;
}
.error {
  display: none;
  color: colorVodafone(vodafone-red);
  font-size: fontSize(fs-base);
  line-height: lineHeight(lh-reset);
}
.error.show {
  display: block;
}
.controls {
  min-height: 30px;
  display: flex;
  margin-top: 18px;
  align-items: stretch;
}
.next {
  margin-left: auto;
}
</style>
