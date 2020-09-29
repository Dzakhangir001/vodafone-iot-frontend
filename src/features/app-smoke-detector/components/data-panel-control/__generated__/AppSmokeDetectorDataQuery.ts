/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AppSmokeDetectorDataQuery
// ====================================================

export interface AppSmokeDetectorDataQuery_data_devices_site {
  __typename: "Node";
  id: string;
  name: string;
}

export interface AppSmokeDetectorDataQuery_data_devices_meta {
  __typename: "DeviceMeta";
  serial: string | null;
}

export interface AppSmokeDetectorDataQuery_data_devices_Battery_DiscreteMetric {
  __typename: "DiscreteMetric";
}

export interface AppSmokeDetectorDataQuery_data_devices_Battery_ContinuousMetric_latestDataPoint {
  __typename: "ContinuousDataPoint";
  date: DateTime;
  value: number;
}

export interface AppSmokeDetectorDataQuery_data_devices_Battery_ContinuousMetric {
  __typename: "ContinuousMetric";
  latestDataPoint: AppSmokeDetectorDataQuery_data_devices_Battery_ContinuousMetric_latestDataPoint | null;
}

export type AppSmokeDetectorDataQuery_data_devices_Battery = AppSmokeDetectorDataQuery_data_devices_Battery_DiscreteMetric | AppSmokeDetectorDataQuery_data_devices_Battery_ContinuousMetric;

export interface AppSmokeDetectorDataQuery_data_devices_BatteryLow_ContinuousMetric {
  __typename: "ContinuousMetric";
}

export interface AppSmokeDetectorDataQuery_data_devices_BatteryLow_DiscreteMetric_latestDataPoint {
  __typename: "DiscreteDataPoint";
  date: DateTime;
  value: string;
}

export interface AppSmokeDetectorDataQuery_data_devices_BatteryLow_DiscreteMetric {
  __typename: "DiscreteMetric";
  latestDataPoint: AppSmokeDetectorDataQuery_data_devices_BatteryLow_DiscreteMetric_latestDataPoint | null;
}

export type AppSmokeDetectorDataQuery_data_devices_BatteryLow = AppSmokeDetectorDataQuery_data_devices_BatteryLow_ContinuousMetric | AppSmokeDetectorDataQuery_data_devices_BatteryLow_DiscreteMetric;

export interface AppSmokeDetectorDataQuery_data_devices_DustLevel_DiscreteMetric {
  __typename: "DiscreteMetric";
}

export interface AppSmokeDetectorDataQuery_data_devices_DustLevel_ContinuousMetric_latestDataPoint {
  __typename: "ContinuousDataPoint";
  date: DateTime;
  value: number;
}

export interface AppSmokeDetectorDataQuery_data_devices_DustLevel_ContinuousMetric {
  __typename: "ContinuousMetric";
  latestDataPoint: AppSmokeDetectorDataQuery_data_devices_DustLevel_ContinuousMetric_latestDataPoint | null;
}

export type AppSmokeDetectorDataQuery_data_devices_DustLevel = AppSmokeDetectorDataQuery_data_devices_DustLevel_DiscreteMetric | AppSmokeDetectorDataQuery_data_devices_DustLevel_ContinuousMetric;

export interface AppSmokeDetectorDataQuery_data_devices_DustLevelRaw_DiscreteMetric {
  __typename: "DiscreteMetric";
}

export interface AppSmokeDetectorDataQuery_data_devices_DustLevelRaw_ContinuousMetric_latestDataPoint {
  __typename: "ContinuousDataPoint";
  date: DateTime;
  value: number;
}

export interface AppSmokeDetectorDataQuery_data_devices_DustLevelRaw_ContinuousMetric {
  __typename: "ContinuousMetric";
  latestDataPoint: AppSmokeDetectorDataQuery_data_devices_DustLevelRaw_ContinuousMetric_latestDataPoint | null;
}

export type AppSmokeDetectorDataQuery_data_devices_DustLevelRaw = AppSmokeDetectorDataQuery_data_devices_DustLevelRaw_DiscreteMetric | AppSmokeDetectorDataQuery_data_devices_DustLevelRaw_ContinuousMetric;

