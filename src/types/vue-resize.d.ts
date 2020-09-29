declare module 'vue-resize' {
  import { PluginFunction, Component } from 'vue';

  const plugin: PluginFunction<void>;
  export default plugin;

  export const ResizeObserver: Component;
}
