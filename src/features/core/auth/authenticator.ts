import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { User } from '.';
import { RootStore, SET_USER } from '../store';
import query from './me.gql';
import { CoreMe } from './__generated__/CoreMe';

export interface LoginOptions {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export class Authenticator {
  private request?: Promise<User>;

  public constructor(
    private readonly store: RootStore,
    private readonly client: ApolloClient<NormalizedCacheObject>,
    private readonly credentialsStorage: Storage,
    private readonly rememberMeStorage: Storage,
    private readonly authorizationStorageKey = 'authorization',
  ) {}

  private get authorization(): string | undefined {
    return this.credentialsStorage.getItem(this.authorizationStorageKey) || undefined;
  }

  private set authorization(value: string | undefined) {
    if (value === undefined) {
      this.credentialsStorage.removeItem(this.authorizationStorageKey);
    } else {
      this.credentialsStorage.setItem(this.authorizationStorageKey, value);
    }
  }

  private get rememberMeAuthorization(): string | undefined {
    return this.rememberMeStorage.getItem(this.authorizationStorageKey) || undefined;
  }

  private set rememberMeAuthorization(value: string | undefined) {
    if (value === undefined) {
      this.rememberMeStorage.removeItem(this.authorizationStorageKey);
    } else {
      this.rememberMeStorage.setItem(this.authorizationStorageKey, value);
    }
  }

  private get user(): User | undefined {
    return this.store.state.user;
  }

  private set user(value: User | undefined) {
    this.store.commit(SET_USER, value);
  }

  public async isAuthenticated(): Promise<boolean> {
    if (this.user) {
      return true;
    }

    if (!this.request) {
      return false;
    }

    try {
      await this.request;

      return true;
    } catch {
      return false;
    }
  }

  public async login({ email, password, rememberMe = false }: LoginOptions): Promise<User> {
    if (this.request) {
      throw new Error('Login already running');
    }

    const authorization = this.buildAuthorization(email, password);

    this.user = undefined;
    this.authorization = authorization;
    this.rememberMeAuthorization = rememberMe ? authorization : undefined;

    return this.doLogin();
  }

  public async restoreLogin(): Promise<boolean> {
    if (this.user) {
      return true;
    }

    if (this.request) {
      try {
        await this.request;

        return true;
      } catch {
        return false;
      }
    }

    if (this.authorization === undefined) {
      if (this.rememberMeAuthorization === undefined) {
        return false;
      }

      this.authorization = this.rememberMeAuthorization;
    }

    try {
      await this.doLogin();

      return true;
    } catch {
      return false;
    }
  }

  public logout(): void {
    this.authorization = undefined;
    this.rememberMeAuthorization = undefined;
    this.user = undefined;
  }

  private buildAuthorization(email: string, password: string): string {
    const auth = btoa(`${email}:${password}`);

    return `Credentials ${auth}`;
  }

  private async doLogin(): Promise<User> {
    try {
      this.request = this.loadUser();
      this.user = await this.request;

      return this.user;
    } catch (e) {
      this.authorization = undefined;
      this.rememberMeAuthorization = undefined;

      throw e;
    } finally {
      this.request = undefined;
    }
  }

  private async loadUser(): Promise<User> {
    const { data } = await this.client.query<CoreMe>({ query, fetchPolicy: 'no-cache', errorPolicy: 'none' });

    if (!this.authorization) {
      throw new Error('Concurrent logout');
    }

    return data.me;
  }
}
