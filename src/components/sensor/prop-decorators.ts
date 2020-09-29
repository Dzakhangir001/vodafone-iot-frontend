import { EnumProp } from '@/util/prop-decorators';
import { Prop } from 'vue-property-decorator';

type PropDecorator = ReturnType<typeof Prop>;

export type ConnectionStatus = 'GREEN' | 'RED' | 'GRAY' | 'NONE';
export function ConnectionStatusProp(def: boolean | ConnectionStatus = true): PropDecorator {
  return EnumProp(def, 'GREEN', 'RED', 'GRAY', 'NONE');
}

export type BatteryStatus = 'GREEN' | 'RED' | 'GRAY' | 'NONE';
export function BatteryStatusProp(def: boolean | BatteryStatus = true): PropDecorator {
  return EnumProp(def, 'GREEN', 'RED', 'GRAY', 'NONE');
}
