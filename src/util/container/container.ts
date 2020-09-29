import { Name } from './name';
import { Definition, Factory } from './definition';
import { build, load } from './builder';

export type SafeGet<V = unknown> = <T extends V>(name: Name<T>) => T;
type ResolvedMap = Map<Name, any>;
type Resolver = (value: any) => void;

export async function container(context: __WebpackModuleApi.RequireContext): Promise<SafeGet> {
  const builders = await Promise.all([...load(context)]);
  const definition = build(builders);
  const resolved = await resolve(definition);

  return createSafeNameMapGetter(resolved);
}

// TODO detect deadlocks
async function resolve(definition: Definition): Promise<ResolvedMap> {
  const resolved: ResolvedMap = new Map();

  const deps = new Map<Name, Promise<any>>();
  const resolvers = new Map<Name, Resolver>();
  const get = createSafeNameMapGetter(deps);

  for (const map of [definition.options, definition.providers]) {
    for (const name of map.keys()) {
      deps.set(name, new Promise((resolve) => void resolvers.set(name, resolve)));
    }
  }

  const running = new Array<Promise<unknown>>();

  function execute(factory: Factory<any>): Promise<any> {
    return factory(get);
  }

  function resolver(name: Name): (value: any) => void {
    return (value) => {
      resolved.set(name, value);

      const resolve = resolvers.get(name);
      if (resolve) {
        resolve(value);
        resolvers.delete(name);
      }
    };
  }

  for (const [name, factories] of definition.options) {
    running.push(Promise.all(factories.map(execute)).then(resolver(name)));
  }

  for (const [name, factory] of definition.providers) {
    running.push(factory(get).then(resolver(name)));
  }

  for (const configurator of definition.configurators) {
    running.push(configurator(get));
  }

  await Promise.all(running);

  return resolved;
}

function createSafeNameMapGetter<V>(map: Map<Name, V>): SafeGet<V> {
  return (key) => {
    const value = map.get(key);

    if (!value) {
      throw new Error(`${name} not found`);
    }

    return value as any;
  };
}
