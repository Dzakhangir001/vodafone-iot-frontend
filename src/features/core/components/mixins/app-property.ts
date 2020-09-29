import { App } from '@core/model';
import { Component, Vue } from 'vue-property-decorator';
import { RootGetter } from '../../store';

@Component
export default class AppPropertyMixin extends Vue {
  @RootGetter('app')
  protected readonly app!: App;
}
