import { http, HttpResponse } from "msw";
import type { LoginPayload, LoginResult } from "../types/auth";

const users = [
  {
    id: 1,
    name: "Admin",
    email: "admin@mail.com",
    password: "123456",
  },
];

export const authHandlers = [
  http.post("/login", async ({ request }) => {
    const body = (await request.json()) as LoginPayload;

    const user = users.find(
      (u) => u.email === body.email && u.password === body.password
    );

    if (!user) {
      return HttpResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const result: LoginResult = {
      token: "mock-token",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      expiredIn: 60*60,
    };

    return HttpResponse.json(result, { status: 200 });
  }),
];
