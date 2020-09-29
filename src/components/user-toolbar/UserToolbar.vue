<template lang="pug">
  .user-toolbar(v-click-outside="onOutsideClick")
    ui-clickable.user-info(@click="open = !open")
      .name.text-overflow
        | {{ name }}
      .role.text-overflow
        | {{ role }}
    .user-toolbar-menu(:class="{ open }")
      flat-button(color="RED" fixed-width @click="onLogoutClick")
        | Abmelden
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UiClickable from '@/components/clickables/Clickable.global.vue';
import FlatButton from '@/components/clickables/FlatButton.global.vue';
import { StringProp } from '@/util/prop-decorators';

@Component({ components: { UiClickable, FlatButton } })
export default class UserToolbar extends Vue {
  @StringProp()
  private readonly name!: string;
  @StringProp()
  private readonly role!: string;

  private open: boolean = false;

  private onOutsideClick(event: Event): void {
    if (!this.open) {
      return;
    }

    this.open = false;

    event.stopImmediatePropagation();
    event.preventDefault();
  }

  private onLogoutClick() {
    this.open = false;
    this.$emit('logoutClick');
  }
}
</script>

<style lang="scss" scoped>
.user-toolbar {
  position: relative;
  box-shadow: border-box;
  padding: 0 35px;
  max-width: 200px;
  height: 100%;
}
.user-info {
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  z-index: 110;
  text-align: right;
}
.text-overflow {
  @include textOverflow();
}
.name {
  font-size: fontSize(fs-base);
  line-height: lineHeight(lh-100);
}
.role {
  font-size: fontSize(fs-base);

  line-height: lineHeight(lh-100);
  color: colorVodafone(vodafone-red);
}
.user-toolbar-menu {
  position: absolute;
  top: -10000px;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  box-sizing: border-box;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.13);
  border-radius: 4px;
  padding: 96px 35px 30px 35px;
  width: fit-content;
  min-width: 100%;
  z-index: 100;
  background-color: colorVodafone(white);
  opacity: 0;
  transition: opacity 0.3s linear, top 1ms 0.3s linear;
}
.user-toolbar-menu.open {
  top: 0;
  opacity: 1;
  transition: opacity 0.3s linear, top 1ms linear;
}
</style>
