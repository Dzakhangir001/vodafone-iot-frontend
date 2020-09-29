<template lang="pug">
  ui-flex(justify="space-between")
    ui-cell(basis="auto" :max="270")
      .input-container
        .multiselect
          nodes-multi-select-item(
            :data="leftColumn"
            :selected="leftSelected"
            :bus="bus"
            side="left"
            depth='0'
          )
    ui-cell(basis="auto" :max="70" :min="70")
      ui-flex(align="center" justify="center").buttons-container
        button(@click="moveSelected")
          img(:src="arrowRight")
        button(@click="moveAll")
          img(:src="arrowRightDouble")
        button(@click="removeSelcted")
          img(:src="arrowLeft")
        button(@click="removeAll")
          img(:src="arrowLeftDouble")
    ui-cell(basis="auto")
      .input-container
        .multiselect
          nodes-multi-select-item(
            :data="rightColumn"
            :selected="rightSelected"
            :bus="bus"
            side="right"
          )
</template>

<script lang="ts">
import { ArrayProp } from '@/util/prop-decorators';
import { find } from 'lodash';
import { Component, Vue } from 'vue-property-decorator';
import arrowLeft from './arrow-left.svg';
import arrowLeftDouble from './arrow-left-double.svg';
import arrowRight from './arrow-right.svg';
import arrowRightDouble from './arrow-right-double.svg';
import NodesMultiSelectItem from './NodesMultiSelectItem.vue';

interface Data {
  id: number;
  label: string;
  data?: Data[];
}

@Component({
  components: {
    NodesMultiSelectItem,
  },
  data() {
    return {
      leftSelected: [],
      rightColumn: [],
      rightSelected: [],
      tempItemLeft: undefined,
      tempItemRight: undefined,
    };
  },
})
export default class RolesAndPermissionsMultiSelect extends Vue {
  @ArrayProp()
  private leftColumn!: Data[];

  private leftSelected!: Data[];
  private rightColumn!: Data[];
  private rightSelected!: Data[];
  private tempItemLeft?: Data;
  private tempItemRight?: Data;

  private arrowLeft = arrowLeft;
  private arrowLeftDouble = arrowLeftDouble;
  private arrowRight = arrowRight;
  private arrowRightDouble = arrowRightDouble;

  private bus = new Vue();

  private get flatLeftColumn() {
    const result: Data[] = [];

    function flat(data: Data[], parentLabel: string) {
      data.forEach((item) => {
        let label = parentLabel === '' ? item.label : parentLabel + '/' + item.label;
        result.push({
          id: item.id,
          label: label,
        });
        if (item.data) {
          flat(item.data, label);
        }
      });
    }
    flat(this.leftColumn, '');

    return result;
  }

  private updateSelected(item: Data, side: string) {
    if (side === 'left') {
      this.leftSelected.push(item);
    } else {
      this.rightSelected.push(item);
    }
  }

  private removeSelected(item: Data, side: string) {
    if (side === 'left') {
      this.leftSelected = this.leftSelected.filter((selected) => selected !== item);
    } else {
      this.rightSelected = this.rightSelected.filter((selected) => selected !== item);
    }
  }

  private moveSelected() {
    if (this.leftSelected.length > 0) {
      this.leftSelected.forEach((selected) => {
        this.findNode(this.leftColumn, selected.id, 'left');
        this.findNode(this.rightColumn, selected.id, 'right');
        if (this.tempItemLeft && !this.tempItemRight) {
          this.rightColumn.push(this.tempItemLeft);
        }
      });
      this.leftSelected = [];
      this.tempItemLeft = undefined;
      this.tempItemRight = undefined;
    }
  }

  private removeSelcted() {
    if (this.rightSelected.length > 0) {
      this.rightSelected.forEach((selected) => {
        this.findNode(this.rightColumn, selected.id, 'right');
        if (this.rightColumn) {
          this.rightColumn = this.rightColumn.filter((item) => item.id !== selected.id);
        }
      });
      this.rightSelected = [];
      this.tempItemRight = undefined;
    }
  }

  private moveAll() {
    this.rightColumn = this.flatLeftColumn;
    this.rightSelected = [];
    this.leftSelected = [];
  }

  private removeAll() {
    this.rightColumn = [];
  }

  private findNode(data: Data[], id: number, side: string): void {
    data.forEach((item) => {
      if (item.id === id) {
        if (side === 'left') {
          this.tempItemLeft = find(this.flatLeftColumn, { id: item.id });
        } else {
          this.tempItemRight = item;
        }
      } else if (item.data) {
        this.findNode(item.data, id, side);
      }
    });
  }

  public created() {
    this.bus.$on('updateSelected', (item: Data, side: string) => this.updateSelected(item, side));
    this.bus.$on('removeSelected', (item: Data, side: string) => this.removeSelected(item, side));
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
