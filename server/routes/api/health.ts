import { defineHandler } from "nitro";

// GET /api/health — a minimal example route. Server code lives under server/
// and never ships to the browser; add routes next to this one, e.g.
// server/routes/api/todos.get.ts or server/routes/api/todos/[id].ts.
export default defineHandler(() => {
  return { ok: true, time: new Date().toISOString() };
});
