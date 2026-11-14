# KODRA React + Vite + Nitro template

A full-stack starter for [KODRA AI Builder](https://github.com/ko-system): a React
frontend built with Vite, TypeScript, Tailwind CSS and shadcn/ui components, plus a
[Nitro](https://nitro.build) server for API routes and server-only code.

[ภาษาไทยอยู่ด้านล่าง](#ภาษาไทย)

## What's inside

| Path                          | What it is                                                                 |
| ----------------------------- | -------------------------------------------------------------------------- |
| `src/`                        | React app (React Router, TanStack Query, shadcn/ui in `src/components/ui`) |
| `src/globals.css`             | Design tokens between the `kodra:design-tokens` markers                    |
| `tailwind.design-preset.ts`   | Maps Tailwind utilities onto the design tokens                             |
| `src/components/app/`         | Optional page building blocks (Hero, Section, FeatureGrid, ...)            |
| `server/routes/api/health.ts` | Example API route, served at `GET /api/health`                             |
| `nitro.config.ts`             | Nitro config (`serverDir: "./server"`)                                     |
| `vite.config.ts`              | Vite config; `nitro()` is the last plugin                                  |
| `AI_RULES.md`                 | Conventions the KODRA agent follows when editing this app                  |

## Scripts

```sh
pnpm install
pnpm dev            # Vite dev server with the Nitro server mounted (http://localhost:8080)
pnpm build          # Builds the client and the server into .output/
pnpm start          # Runs the production server: node .output/server/index.mjs
pnpm preview        # Previews the production build
pnpm typecheck      # Type-checks src/, server/ and the config files
pnpm lint
```

`pnpm dev --port 3000` picks a different port.

## Adding an API route

Create a file under `server/routes/api/`. The file path becomes the URL:

```ts
// server/routes/api/todos.post.ts  ->  POST /api/todos
import { defineHandler } from "nitro";
import { readBody, createError } from "nitro/h3";

export default defineHandler(async (event) => {
  const body = await readBody<{ title?: string }>(event);
  if (!body?.title) {
    throw createError({ statusCode: 400, statusMessage: "title is required" });
  }
  return { ok: true, title: body.title };
});
```

Code under `src/` ships to the browser. Keep secrets (`DATABASE_URL`, API keys) in
`.env.local` and read them only from `server/`.

## License

[Apache License 2.0](LICENSE)

---

## ภาษาไทย

เทมเพลตเริ่มต้นแบบ full-stack สำหรับ KODRA AI Builder: ฝั่งหน้าเว็บเป็น React ที่สร้างด้วย
Vite, TypeScript, Tailwind CSS และคอมโพเนนต์ shadcn/ui ส่วนฝั่งเซิร์ฟเวอร์ใช้
[Nitro](https://nitro.build) สำหรับ API และโค้ดที่ต้องรันบนเซิร์ฟเวอร์เท่านั้น

### โครงสร้าง

- `src/` — แอป React (หน้าเว็บอยู่ใน `src/pages/`, คอมโพเนนต์อยู่ใน `src/components/`)
- `src/globals.css` — ค่า design token อยู่ระหว่างเครื่องหมาย `kodra:design-tokens`
- `tailwind.design-preset.ts` — ผูกคลาสของ Tailwind เข้ากับ design token
- `server/routes/api/health.ts` — ตัวอย่าง API ที่ `GET /api/health`
- `nitro.config.ts` — ตั้งค่า Nitro (`serverDir: "./server"`)
- `vite.config.ts` — ตั้งค่า Vite โดย `nitro()` ต้องเป็นปลั๊กอินตัวสุดท้ายเสมอ
- `AI_RULES.md` — กติกาที่เอเจนต์ของ KODRA ใช้เมื่อแก้ไขแอปนี้

### คำสั่ง

```sh
pnpm install
pnpm dev            # เปิดเซิร์ฟเวอร์สำหรับพัฒนา พร้อม Nitro (http://localhost:8080)
pnpm build          # build ทั้งหน้าเว็บและเซิร์ฟเวอร์ไปไว้ที่ .output/
pnpm start          # รันเซิร์ฟเวอร์ production: node .output/server/index.mjs
pnpm preview        # ดูตัวอย่างผลลัพธ์จากการ build
pnpm typecheck      # ตรวจชนิดข้อมูลของ src/, server/ และไฟล์ตั้งค่า
pnpm lint
```

### การเพิ่ม API

สร้างไฟล์ใน `server/routes/api/` แล้วพาธของไฟล์จะกลายเป็น URL เช่น
`server/routes/api/todos.post.ts` คือ `POST /api/todos` (ดูตัวอย่างโค้ดในส่วนภาษาอังกฤษด้านบน)

โค้ดใน `src/` จะถูกส่งไปที่เบราว์เซอร์ ดังนั้นให้เก็บความลับ (`DATABASE_URL`, API key)
ไว้ใน `.env.local` และอ่านค่าเหล่านี้จากโค้ดใน `server/` เท่านั้น

### สัญญาอนุญาต

[Apache License 2.0](LICENSE)
