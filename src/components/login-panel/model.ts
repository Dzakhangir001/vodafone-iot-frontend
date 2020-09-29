export interface LoginData {
  readonly email: string;
  readonly password: string;
  readonly rememberMe: boolean;
}

export type LoginAction = (data: LoginData) => Promise<void>;