export interface AppSmokeDetectorDataQuery_data_devices_HeadConnected_ContinuousMetric {
  __typename: "ContinuousMetric";
}

export interface AppSmokeDetectorDataQuery_data_devices_HeadConnected_DiscreteMetric_latestDataPoint {
  __typename: "DiscreteDataPoint";
  date: DateTime;
  value: string;
}

export interface AppSmokeDetectorDataQuery_data_devices_HeadConnected_DiscreteMetric {
  __typename: "DiscreteMetric";
  latestDataPoint: AppSmokeDetectorDataQuery_data_devices_HeadConnected_DiscreteMetric_latestDataPoint | null;
}

export type AppSmokeDetectorDataQuery_data_devices_HeadConnected = AppSmokeDetectorDataQuery_data_devices_HeadConnected_ContinuousMetric | AppSmokeDetectorDataQuery_data_devices_HeadConnected_DiscreteMetric;

export interface AppSmokeDetectorDataQuery_data_devices_HeadFault_ContinuousMetric {
  __typename: "ContinuousMetric";
}

export interface AppSmokeDetectorDataQuery_data_devices_HeadFault_DiscreteMetric_latestDataPoint {
  __typename: "DiscreteDataPoint";
  date: DateTime;
  value: string;
}

export interface AppSmokeDetectorDataQuery_data_devices_HeadFault_DiscreteMetric {
  __typename: "DiscreteMetric";
  latestDataPoint: AppSmokeDetectorDataQuery_data_devices_HeadFault_DiscreteMetric_latestDataPoint | null;
}

export type AppSmokeDetectorDataQuery_data_devices_HeadFault = AppSmokeDetectorDataQuery_data_devices_HeadFault_ContinuousMetric | AppSmokeDetectorDataQuery_data_devices_HeadFault_DiscreteMetric;

export interface AppSmokeDetectorDataQuery_data_devices_OpenClose_ContinuousMetric {
  __typename: "ContinuousMetric";
}

export interface AppSmokeDetectorDataQuery_data_devices_OpenClose_DiscreteMetric_latestDataPoint {
  __typename: "DiscreteDataPoint";
  date: DateTime;
  value: string;
}

export interface AppSmokeDetectorDataQuery_data_devices_OpenClose_DiscreteMetric {
  __typename: "DiscreteMetric";
  latestDataPoint: AppSmokeDetectorDataQuery_data_devices_OpenClose_DiscreteMetric_latestDataPoint | null;
}

export type AppSmokeDetectorDataQuery_data_devices_OpenClose = AppSmokeDetectorDataQuery_data_devices_OpenClose_ContinuousMetric | AppSmokeDetectorDataQuery_data_devices_OpenClose_DiscreteMetric;

export interface AppSmokeDetectorDataQuery_data_devices_SounderFlag_ContinuousMetric {
  __typename: "ContinuousMetric";
}

export interface AppSmokeDetectorDataQuery_data_devices_SounderFlag_DiscreteMetric_latestDataPoint {
  __typename: "DiscreteDataPoint";
  date: DateTime;
  value: string;
}

export interface AppSmokeDetectorDataQuery_data_devices_SounderFlag_DiscreteMetric {
  __typename: "DiscreteMetric";
  latestDataPoint: AppSmokeDetectorDataQuery_data_devices_SounderFlag_DiscreteMetric_latestDataPoint | null;
}

export type AppSmokeDetectorDataQuery_data_devices_SounderFlag = AppSmokeDetectorDataQuery_data_devices_SounderFlag_ContinuousMetric | AppSmokeDetectorDataQuery_data_devices_SounderFlag_DiscreteMetric;

export interface AppSmokeDetectorDataQuery_data_devices_CommsLinkSuccessful_ContinuousMetric {
  __typename: "ContinuousMetric";
}

export interface AppSmokeDetectorDataQuery_data_devices_CommsLinkSuccessful_DiscreteMetric_latestDataPoint {
  __typename: "DiscreteDataPoint";
  date: DateTime;
  value: string;
}

