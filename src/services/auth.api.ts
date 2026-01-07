import type { LoginPayload, LoginResult } from "../types/auth";

export const authApi = {
  login: async (payload: LoginPayload): Promise<LoginResult> => {
    const res = await fetch(
      `/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      throw new Error("Invalid credentials");
    }

    return res.json();
  },
};
