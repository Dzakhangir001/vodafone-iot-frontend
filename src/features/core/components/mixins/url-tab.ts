import { StringProp } from '@/util/prop-decorators';
import { kebabCase } from 'lodash';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class UrlTabMixin extends Vue {
  @StringProp()
  protected readonly tab?: string;

  protected tabs = new Array<string>();

  protected get activeTab(): string | undefined {
    return this.isValidTab(this.tab) ? this.tab : undefined;
  }

  protected set activeTab(value: string | undefined) {
    const activeTab = value === undefined ? undefined : kebabCase(value);
    const { tab, ...params } = this.$route.params;

    if (tab === activeTab) {
      return;
    }

    if (activeTab !== undefined) {
      params.tab = activeTab;
    }

    this.$router.push({ ...this.$route, params });
  }

  protected isValidTab(value: string | undefined): boolean {
    return value === undefined || this.tabs.includes(value);
  }
}
