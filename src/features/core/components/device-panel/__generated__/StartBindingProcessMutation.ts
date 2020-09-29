/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { StartBindingProcessInput } from "./../../../../../types/iot-portal";

// ====================================================
// GraphQL mutation operation: StartBindingProcessMutation
// ====================================================

export interface StartBindingProcessMutation_startBindingProcess {
  __typename: "BindingProcess";
  id: string;
}

export interface StartBindingProcessMutation {
  /**
   * Bind a device.
   */
  startBindingProcess: StartBindingProcessMutation_startBindingProcess;
}

export interface StartBindingProcessMutationVariables {
  input: StartBindingProcessInput;
}