export interface AppSmokeDetectorDataQuery_data_devices_CommsLinkSuccessful_DiscreteMetric {
  __typename: "DiscreteMetric";
  latestDataPoint: AppSmokeDetectorDataQuery_data_devices_CommsLinkSuccessful_DiscreteMetric_latestDataPoint | null;
}

export type AppSmokeDetectorDataQuery_data_devices_CommsLinkSuccessful = AppSmokeDetectorDataQuery_data_devices_CommsLinkSuccessful_ContinuousMetric | AppSmokeDetectorDataQuery_data_devices_CommsLinkSuccessful_DiscreteMetric;

export interface AppSmokeDetectorDataQuery_data_devices_Tamper_ContinuousMetric {
  __typename: "ContinuousMetric";
}

export interface AppSmokeDetectorDataQuery_data_devices_Tamper_DiscreteMetric_latestDataPoint {
  __typename: "DiscreteDataPoint";
  date: DateTime;
  value: string;
}

export interface AppSmokeDetectorDataQuery_data_devices_Tamper_DiscreteMetric {
  __typename: "DiscreteMetric";
  latestDataPoint: AppSmokeDetectorDataQuery_data_devices_Tamper_DiscreteMetric_latestDataPoint | null;
}

export type AppSmokeDetectorDataQuery_data_devices_Tamper = AppSmokeDetectorDataQuery_data_devices_Tamper_ContinuousMetric | AppSmokeDetectorDataQuery_data_devices_Tamper_DiscreteMetric;

export interface AppSmokeDetectorDataQuery_data_devices_EOL_ContinuousMetric {
  __typename: "ContinuousMetric";
}

export interface AppSmokeDetectorDataQuery_data_devices_EOL_DiscreteMetric_latestDataPoint {
  __typename: "DiscreteDataPoint";
  date: DateTime;
  value: string;
}

export interface AppSmokeDetectorDataQuery_data_devices_EOL_DiscreteMetric {
  __typename: "DiscreteMetric";
  latestDataPoint: AppSmokeDetectorDataQuery_data_devices_EOL_DiscreteMetric_latestDataPoint | null;
}

export type AppSmokeDetectorDataQuery_data_devices_EOL = AppSmokeDetectorDataQuery_data_devices_EOL_ContinuousMetric | AppSmokeDetectorDataQuery_data_devices_EOL_DiscreteMetric;

export interface AppSmokeDetectorDataQuery_data_devices_Alarm_ContinuousMetric {
  __typename: "ContinuousMetric";
}

export interface AppSmokeDetectorDataQuery_data_devices_Alarm_DiscreteMetric_latestDataPoint {
  __typename: "DiscreteDataPoint";
  date: DateTime;
  value: string;
}

export interface AppSmokeDetectorDataQuery_data_devices_Alarm_DiscreteMetric {
  __typename: "DiscreteMetric";
  latestDataPoint: AppSmokeDetectorDataQuery_data_devices_Alarm_DiscreteMetric_latestDataPoint | null;
}

export type AppSmokeDetectorDataQuery_data_devices_Alarm = AppSmokeDetectorDataQuery_data_devices_Alarm_ContinuousMetric | AppSmokeDetectorDataQuery_data_devices_Alarm_DiscreteMetric;

export interface AppSmokeDetectorDataQuery_data_devices_AlarmCounter_DiscreteMetric {
  __typename: "DiscreteMetric";
}

export interface AppSmokeDetectorDataQuery_data_devices_AlarmCounter_ContinuousMetric_latestDataPoint {
  __typename: "ContinuousDataPoint";
  date: DateTime;
  value: number;
}

export interface AppSmokeDetectorDataQuery_data_devices_AlarmCounter_ContinuousMetric {
  __typename: "ContinuousMetric";
  latestDataPoint: AppSmokeDetectorDataQuery_data_devices_AlarmCounter_ContinuousMetric_latestDataPoint | null;
}

export type AppSmokeDetectorDataQuery_data_devices_AlarmCounter = AppSmokeDetectorDataQuery_data_devices_AlarmCounter_DiscreteMetric | AppSmokeDetectorDataQuery_data_devices_AlarmCounter_ContinuousMetric;

