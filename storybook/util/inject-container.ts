import { StoryDecorator } from '@storybook/vue';
import { CreateElement, VNode } from 'vue';
import { Component, Vue, Provide } from 'vue-property-decorator';
import { Container, Name } from '@/util/container';
import { CONTAINER } from '@/features/core/container';

const CONTAINER_ERROR = (): never => {
  throw new Error('Container not available yet');
};

export default function injectContainer(container: () => Promise<Container>): StoryDecorator {
  return (story) => {
    @Component({ components: { story: story() } })
    class Injector extends Vue {
      private get: Container = CONTAINER_ERROR;

      @Provide(CONTAINER)
      public container(name: Name): ReturnType<Container> {
        return this.get(name);
      }

      public async created(): Promise<void> {
        this.get = await container();
      }

      public render(h: CreateElement): VNode {
        return this.get === CONTAINER_ERROR ? h() : h('story');
      }
    }

    return Injector as any;
  };
}
