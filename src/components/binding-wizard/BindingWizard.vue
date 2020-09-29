<template lang="pug">
  .binding-wizard
    .header
      h5.title
        | Sensor hinzufügen
      ui-clickable.close-button(tag="button" @click="$emit('close')")
        img(src="@/components/binding-wizard/icons/wizard-close.svg" alt="Schließen")
    component.step(:is="`step${this.step}`")
</template>

<script lang="ts">
import { defaults, clone } from 'lodash';
import { Component, Vue } from 'vue-property-decorator';
import UiClickable from '@/components/clickables/Clickable.global.vue';
import { ArrayProp, FunctionProp, ObjectProp } from '@/util/prop-decorators';
import Step1 from './Step1.vue';
import Step2 from './Step2.vue';
import Step3 from './Step3.vue';
import Step4 from './Step4.vue';
import { AddAction, BindingConfig, Option } from './model';

const DEFAULT_CONFIG = {
  siteId: '',
  role: '',
  manufacturer: '',
  serial: '',
} as const;

@Component({
  components: { UiClickable, Step1, Step2, Step3, Step4 },
  data() {
    return {
      config: undefined,
    };
  },
})
export default class BindingWizard extends Vue {
  @ObjectProp()
  private initialConfig?: Partial<BindingConfig>;

  @ArrayProp(true)
  public roomOptions!: Option[];

  @ArrayProp(true)
  public roleOptions!: Option[];

  @ArrayProp(true)
  public manufacturerOptions!: Option[];

  @FunctionProp()
  private addAction!: AddAction;

  public config!: BindingConfig;
  public step = 1;

  private created(): void {
    this.config = this.createConfig();
  }

  public async complete(): Promise<void> {
    const result = await this.addAction(this.config);

    this.config = this.createConfig();
    this.step = 1;

    return result;
  }

  private createConfig(): BindingConfig {
    return defaults(this.initialConfig ? clone(this.initialConfig) : {}, DEFAULT_CONFIG);
  }
}
</script>

<style lang="scss" scoped>
.binding-wizard {
  padding: 40px 30px;
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
  margin-left: 5px;
  border: none;
  padding: 0;
  background: transparent;
}
</style>
