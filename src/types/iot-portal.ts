/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * Severity of an alert.
 * 
 * - `WARNING`: Warning
 * - `ALERT`: Alert
 */
export enum AlertSeverity {
  ALERT = "ALERT",
  WARNING = "WARNING",
}

/**
 * The state of a binding process of a device.
 * 
 * - `IDLE`: Ready to start process.
 * - `STARTED`
 * - `IN_PROGRESS`
 * - `WAITING`: Waiting for user action. For example start pairing mode on
 *   device.
 * - `DONE`
 * - `FAILED`
 */
export enum BindingProcessState {
  DONE = "DONE",
  FAILED = "FAILED",
  IDLE = "IDLE",
  IN_PROGRESS = "IN_PROGRESS",
  STARTED = "STARTED",
  WAITING = "WAITING",
}

/**
 * The type of a node which has a type floor:
 * 
 * - `ROOF`: Which are located in the `ROOF`.
 * - `OVERGROUND`: Which are located in the `OVERGROUND`.
 * - `UNDERGROUND`: Which are located in the `UNDERGROUND`.
 */
export enum FloorType {
  OVERGROUND = "OVERGROUND",
  ROOF = "ROOF",
  UNDERGROUND = "UNDERGROUND",
}

/**
 * State of a gateway.
 * 
 * - `UNKNOWN`
 * - `ONLINE`
 * - `OFFLINE`
 */
export enum GatewayState {
  OFFLINE = "OFFLINE",
  ONLINE = "ONLINE",
  UNKNOWN = "UNKNOWN",
}

/**
 * Switch state of a lamp.
 * 
 * - `ON`: On
 * - `OFF`: Off
 */
export enum LampState {
  OFF = "OFF",
  ON = "ON",
}

/**
 * The kind of a metric.
 * 
 * - `CONTINUOUS`: A set of continuous data points, which may be inter-
 *   and/or extrapolated.
 * - `DISCRETE`: A set of discrete data points, which represent the state of
 *   the measured object, e.g. on/off.
 */
export enum MetricKind {
  CONTINUOUS = "CONTINUOUS",
  DISCRETE = "DISCRETE",
}

/**
 * The type of a node.
 * 
 * - `DIRECTORY`: An arbitrary organizational node. Can be a root node or the
 *   child of another node of type `DIRECTORY`.
 * - `PROPERTY`: A building with a specific master gateway. Can be a root
 *   node or the child of another node of type `DIRECTORY`.
 * - `FLOOR`: A floor inside a building. Can be a child of another node of
 *   type `PROPERTY`.
 * - `APARTMENT`: An apartment on a floor. Can be a child of another node of
 *   type `FLOOR`.
 * - `ROOM`: A room on a floor or inside an apartment: Can be a child of
 *   another node of type `FLOOR` or `APARTMENT`.
 * - `SPOT`: A spot is a mounting point for sensors in rooms: Can be a child of
 *   another node of type `ROOM`.
 */
export enum NodeType {
  APARTMENT = "APARTMENT",
  DIRECTORY = "DIRECTORY",
  FLOOR = "FLOOR",
  PROPERTY = "PROPERTY",
  ROOM = "ROOM",
  SPOT = "SPOT",
}

/**
 * Ordering of a collection.
 * 
 * - `ASC`: Ascending
 * - `DESC`: Descending
 */
export enum Order {
  ASC = "ASC",
  DESC = "DESC",
}

/**
 * Unit of time.
 * 
 * - `DAY`: Day
 * - `HOUR`: Hour
 * - `MINUTE`: Minute
 * - `SECOND`: Second
 */
export enum TimeUnit {
  DAY = "DAY",
  HOUR = "HOUR",
  MINUTE = "MINUTE",
  SECOND = "SECOND",
}

/**
 * Role for this user, string value matches the name of the rule in keycloak.
 * 
 * - `ADMIN`: Admin
 * - `EXPERT`: Expert
 * - `USER`: User
 */
export enum UserRole {
  ADMIN = "ADMIN",
  EXPERT = "EXPERT",
  USER = "USER",
}

export interface AddContractInput {
  externalId: string;
  customerId: string;
}

export interface AddCustomerInput {
  name: string;
  externalId?: string | null;
}

export interface AddDeviceInput {
  siteId: string;
  role: string;
  meta?: AddDeviceMetaInput | null;
}

export interface AddDeviceMetaInput {
  mountingNotes?: string | null;
  notes?: string | null;
  manufacturer?: string | null;
  serial?: string | null;
  encryptionKey?: string | null;
  modelNumber?: string | null;
  calibrationPeriod?: DateTime | null;
}

/**
 * The data object describing the user to add.
 */
export interface AddUserInput {
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
}

export interface ChangeWifiConfigurationInput {
  id: string;
  configuration?: WifiConfigurationInput | null;
}

export interface DataSetDescriptorInput {
  deviceId: string;
  name: string;
  kind?: MetricKind | null;
  order?: Order | null;
  dateFilter?: DateFilterInput | null;
  resolution?: ResolutionInput | null;
}

export interface DateFilterInput {
  gte?: DateTime | null;
  gt?: DateTime | null;
  lt?: DateTime | null;
  lte?: DateTime | null;
}

export interface MetricDescriptorInput {
  deviceId: string;
  name: string;
  kind?: MetricKind | null;
}

export interface ResolutionInput {
  unit: TimeUnit;
  amount: number;
}

export interface SetAllowedAppsForUserInput {
  id: string;
  apps: string[];
}

export interface StartBindingProcessInput {
  deviceId: string;
  options?: StartBindingProcessOptionsInput | null;
}

export interface StartBindingProcessOptionsInput {
  manufacturer?: string | null;
  serial?: string | null;
  encryptionKey?: string | null;
}

export interface SwitchLampInput {
  deviceId: string;
  state: LampState;
}

export interface WifiConfigurationInput {
  ssid: string;
  encryptionKey: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
