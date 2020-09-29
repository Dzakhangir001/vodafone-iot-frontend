/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AlertSeverity } from "./../../../../../types/iot-portal";

// ====================================================
// GraphQL fragment: PropertyMapPanelFragment
// ====================================================

export interface PropertyMapPanelFragment_propertyNodes_meta_propertyLocation {
  __typename: "Location";
  longitude: number;
  latitude: number;
}

export interface PropertyMapPanelFragment_propertyNodes_meta {
  __typename: "NodeMeta";
  propertyLocation: PropertyMapPanelFragment_propertyNodes_meta_propertyLocation | null;
}

export interface PropertyMapPanelFragment_propertyNodes_alerts {
  __typename: "AlertCollection";
  count: number;
  /**
   * Highest severity of alerts.
   */
  severity: AlertSeverity | null;
}

export interface PropertyMapPanelFragment_propertyNodes {
  __typename: "Node";
  id: string;
  name: string;
  meta: PropertyMapPanelFragment_propertyNodes_meta;
  alerts: PropertyMapPanelFragment_propertyNodes_alerts;
}

export interface PropertyMapPanelFragment {
  __typename: "Query";
  /**
   * Get a list of nodes.
   */
  propertyNodes: PropertyMapPanelFragment_propertyNodes[];
}
