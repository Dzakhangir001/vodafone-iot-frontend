import { ObjectProp } from '@/util/prop-decorators';
import { Component, Vue } from 'vue-property-decorator';
import { DevicePanelQuery } from '../device-panel/__generated__/DevicePanelQuery';

@Component
export default class DevicePanelDataMixin extends Vue {
  @ObjectProp(true)
  protected readonly device!: DevicePanelQuery['data'];
}
