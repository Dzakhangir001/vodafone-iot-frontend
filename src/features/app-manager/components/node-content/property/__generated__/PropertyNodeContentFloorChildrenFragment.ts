/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { NodeType, AlertSeverity } from "./../../../../../../types/iot-portal";

// ====================================================
// GraphQL fragment: PropertyNodeContentFloorChildrenFragment
// ====================================================

export interface PropertyNodeContentFloorChildrenFragment_devices_alerts {
  __typename: "AlertCollection";
  count: number;
  /**
   * Highest severity of alerts.
   */
  severity: AlertSeverity | null;
}

export interface PropertyNodeContentFloorChildrenFragment_devices {
  __typename: "Device";
  id: string;
  role: string;
  alerts: PropertyNodeContentFloorChildrenFragment_devices_alerts;
}

export interface PropertyNodeContentFloorChildrenFragment_alerts {
  __typename: "AlertCollection";
  count: number;
  /**
   * Highest severity of alerts.
   */
  severity: AlertSeverity | null;
}

export interface PropertyNodeContentFloorChildrenFragment_gateways {
  __typename: "Gateway";
  id: string;
}

export interface PropertyNodeContentFloorChildrenFragment {
  __typename: "Node";
  id: string;
  type: NodeType;
  name: string;
  devices: PropertyNodeContentFloorChildrenFragment_devices[];
  alerts: PropertyNodeContentFloorChildrenFragment_alerts;
  gateways: PropertyNodeContentFloorChildrenFragment_gateways[];
}
