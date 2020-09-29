/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { NodeType } from "./../../../../../types/iot-portal";

// ====================================================
// GraphQL fragment: AppSmokeDetectorFilesFragment
// ====================================================

export interface AppSmokeDetectorFilesFragment_files_items_context {
  __typename: "SmokeDetectorProtocolNode";
  type: NodeType;
  name: string;
}

export interface AppSmokeDetectorFilesFragment_files_items_devices_checks {
  __typename: "SmokeDetectorProtocolCheck";
  name: string;
  ok: boolean;
}

export interface AppSmokeDetectorFilesFragment_files_items_devices_site {
  __typename: "SmokeDetectorProtocolNode";
  name: string;
}

export interface AppSmokeDetectorFilesFragment_files_items_devices {
  __typename: "SmokeDetectorProtocolDevice";
  serial: string;
  checks: AppSmokeDetectorFilesFragment_files_items_devices_checks[];
  site: AppSmokeDetectorFilesFragment_files_items_devices_site;
}

export interface AppSmokeDetectorFilesFragment_files_items {
  __typename: "SmokeDetectorProtocol";
  id: string;
  createdAt: DateTime;
  context: AppSmokeDetectorFilesFragment_files_items_context[];
  devices: AppSmokeDetectorFilesFragment_files_items_devices[];
}

export interface AppSmokeDetectorFilesFragment_files {
  __typename: "SmokeDetectorProtocolCollection";
  items: AppSmokeDetectorFilesFragment_files_items[];
  count: number;
}

export interface AppSmokeDetectorFilesFragment {
  __typename: "Query";
  /**
   * Retrieve multiple smoke detector protocols.
   */
  files: AppSmokeDetectorFilesFragment_files;
}
