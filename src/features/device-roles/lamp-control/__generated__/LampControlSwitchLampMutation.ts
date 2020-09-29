/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SwitchLampInput } from "./../../../../types/iot-portal";

// ====================================================
// GraphQL mutation operation: LampControlSwitchLampMutation
// ====================================================

export interface LampControlSwitchLampMutation {
  /**
   * Switch a lamp device on or off.
   */
  switchLamp: boolean;
}

export interface LampControlSwitchLampMutationVariables {
  input: SwitchLampInput;
}
