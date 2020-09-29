import { toLength } from '@/util/css-length';
import { IntegerProp, LengthProp } from '@/util/prop-decorators';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class FlexChildStyle extends Vue {
  @LengthProp()
  public min?: number | string;
  @LengthProp()
  public max?: number | string;
  @LengthProp()
  public basis?: number | string;
  @IntegerProp(false, 0)
  public grow?: number;
  @IntegerProp(false, 0)
  public shrink?: number;

  public get flexChildStyle(): Record<string, string | number | undefined> {
    return {
      flexGrow: this.grow,
      flexShrink: this.shrink,
      flexBasis: toLength(this.basis),
      minWidth: toLength(this.min),
      maxWidth: toLength(this.max),
    };
  }
}
