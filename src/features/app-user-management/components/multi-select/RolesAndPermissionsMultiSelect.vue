<template lang="pug">
  ui-flex(justify="space-between")
    ui-cell(basis="auto" :max="270")
      .input-container
        .multiselect
          div(v-for="column in leftColumn")
            h4
              | {{ column.name }}
            ul
              li(
                v-for="data in column.data"
                @click="toggleSelectedFromLeftColumn(column.name, data)"
                :class="{'selected': isSelectedFromLeftColumn(column.name, data)}"
              )
                | {{ data.label }}
    ui-cell(basis="auto" :max="70" :min="70")
      ui-flex(align="center" justify="center").buttons-container
        button(@click="moveToRight")
          img(:src="arrowRight")
        button(@click="moveAllToRight")
          img(:src="arrowRightDouble")
        button(@click="moveToLeft")
           img(:src="arrowLeft")
        button(@click="moveAllToLeft")
          img(:src="arrowLeftDouble")
    ui-cell(basis="auto" :max="270")
      .input-container
        .multiselect
          div(v-for="column in rightColumn")
            h4
              | {{ column.name }}
            ul
              li(
                  v-for="data in column.data"
                  @click="toggleSelectedFromRightColumn(column.name, data)"
                  :class="{'selected': isSelectedFromRightColumn(column.name, data)}"
                )
                | {{ data.label }}
</template>

<script lang="ts">
import { ArrayProp } from '@/util/prop-decorators';
import { find } from 'lodash';
import { Component, Vue, Inject } from 'vue-property-decorator';
import arrowLeft from './arrow-left.svg';
import arrowLeftDouble from './arrow-left-double.svg';
import arrowRight from './arrow-right.svg';
import arrowRightDouble from './arrow-right-double.svg';
import { ADD_USER_WIZARD, UserData, AppPermission, AppPermissionList } from '../add-user-wizard/model';
import AddUserWizard from '../add-user-wizard/AddUserWizard.global.vue';
import { APPS } from '../../../core/container';
import { isDef } from '../../../../util/lang';

@Component
export default class MultiSelect extends Vue {
  private arrowLeft = arrowLeft;
  private arrowLeftDouble = arrowLeftDouble;
  private arrowRight = arrowRight;
  private arrowRightDouble = arrowRightDouble;

  @ArrayProp()
  private leftColumn!: AppPermissionList[];
  private selectedLeftColumn: AppPermissionList[] = [];
  private selectedRightColumn: AppPermissionList[] = [];
  private rightColumn: AppPermissionList[] = [];

  @Inject(ADD_USER_WIZARD)
  private getAddUserWizard!: AddUserWizard['getAddUserWizard'];

  private get userData(): UserData {
    return this.getAddUserWizard().userData;
  }

  mounted() {
    this.getColumnsFromUserData();
  }

  private getColumnsFromUserData(): void {
    if (this.userData.setAllowedAppsForUser.apps.length > 0) {
      const knownPermissions = this.leftColumn.flatMap(({ data }) => data);
      const appPermissions = this.userData.setAllowedAppsForUser.apps
        .map((app) => knownPermissions.find(({ name }) => name === app))
        .filter(isDef);

      this.rightColumn.push({
        name: 'Apps',
        data: appPermissions,
      });
    }
  }

  private isSelectedFromLeftColumn(name: string, item: AppPermission): boolean {
    const selectedLeftColumn = find(this.selectedLeftColumn, { name });
    if (selectedLeftColumn) {
      return !!find(selectedLeftColumn['data'], { ...item });
    }
    return false;
  }

  private isSelectedFromRightColumn(name: string, item: AppPermission): boolean {
    const selectedRightColumn = find(this.selectedRightColumn, { name });
    if (selectedRightColumn) {
      return !!find(selectedRightColumn['data'], { ...item });
    }
    return false;
  }

  private toggleSelectedFromLeftColumn(name: string, data: AppPermission): void {
    let selectedLeftColumn = find(this.selectedLeftColumn, { name });
    if (!selectedLeftColumn) {
      this.selectedLeftColumn.push({
        name: name,
        data: [data],
      });
    } else {
      if (!find(selectedLeftColumn['data'], { ...data })) {
        selectedLeftColumn['data'].push(data);
      } else {
        selectedLeftColumn.data = selectedLeftColumn['data'].filter((e) => e !== data);
      }
    }
  }

