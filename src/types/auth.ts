export type AuthUser = {
  id: number;
  name: string;
  email: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResult = {
  token: string;
  user: AuthUser;
  expiredIn: number;
};
