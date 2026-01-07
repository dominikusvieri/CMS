import type { LoginResult } from "../types/auth";
import { authApi } from "./auth.api";

export interface LoginPayload {
  email: string;
  password: string;
}



export const authService = {
  login: async(payload: LoginPayload): Promise<LoginResult> => {
    const result = await authApi.login(payload);
     return {
      ...result,
      expiredIn: result.expiredIn ?? 60*60, 
    };
  },
};