export interface AppSmokeDetectorDataQuery_data_devices_LastAlarm_ContinuousMetric {
  __typename: "ContinuousMetric";
}

export interface AppSmokeDetectorDataQuery_data_devices_LastAlarm_DiscreteMetric_latestDataPoint {
  __typename: "DiscreteDataPoint";
  date: DateTime;
  value: string;
}

export interface AppSmokeDetectorDataQuery_data_devices_LastAlarm_DiscreteMetric {
  __typename: "DiscreteMetric";
  latestDataPoint: AppSmokeDetectorDataQuery_data_devices_LastAlarm_DiscreteMetric_latestDataPoint | null;
}

export type AppSmokeDetectorDataQuery_data_devices_LastAlarm = AppSmokeDetectorDataQuery_data_devices_LastAlarm_ContinuousMetric | AppSmokeDetectorDataQuery_data_devices_LastAlarm_DiscreteMetric;

export interface AppSmokeDetectorDataQuery_data_devices_IsInRemovedState_ContinuousMetric {
  __typename: "ContinuousMetric";
}

export interface AppSmokeDetectorDataQuery_data_devices_IsInRemovedState_DiscreteMetric_latestDataPoint {
  __typename: "DiscreteDataPoint";
  date: DateTime;
  value: string;
}

export interface AppSmokeDetectorDataQuery_data_devices_IsInRemovedState_DiscreteMetric {
  __typename: "DiscreteMetric";
  latestDataPoint: AppSmokeDetectorDataQuery_data_devices_IsInRemovedState_DiscreteMetric_latestDataPoint | null;
}

export type AppSmokeDetectorDataQuery_data_devices_IsInRemovedState = AppSmokeDetectorDataQuery_data_devices_IsInRemovedState_ContinuousMetric | AppSmokeDetectorDataQuery_data_devices_IsInRemovedState_DiscreteMetric;

export interface AppSmokeDetectorDataQuery_data_devices_RemovalDuration_DiscreteMetric {
  __typename: "DiscreteMetric";
}

export interface AppSmokeDetectorDataQuery_data_devices_RemovalDuration_ContinuousMetric_latestDataPoint {
  __typename: "ContinuousDataPoint";
  date: DateTime;
  value: number;
}

export interface AppSmokeDetectorDataQuery_data_devices_RemovalDuration_ContinuousMetric {
  __typename: "ContinuousMetric";
  latestDataPoint: AppSmokeDetectorDataQuery_data_devices_RemovalDuration_ContinuousMetric_latestDataPoint | null;
}

export type AppSmokeDetectorDataQuery_data_devices_RemovalDuration = AppSmokeDetectorDataQuery_data_devices_RemovalDuration_DiscreteMetric | AppSmokeDetectorDataQuery_data_devices_RemovalDuration_ContinuousMetric;

export interface AppSmokeDetectorDataQuery_data_devices_LastRemoval_ContinuousMetric {
  __typename: "ContinuousMetric";
}

export interface AppSmokeDetectorDataQuery_data_devices_LastRemoval_DiscreteMetric_latestDataPoint {
  __typename: "DiscreteDataPoint";
  date: DateTime;
  value: string;
}

export interface AppSmokeDetectorDataQuery_data_devices_LastRemoval_DiscreteMetric {
  __typename: "DiscreteMetric";
  latestDataPoint: AppSmokeDetectorDataQuery_data_devices_LastRemoval_DiscreteMetric_latestDataPoint | null;
}

export type AppSmokeDetectorDataQuery_data_devices_LastRemoval = AppSmokeDetectorDataQuery_data_devices_LastRemoval_ContinuousMetric | AppSmokeDetectorDataQuery_data_devices_LastRemoval_DiscreteMetric;

export interface AppSmokeDetectorDataQuery_data_devices_CurrentRemovalDuration_DiscreteMetric {
  __typename: "DiscreteMetric";
}

