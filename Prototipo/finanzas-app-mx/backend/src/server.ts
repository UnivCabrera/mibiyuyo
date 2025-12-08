import { Elysia } from "elysia";
import { router } from "./infrastructure/adapters/http/ElysiaController";

const app = new Elysia()
  .use(router)
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
