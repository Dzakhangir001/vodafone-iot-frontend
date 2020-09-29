import { name, optionName } from '@/util/container';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { VueConstructor } from 'vue';
import Router, { RouteConfig } from 'vue-router';
import { Store } from 'vuex';
import { Authenticator } from '../auth';
import { App, DeviceRole, Manufacturer } from '../model';
import State from '../store';

export const CONTAINER = Symbol('CONTAINER');

export const ROUTES = optionName<RouteConfig[]>('ROUTES');
export const APPS = optionName<App>('APPS');
export const DEVICE_ROLES = optionName<DeviceRole>('DEVICE_ROLES');
export const MANUFACTURERS = optionName<Manufacturer>('MANUFACTURERS');

export const VUE = name<VueConstructor>('VUE');
export const ROOT_COMPONENT = name<VueConstructor>('ROOT_COMPONENT');
export const ROUTER = name<Router>('ROUTER');
export const STORE = name<Store<State>>('STORE');
export const AUTHENTICATOR = name<Authenticator>('AUTHENTICATOR');
export const API_CLIENT = name<ApolloClient<NormalizedCacheObject>>('API_CLIENT');
export const APP_MAP = name<Record<string, App>>('APP_MAP');
export const DEVICE_ROLE_MAP = name<Record<string, DeviceRole>>('DEVICE_ROLE_MAP');
export const MANUFACTURER_MAP = name<Record<string, Manufacturer>>('MANUFACTURER_MAP');
