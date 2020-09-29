<template lang="pug">
  .wizard-container
    slot(v-bind="{ show, hide }")
    ui-modal(ref="modal" v-bind="$attrs" :visible="visible" no-close-on-backdrop)
      .wizard-modal-wrapper
        .header
          h5.title
            slot(name="title")
              | {{ title }}
          ui-clickable.close-button(tag="button" @click="hide")
            img(src="./close.svg" alt="Schließen")
        .content
          slot(name="content")
</template>

<script lang="ts">
import UiClickable from '@/components/clickables/Clickable.global.vue';
import { StringProp } from '@/util/prop-decorators';
import { Component, Vue } from 'vue-property-decorator';
import UiModal from './Modal.global.vue';

@Component({ components: { UiClickable, UiModal } })
export default class Wizard extends Vue {
  @StringProp()
  private readonly title!: string;

  private visible = false;

  public readonly $refs!: { modal: UiModal };

  public show(): Promise<void> {
    this.visible = true;

    return this.$refs.modal.shown();
  }

  public hide(): Promise<void> {
    this.visible = false;

    return this.$refs.modal.hidden();
  }
}
</script>

<style lang="scss" scoped>
.wizard-modal-wrapper {
  padding: 20px;
  @include media-breakpoint-up(sm) {
    padding: 40px 30px;
  }
}
.header {
  margin-bottom: 20px;
  display: flex;
}
.title {
  margin: 0 auto 0 0;
  @include textOverflow();
  color: colorVodafone(dark);
  font-size: fontSize(fs-200);
  line-height: lineHeight(lh-rest);
}
.close-button {
  outline: none;
  margin-left: 5px;
  border: none;
  padding: 0;
  background: transparent;
}
</style>
