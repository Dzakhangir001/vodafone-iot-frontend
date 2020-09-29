/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { StartBindingProcessInput } from "./../../../../../types/iot-portal";

// ====================================================
// GraphQL mutation operation: AppManagerStartBindingProcessMutation
// ====================================================

export interface AppManagerStartBindingProcessMutation_startBindingProcess {
  __typename: "BindingProcess";
  id: string;
}

export interface AppManagerStartBindingProcessMutation {
  /**
   * Bind a device.
   */
  startBindingProcess: AppManagerStartBindingProcessMutation_startBindingProcess;
}

export interface AppManagerStartBindingProcessMutationVariables {
  input: StartBindingProcessInput;
}
