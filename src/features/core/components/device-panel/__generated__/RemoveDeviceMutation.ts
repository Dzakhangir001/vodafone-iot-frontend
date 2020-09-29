/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveDeviceMutation
// ====================================================

export interface RemoveDeviceMutation {
  /**
   * Remove a device.
   * 
   * Returns `true`, if a device was found and removed, otherwise `false`.
   */
  removeDevice: boolean;
}

export interface RemoveDeviceMutationVariables {
  deviceId: string;
}
