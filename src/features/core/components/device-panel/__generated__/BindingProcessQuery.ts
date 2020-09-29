/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { BindingProcessState } from "./../../../../../types/iot-portal";

// ====================================================
// GraphQL query operation: BindingProcessQuery
// ====================================================

export interface BindingProcessQuery_bindingProcess {
  __typename: "BindingProcess";
  id: string;
  state: BindingProcessState;
  started: DateTime | null;
  message: string | null;
}

export interface BindingProcessQuery {
  bindingProcess: BindingProcessQuery_bindingProcess;
}

export interface BindingProcessQueryVariables {
  deviceId: string;
}
