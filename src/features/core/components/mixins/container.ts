import { Container } from '@/util/container';
import { Component, Inject, Vue } from 'vue-property-decorator';
import { CONTAINER } from '../../container';

@Component
export default class ContainerMixin extends Vue {
  @Inject(CONTAINER)
  protected readonly container!: Container;
}
