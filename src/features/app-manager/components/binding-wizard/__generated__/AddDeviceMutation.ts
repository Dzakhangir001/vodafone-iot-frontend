/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AddDeviceInput } from "./../../../../../types/iot-portal";

// ====================================================
// GraphQL mutation operation: AddDeviceMutation
// ====================================================

export interface AddDeviceMutation_addDevice {
  __typename: "Device";
  id: string;
}

export interface AddDeviceMutation {
  /**
   * Add a device.
   */
  addDevice: AddDeviceMutation_addDevice;
}

export interface AddDeviceMutationVariables {
  input: AddDeviceInput;
}
