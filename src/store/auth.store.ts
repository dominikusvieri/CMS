import { create } from "zustand";
import type { AuthUser, LoginResult } from "../types/auth";

type AuthState = {
  token: string | null;
  user: AuthUser | null;
  expiredAt: number | null;
  login: (data: LoginResult) => void;
  logout: () => void;
};

function safeJSONParse<T>(value: string | null): T | null {
  if (!value || value === "undefined") return null;

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export const useAuthStore = create<AuthState>((set) => {
  const token = localStorage.getItem("token");
  const user = safeJSONParse<AuthUser>(localStorage.getItem("user"));
  const expiredAt = safeJSONParse<number>(
    localStorage.getItem("expiredAt")
  );

  return {
    token,
    user,
    expiredAt,

    login: (data) => {
      const expiredAt = Date.now() + data.expiredIn * 1000;

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("expiredAt", JSON.stringify(expiredAt));

      set({
        token: data.token,
        user: data.user,
        expiredAt,
      });
    },

    logout: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("expiredAt");

      set({
        token: null,
        user: null,
        expiredAt: null,
      });
    },
  };
});
