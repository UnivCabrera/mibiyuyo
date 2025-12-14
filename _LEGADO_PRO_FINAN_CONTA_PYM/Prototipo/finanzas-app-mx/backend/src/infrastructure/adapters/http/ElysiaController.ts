import { Elysia } from 'elysia';
import { container } from "../../bootstrap/container";

export const router = new Elysia()
  .get("/sat", async ({ request }) => {
    // Simular userId desde token
    const userId = "user123"; 
    const data = await container.getSATCredentials.execute(userId);
    return data;
  });
