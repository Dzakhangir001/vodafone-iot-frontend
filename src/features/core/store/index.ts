import { get, pick, pickBy } from 'lodash';
import { Route } from 'vue-router';
import { Store } from 'vuex';
import { User } from '../auth';
import { App } from '../model';
import { NodeLocationGenerator } from '../router/node-location-generator';

export type RootStore = Store<State>;
export { Action as RootAction, Getter as RootGetter, Mutation as RootMutation, State as RootState } from 'vuex-class';
export type Action<T = unknown> = (...args: any[]) => Promise<T>;

export const SET_USER = 'SET_USER';

export default class State {
  public production = process.env.NODE_ENV === 'production';
  public title = 'IoT Client';
  public route?: Route = undefined;
  public user?: User = undefined;
}

export function createStore(apps: Record<string, App>): RootStore {
  return new Store({
    state: () => new State(),
    getters: {
      allowedAppMap(state): Record<string, App> {
        const baseApps = pickBy(apps, ({ alwaysAllowed }) => alwaysAllowed);

        return state.user ? { ...baseApps, ...pick(apps, state.user.apps) } : baseApps;
      },
      app(state): App | undefined {
        const appName = get(state, 'route.meta.app');

        return appName ? apps[appName] : undefined;
      },
      nodeLocationGenerator(state, { app }): NodeLocationGenerator {
        if (!app || !app.generateNodeLocation) {
          return () => undefined;
        }

        return app.generateNodeLocation;
      },
      loggedIn({ user }): boolean {
        return user !== undefined;
      },
    },
    mutations: {
      [SET_USER](state, user?: User) {
        state.user = user;
      },
    },
  });
}
