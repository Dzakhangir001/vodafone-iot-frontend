import { Component, Mixins } from 'vue-property-decorator';
import { Location } from 'vue-router';
import { APP_MAP } from '../../container';
import { App } from '../../model';
import { NodeLocationGeneratorFragment } from '../../router/node-location-generator';
import AppPropertyMixin from './app-property';
import ContainerMixin from './container';

@Component
export default class NodeLocationGeneratorMixin extends Mixins(AppPropertyMixin, ContainerMixin) {
  private get appMap(): Record<string, App> {
    return this.container(APP_MAP);
  }

  protected generateNodeLocation(
    node: NodeLocationGeneratorFragment,
    params?: Record<string, any>,
  ): string | Location | undefined {
    return this.doGenerate(this.app, node, params);
  }

  protected generateAppNodeLocation(
    appName: string,
    node: NodeLocationGeneratorFragment,
    params?: Record<string, any>,
  ): string | Location | undefined {
    return this.doGenerate(this.appMap[appName], node, params);
  }

  protected pushNodeLocation(node: NodeLocationGeneratorFragment, params?: Record<string, any>): void {
    this.doPush(this.app, node, params);
  }

  protected pushAppNodeLocation(
    appName: string,
    node: NodeLocationGeneratorFragment,
    params?: Record<string, any>,
  ): void {
    this.doPush(this.appMap[appName], node, params);
  }

  private doGenerate(
    app: App | undefined,
    node: NodeLocationGeneratorFragment,
    params?: Record<string, any>,
  ): string | Location | undefined {
    return app && app.generateNodeLocation ? app.generateNodeLocation(node, params) : undefined;
  }

  private doPush(app: App | undefined, node: NodeLocationGeneratorFragment, params?: Record<string, any>): void {
    const location = this.doGenerate(app, node, params);

    if (!location) {
      return;
    }

    this.$router.push(location);
  }
}