export interface AppSmokeDetectorDataQuery_data_devices_CurrentRemovalDuration_ContinuousMetric_latestDataPoint {
  __typename: "ContinuousDataPoint";
  date: DateTime;
  value: number;
}

export interface AppSmokeDetectorDataQuery_data_devices_CurrentRemovalDuration_ContinuousMetric {
  __typename: "ContinuousMetric";
  latestDataPoint: AppSmokeDetectorDataQuery_data_devices_CurrentRemovalDuration_ContinuousMetric_latestDataPoint | null;
}

export type AppSmokeDetectorDataQuery_data_devices_CurrentRemovalDuration = AppSmokeDetectorDataQuery_data_devices_CurrentRemovalDuration_DiscreteMetric | AppSmokeDetectorDataQuery_data_devices_CurrentRemovalDuration_ContinuousMetric;

export interface AppSmokeDetectorDataQuery_data_devices_IsInFraudState_ContinuousMetric {
  __typename: "ContinuousMetric";
}

export interface AppSmokeDetectorDataQuery_data_devices_IsInFraudState_DiscreteMetric_latestDataPoint {
  __typename: "DiscreteDataPoint";
  date: DateTime;
  value: string;
}

export interface AppSmokeDetectorDataQuery_data_devices_IsInFraudState_DiscreteMetric {
  __typename: "DiscreteMetric";
  latestDataPoint: AppSmokeDetectorDataQuery_data_devices_IsInFraudState_DiscreteMetric_latestDataPoint | null;
}

export type AppSmokeDetectorDataQuery_data_devices_IsInFraudState = AppSmokeDetectorDataQuery_data_devices_IsInFraudState_ContinuousMetric | AppSmokeDetectorDataQuery_data_devices_IsInFraudState_DiscreteMetric;

export interface AppSmokeDetectorDataQuery_data_devices_FraudCount_DiscreteMetric {
  __typename: "DiscreteMetric";
}

export interface AppSmokeDetectorDataQuery_data_devices_FraudCount_ContinuousMetric_latestDataPoint {
  __typename: "ContinuousDataPoint";
  date: DateTime;
  value: number;
}

export interface AppSmokeDetectorDataQuery_data_devices_FraudCount_ContinuousMetric {
  __typename: "ContinuousMetric";
  latestDataPoint: AppSmokeDetectorDataQuery_data_devices_FraudCount_ContinuousMetric_latestDataPoint | null;
}

export type AppSmokeDetectorDataQuery_data_devices_FraudCount = AppSmokeDetectorDataQuery_data_devices_FraudCount_DiscreteMetric | AppSmokeDetectorDataQuery_data_devices_FraudCount_ContinuousMetric;

export interface AppSmokeDetectorDataQuery_data_devices_FraudDuration_DiscreteMetric {
  __typename: "DiscreteMetric";
}

export interface AppSmokeDetectorDataQuery_data_devices_FraudDuration_ContinuousMetric_latestDataPoint {
  __typename: "ContinuousDataPoint";
  date: DateTime;
  value: number;
}

export interface AppSmokeDetectorDataQuery_data_devices_FraudDuration_ContinuousMetric {
  __typename: "ContinuousMetric";
  latestDataPoint: AppSmokeDetectorDataQuery_data_devices_FraudDuration_ContinuousMetric_latestDataPoint | null;
}

export type AppSmokeDetectorDataQuery_data_devices_FraudDuration = AppSmokeDetectorDataQuery_data_devices_FraudDuration_DiscreteMetric | AppSmokeDetectorDataQuery_data_devices_FraudDuration_ContinuousMetric;

export interface AppSmokeDetectorDataQuery_data_devices_LastFraud_ContinuousMetric {
  __typename: "ContinuousMetric";
}

export interface AppSmokeDetectorDataQuery_data_devices_LastFraud_DiscreteMetric_latestDataPoint {
  __typename: "DiscreteDataPoint";
  date: DateTime;
  value: string;
}

export interface AppSmokeDetectorDataQuery_data_devices_LastFraud_DiscreteMetric {
  __typename: "DiscreteMetric";
  latestDataPoint: AppSmokeDetectorDataQuery_data_devices_LastFraud_DiscreteMetric_latestDataPoint | null;
}

