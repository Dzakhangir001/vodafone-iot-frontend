export interface WifiConfiguration {
  ssid: string;
  encryptionKey: string;
}

export type ApplyAction = (config: WifiConfiguration) => Promise<void>;
