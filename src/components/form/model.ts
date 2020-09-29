import { TimeUnit } from '@/types/iot-portal';

export interface SelectOption {
  value: string | number | TimeUnit | undefined;
  label: string;
  icon?: string;
}
