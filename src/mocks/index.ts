import { authHandlers } from "./auth.handler";
import { postHandlers } from "./post.handler";


export const handlers = [...authHandlers, ...postHandlers];
