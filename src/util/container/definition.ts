import { Name } from './name';
import { OptionName } from './option';

type Get = <T>(name: Name<T>) => Promise<T>;
export type Factory<T = any> = (get: Get) => Promise<T>;
export type Configurator = (get: Get) => Promise<void>;

export interface Definition {
  options: Map<OptionName, Factory[]>;
  providers: Map<Name, Factory>;
  configurators: Set<Configurator>;
}
