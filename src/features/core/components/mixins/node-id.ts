import { StringProp } from '@/util/prop-decorators';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class NodeIdMixin extends Vue {
  @StringProp(true)
  protected readonly nodeId!: string;
}
