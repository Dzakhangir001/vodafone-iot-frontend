import { StringProp } from '@/util/prop-decorators';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class FilterPropMixin extends Vue {
  @StringProp()
  protected readonly filter?: string;
}
