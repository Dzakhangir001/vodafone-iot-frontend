export interface BindingConfig {
  siteId: string;
  mountingNotes?: string;
  notes?: string;
  role: string;
  manufacturer: string;
  serial: string;
  encryptionKey?: string;
}

export interface Option {
  value: string;
  label: string;
  icon?: string;
}

export type AddAction = (config: BindingConfig) => Promise<void>;
