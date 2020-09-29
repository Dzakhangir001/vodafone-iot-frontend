import { EnumProp } from '@/util/prop-decorators';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class StateProperty extends Vue {
  @EnumProp('GRAY', 'GREEN', 'RED')
  protected readonly state!: 'GRAY' | 'GREEN' | 'RED';
}
