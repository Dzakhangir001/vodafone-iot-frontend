/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AlertSeverity } from "./../../../../../types/iot-portal";

// ====================================================
// GraphQL fragment: AlertPanelFragment
// ====================================================

export interface AlertPanelFragment_items_device_meta {
  __typename: "DeviceMeta";
  serial: string | null;
}

export interface AlertPanelFragment_items_device_site {
  __typename: "Node";
  id: string;
  name: string;
}

export interface AlertPanelFragment_items_device {
  __typename: "Device";
  id: string;
  role: string;
  meta: AlertPanelFragment_items_device_meta;
  site: AlertPanelFragment_items_device_site;
}

export interface AlertPanelFragment_items {
  __typename: "Alert";
  device: AlertPanelFragment_items_device;
  startDate: DateTime;
  name: string;
  severity: AlertSeverity;
}

export interface AlertPanelFragment {
  __typename: "AlertCollection";
  items: AlertPanelFragment_items[];
}
