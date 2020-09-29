<template lang="pug">
  binding-wizard-modal(
    v-if="data"
    :initial-config="initialConfig"
    :role-options="roleOptions"
    :room-options="roomOptions"
    :manufacturer-options="manufacturerOptions"
    :add-action="addAction"
  )
</template>

<script lang="ts">
import { Option, BindingConfig } from '@/components/binding-wizard/model';
import BindingWizardModal from '@/components/binding-wizard/BindingWizardModal.vue';
import { ObjectProp } from '@/util/prop-decorators';
import { NodeType } from '@/types/iot-portal';
import DeviceRoleMapMixin from '@core/components/mixins/device-role-map';
import ManufacturerMapMixin from '@core/components/mixins/manufacturer-map';
import { pick } from 'lodash';
import { Component, Mixins } from 'vue-property-decorator';
import { AddDeviceMutation, AddDeviceMutationVariables } from './__generated__/AddDeviceMutation';
import { BindingWizardFragment } from './__generated__/BindingWizardFragment';
import {
  AppManagerStartBindingProcessMutation,
  AppManagerStartBindingProcessMutationVariables,
} from './__generated__/AppManagerStartBindingProcessMutation';
import addDeviceMutation from './add-device.gql';
import startBindingProcessMutation from './start-binding-process.gql';

type Room = Exclude<BindingWizardFragment['context'], null>['rooms'][number];

@Component({ components: { BindingWizardModal } })
export default class BindingWizardModalControl extends Mixins(DeviceRoleMapMixin, ManufacturerMapMixin) {
  @ObjectProp(true)
  private data!: BindingWizardFragment;

  private get initialConfig(): Partial<BindingConfig> {
    return this.data.type === NodeType.ROOM ? { siteId: this.data.id } : {};
  }

  private get manufacturerOptions(): Option[] {
    return Object.values(this.manufacturerMap)
      .sort((a, b) => a.label.localeCompare(b.label))
      .map(({ name, label, image }) => ({
        value: name,
        label,
        icon: image,
      }));
  }

  private get roleOptions(): Option[] {
    return Object.values(this.deviceRoleMap)
      .sort((a, b) => a.label.localeCompare(b.label))
      .map(({ name, label, icons: { md } }) => ({
        value: name,
        label,
        icon: md,
      }));
  }

  private get rooms(): Room[] {
    const { context } = this.data;
    if (!context) {
      throw new Error('Unexpected');
    }

    return context.rooms;
  }

  private get roomOptions(): Option[] {
    return this.rooms.map(({ id, name }) => ({
      value: id,
      label: name,
    }));
  }

  private async addAction(config: BindingConfig): Promise<void> {
    const deviceId = await this.addDevice(config);
    await this.startBindingProcess(deviceId);

    this.$emit('added', deviceId);
  }

  private async addDevice(config: BindingConfig): Promise<string> {
    const variables: AddDeviceMutationVariables = {
      input: {
        ...pick(config, 'siteId', 'role'),
        meta: pick(config, 'mountingNotes', 'notes', 'manufacturer', 'serial', 'encryptionKey'),
      },
    };

    const { data } = await this.$apollo.mutate<AddDeviceMutation>({
      mutation: addDeviceMutation,
      variables,
    });

    if (!data) {
      throw new Error('Gerät konnte nicht hinzugefügt werden!');
    }

    return data.addDevice.id;
  }

  private async startBindingProcess(deviceId: string): Promise<void> {
    const variables: AppManagerStartBindingProcessMutationVariables = { input: { deviceId } };

    const { errors } = await this.$apollo.mutate<AppManagerStartBindingProcessMutation>({
      mutation: startBindingProcessMutation,
      variables,
    });

    if (errors) {
      throw errors[0];
    }
  }
}
</script>
