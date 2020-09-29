<template lang="pug">
  component.link(:is="tag" :class="{ disabled }" v-bind="$attrs" @click="onClick")
    slot
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Clickable extends Vue {
  public get disabled() {
    return this.$attrs.disabled;
  }

  public get tag() {
    if (this.$attrs.to) {
      return 'router-link';
    }

    return this.$attrs.tag || 'a';
  }

  public onClick(event: MouseEvent) {
    if (this.disabled) {
      event.preventDefault();
      return;
    }

    if (this.tag !== 'a' || this.$attrs.href === undefined) {
      event.preventDefault();
    }

    this.$emit('click', event);
  }
}
</script>

<style lang="scss" scoped>
.link {
  text-decoration: inherit;
  color: inherit;
  cursor: pointer;
}

.link.disabled {
  cursor: inherit;
}
</style>