export type AppSmokeDetectorDataQuery_data_devices_LastFraud = AppSmokeDetectorDataQuery_data_devices_LastFraud_ContinuousMetric | AppSmokeDetectorDataQuery_data_devices_LastFraud_DiscreteMetric;

export interface AppSmokeDetectorDataQuery_data_devices_CurrentFraudDuration_DiscreteMetric {
  __typename: "DiscreteMetric";
}

export interface AppSmokeDetectorDataQuery_data_devices_CurrentFraudDuration_ContinuousMetric_latestDataPoint {
  __typename: "ContinuousDataPoint";
  date: DateTime;
  value: number;
}

export interface AppSmokeDetectorDataQuery_data_devices_CurrentFraudDuration_ContinuousMetric {
  __typename: "ContinuousMetric";
  latestDataPoint: AppSmokeDetectorDataQuery_data_devices_CurrentFraudDuration_ContinuousMetric_latestDataPoint | null;
}

export type AppSmokeDetectorDataQuery_data_devices_CurrentFraudDuration = AppSmokeDetectorDataQuery_data_devices_CurrentFraudDuration_DiscreteMetric | AppSmokeDetectorDataQuery_data_devices_CurrentFraudDuration_ContinuousMetric;

export interface AppSmokeDetectorDataQuery_data_devices {
  __typename: "Device";
  id: string;
  site: AppSmokeDetectorDataQuery_data_devices_site;
  meta: AppSmokeDetectorDataQuery_data_devices_meta;
  Battery: AppSmokeDetectorDataQuery_data_devices_Battery;
  BatteryLow: AppSmokeDetectorDataQuery_data_devices_BatteryLow;
  DustLevel: AppSmokeDetectorDataQuery_data_devices_DustLevel;
  DustLevelRaw: AppSmokeDetectorDataQuery_data_devices_DustLevelRaw;
  HeadConnected: AppSmokeDetectorDataQuery_data_devices_HeadConnected;
  HeadFault: AppSmokeDetectorDataQuery_data_devices_HeadFault;
  OpenClose: AppSmokeDetectorDataQuery_data_devices_OpenClose;
  SounderFlag: AppSmokeDetectorDataQuery_data_devices_SounderFlag;
  CommsLinkSuccessful: AppSmokeDetectorDataQuery_data_devices_CommsLinkSuccessful;
  Tamper: AppSmokeDetectorDataQuery_data_devices_Tamper;
  EOL: AppSmokeDetectorDataQuery_data_devices_EOL;
  Alarm: AppSmokeDetectorDataQuery_data_devices_Alarm;
  AlarmCounter: AppSmokeDetectorDataQuery_data_devices_AlarmCounter;
  LastAlarm: AppSmokeDetectorDataQuery_data_devices_LastAlarm;
  IsInRemovedState: AppSmokeDetectorDataQuery_data_devices_IsInRemovedState;
  RemovalDuration: AppSmokeDetectorDataQuery_data_devices_RemovalDuration;
  LastRemoval: AppSmokeDetectorDataQuery_data_devices_LastRemoval;
  CurrentRemovalDuration: AppSmokeDetectorDataQuery_data_devices_CurrentRemovalDuration;
  IsInFraudState: AppSmokeDetectorDataQuery_data_devices_IsInFraudState;
  FraudCount: AppSmokeDetectorDataQuery_data_devices_FraudCount;
  FraudDuration: AppSmokeDetectorDataQuery_data_devices_FraudDuration;
  LastFraud: AppSmokeDetectorDataQuery_data_devices_LastFraud;
  CurrentFraudDuration: AppSmokeDetectorDataQuery_data_devices_CurrentFraudDuration;
}

export interface AppSmokeDetectorDataQuery_data {
  __typename: "Node";
  id: string;
  devices: AppSmokeDetectorDataQuery_data_devices[];
}

export interface AppSmokeDetectorDataQuery {
  data: AppSmokeDetectorDataQuery_data;
}

export interface AppSmokeDetectorDataQueryVariables {
  id: string;
}
