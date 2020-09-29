<script lang="ts">
import { BModal } from 'bootstrap-vue';
import { concat, filter } from 'lodash';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: { BModal },
  inheritAttrs: false,
})
export default class Modal extends Vue {
  private shownPromise?: Promise<void>;
  private hiddenPromise?: Promise<void>;
  private resolveShown!: () => void;
  private resolveHidden!: () => void;

  public shown(): Promise<void> {
    return this.shownPromise || Promise.resolve();
  }

  public hidden(): Promise<void> {
    return this.hiddenPromise || Promise.resolve();
  }

  private onShown(): void {
    this.resetHidden();
    this.resolveShown();
  }

  private onHidden(): void {
    this.resetShown();
    this.resolveHidden();
  }

  private resetShown(): void {
    this.shownPromise = new Promise((resolve) => void (this.resolveShown = resolve));
  }

  private resetHidden(): void {
    this.hiddenPromise = new Promise((resolve) => void (this.resolveHidden = resolve));
  }

  private created() {
    this.resetShown();
    this.resetHidden();

    this.$attrs.visible ? this.resolveShown() : this.resolveHidden();
  }

  public render() {
    const data = this.$vnode.data || {};

    return this.$createElement(BModal, {
      class: `modal ${data.staticClass}`,
      attrs: {
        hideHeader: true,
        hideFooter: true,
        ...this.$attrs,
      },
      on: {
        ...this.$listeners,
        shown: filter(concat(this.onShown, this.$listeners.shown)),
        hidden: filter(concat(this.onHidden, this.$listeners.hidden)),
      },
      scopedSlots: this.$scopedSlots,
    });
  }
}
</script>

<style lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1050;
  overflow: hidden;
}
.fade {
  transition: opacity 0.15s linear;

  &:not(.show) {
    opacity: 0;
  }
}
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  opacity: 0.5;
  &.fade {
    opacity: 0;
  }
  &.show {
    opacity: 0.5;
  }
}
.modal-dialog {
  position: relative;
  margin: 0.5rem;
  width: auto;
  height: fit-content;
  max-height: calc(100vh - 40px);
  max-width: calc(100vw - 20px);
  .modal.fade & {
    transition: transform 0.3s ease-out;
    transform: translate(0, -50px);
  }
  .modal.show & {
    transform: none;
  }
  @include media-breakpoint-up(sm) {
    width: fit-content;
    margin: 1.5rem auto;
  }
}
.modal-content {
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.5);
  outline: 0;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  background: #ffffff;
}
.modal-open {
  overflow: hidden;
  margin-right: 17px;
  .modal {
    overflow-x: hidden;
    overflow-y: scroll;
  }
  #app {
    filter: blur(3px);
  }
}
#app {
  transition: filter 0.15s linear;
}
</style>
