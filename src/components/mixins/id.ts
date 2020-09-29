import { generateDomId } from '@/util/dom-id';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Id extends Vue {
  public baseId = generateDomId();

  public id(...suffixes: string[]): string {
    const suffix = suffixes.length ? '-' + suffixes.join('-') : '';

    return this.baseId + suffix;
  }

  public idRef(...suffixes: string[]): string {
    return `url(#${this.id(...suffixes)})`;
  }
}