  private toggleSelectedFromRightColumn(name: string, data: AppPermission): void {
    let selectedRightColumn = find(this.selectedRightColumn, { name });
    if (!selectedRightColumn) {
      this.selectedRightColumn.push({
        name: name,
        data: [data],
      });
    } else {
      if (!find(selectedRightColumn['data'], { ...data })) {
        selectedRightColumn['data'].push(data);
      } else {
        selectedRightColumn.data = selectedRightColumn['data'].filter((e) => e !== data);
      }
    }
  }

  private moveAllToRight(): void {
    if (this.leftColumn.length > 0) {
      this.leftColumn.forEach((el) => {
        const rightColumn = find(this.rightColumn, { name: el.name });
        if (rightColumn) {
          rightColumn.data.push(...el.data);
        } else {
          this.rightColumn.push({
            ...el,
          });
        }
      });
      this.leftColumn = [];
      this.selectedRightColumn = [];
      this.selectedLeftColumn = [];
      this.addAppPermissionsToUserData();
    }
  }

  private moveAllToLeft(): void {
    if (this.rightColumn.length > 0) {
      this.rightColumn.forEach((el) => {
        const leftColumn = find(this.leftColumn, { name: el.name });
        if (leftColumn) {
          leftColumn.data.push(...el.data);
        } else {
          this.leftColumn.push({
            ...el,
          });
        }
      });
      this.rightColumn = [];
      this.selectedRightColumn = [];
      this.selectedLeftColumn = [];
      this.addAppPermissionsToUserData();
    }
  }

  private moveToRight(): void {
    if (this.selectedLeftColumn.length > 0) {
      this.selectedLeftColumn.forEach((selectedPermission) => {
        const rightColumn = find(this.rightColumn, { name: selectedPermission.name });
        const leftColumn = find(this.leftColumn, { name: selectedPermission.name });
        if (leftColumn) {
          leftColumn.data = leftColumn.data.filter((el) => {
            return !selectedPermission.data.includes(el);
          });
        }
        if (rightColumn) {
          selectedPermission.data.forEach((data) => {
            if (!rightColumn['data'].includes(data)) {
              rightColumn['data'].push(data);
            }
          });
        } else {
          this.rightColumn.push({
            ...selectedPermission,
          });
        }
      });
      this.addAppPermissionsToUserData();
      this.selectedLeftColumn = [];
    }
  }

  private moveToLeft(): void {
    if (this.selectedRightColumn.length > 0) {
      this.selectedRightColumn.forEach((assignedPermission) => {
        const leftColumn = find(this.leftColumn, { name: assignedPermission.name });
        const rightColumn = find(this.rightColumn, { name: assignedPermission.name });
        if (rightColumn) {
          rightColumn.data = rightColumn.data.filter((el) => {
            return !assignedPermission.data.includes(el);
          });
        }
        if (leftColumn) {
          assignedPermission.data.forEach((data) => {
            if (!leftColumn['data'].includes(data)) {
              leftColumn['data'].push(data);
            }
          });
        } else {
          this.leftColumn.push({
            ...assignedPermission,
          });
        }
      });
      this.addAppPermissionsToUserData();
      this.selectedRightColumn = [];
    }
  }

  private addAppPermissionsToUserData(): void {
    this.userData.setAllowedAppsForUser.apps = this.getUserPermissions();
  }

  private getUserPermissions(): string[] {
    let permissionArray: string[] = [];
    this.rightColumn.forEach((ele) => {
      ele.data.forEach((permission) => {
        permissionArray.push(permission.name);
      });
    });
    return permissionArray;
  }
}
</script>

<style lang="scss" scoped>
button {
  margin-top: 10px;
  width: 65px;
  height: 25px;
  border-radius: 3px;
  border: none;
  background-color: colorVodafone(vodafone-red);
  color: colorVodafone(white);
}
.multiselect {
  display: block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.18);
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.18);
  width: calc(100% + 4px);
  margin: 0 -2px;
  border-radius: 4px;
  border: 2px solid #ffffff;
  padding: 10px;
  background-color: #ededed;
  font-weight: 700;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  min-height: 350px;
}
.selected {
  background-color: #c5c5c5;
}
h4 {
  color: colorVodafone(vodafone-red);
}
ul {
  padding: 0;
  li {
    list-style-type: none;
    cursor: pointer;
  }
}
.buttons-container {
  margin-top: 25px;
  max-height: 150px;
}
</style>
