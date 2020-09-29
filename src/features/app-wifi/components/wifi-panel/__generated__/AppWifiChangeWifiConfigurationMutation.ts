/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ChangeWifiConfigurationInput } from "./../../../../../types/iot-portal";

// ====================================================
// GraphQL mutation operation: AppWifiChangeWifiConfigurationMutation
// ====================================================

export interface AppWifiChangeWifiConfigurationMutation_changeWifiConfiguration {
  __typename: "Wifi";
  id: string;
}

export interface AppWifiChangeWifiConfigurationMutation {
  /**
   * Update Wifi SSID and/or encryption key.
   */
  changeWifiConfiguration: AppWifiChangeWifiConfigurationMutation_changeWifiConfiguration;
}

export interface AppWifiChangeWifiConfigurationMutationVariables {
  input: ChangeWifiConfigurationInput;
}
