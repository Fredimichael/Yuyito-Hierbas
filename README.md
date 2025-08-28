# Saira — Joyas en acero (Next.js + Tailwind) v2

Mejoras:
- Notificación al agregar al carrito (react-hot-toast).
- Página de producto detallado (`/product/[id]`).
- Imágenes en las tarjetas (`next/image`).
- Contacto más llamativo con WhatsApp e Instagram.

## Inicio
```bash
npm i
npm run dev
```
Asegurate de tener `next.config.mjs` (ya incluido).

## Configuración
- `lib/config.ts` → `WHATSAPP_PHONE` (dejado en 543644521338).
- Reemplazá imágenes en `public/placeholder/` por fotos reales.
- Tipografía **Simple Serenity**: colocá los `.woff2` en `public/fonts/simple-serenity/`.

## Deploy
```bash
npx vercel
```
