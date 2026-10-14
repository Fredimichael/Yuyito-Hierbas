# 🌿 Yuyito Hierbas v2 - Catálogo Digital & Panel de Administración

Catálogo digital de vanguardia para **Yuyito Hierbas**, desarrollado con estética **Liquid Glass (estilo iOS 26/27)**, navegación ultra-responsiva con menú hamburguesa para smartphones y vista multi-columna para PC/notebooks, soporte de banners y productos, generación dinámica de códigos QR y enlaces directos a WhatsApp para pedidos y consultas.

Desplegable al 100% **gratis en Vercel** con base de datos y almacenamiento en **Supabase** (o en modo offline con almacenamiento local).

---

## 🚀 Características Principales

- 📱 **Diseño Liquid Glass (iOS 26/27)**:
  - Efectos de refracción, `backdrop-filter: blur`, bordes especulares y orbes de luz ambiental animados.
  - Menú hamburguesa fluido para smartphones.
  - Navbar flotante estilo Dynamic Island / Dock con isotipo de Yuyito Hierbas.
- 🌿 **Catálogo Especializado**:
  - Categorías: *Yuyitos & Blends*, *Mates*, *Bombillas*, *Accesorios* y *Combos*.
  - Búsqueda en tiempo real por título, descripción y categoría.
  - Interruptor tipo iOS *"Solo en stock"*.
  - Ordenamiento por destacados, más nuevos o por precio.
  - Modal de producto con galería de imágenes en alta resolución, cálculo de descuento (`% OFF`) y disponibilidad.
- 🖼️ **Carrusel de Banners**:
  - Slider hero con transiciones suaves, temporizador automático, badges y botones de llamada a la acción (CTA) con imágenes oficiales de Yuyito.
- 🔗 **Compartir & QR Code**:
  - Generación instantánea de códigos QR en pantalla para escanear con la cámara del celular.
  - Botón de copiar enlace con confirmación visual.
  - Enlaces directos para compartir en WhatsApp.
  - Páginas públicas dedicadas por producto (`/producto/[id]`) con vista previa OpenGraph optimizada.
- 💬 **Integración Nativa con WhatsApp**:
  - Mensaje pre-redactado automáticamente con nombre del producto, precio y enlace directo al hacer clic en *"Pedir por WhatsApp"*.
- 🛡️ **Panel de Administración (`/admin`)**:
  - Gestión completa de Productos (Crear, Editar, Eliminar, Conmutar Stock y Destacados).
  - Gestión de Banners (Subir imágenes, cambiar enlaces, texto, orden y visibilidad).
  - Gestión de Categorías dinámicas con selector de iconos.
  - Subida de imágenes a Supabase Storage con compresión o URLs externas.
  - Modo Demostración sin conexión incluido con almacenamiento en LocalStorage.

---

## ⚡ Inicio Rápido Local

1. Instalar dependencias:
   ```bash
   pnpm install
   ```

2. Ejecutar servidor de desarrollo:
   ```bash
   ./start-dev.sh
   # o bien: pnpm dev
   ```

3. Abrir en tu navegador:
   - Catálogo: [http://localhost:3000](http://localhost:3000)
   - Panel de Control: [http://localhost:3000/admin](http://localhost:3000/admin)

> [!NOTE]
> La aplicación arranca por defecto en **Modo Demostración local** con el catálogo completo de Yuyito Hierbas cargado, por lo que podés probar la interfaz, agregar productos y editar banners de inmediato sin configurar ninguna clave externa.

---

## 🗄️ Configuración de Supabase (Opcional)

1. Ingresá a [supabase.com](https://supabase.com) y crea un nuevo proyecto gratuito.
2. En el panel izquierdo de Supabase, ve a **SQL Editor**.
3. Abre el archivo [`supabase-schema.sql`](./supabase-schema.sql) ubicado en este proyecto, copia todo su contenido y haz clic en **Run**.
   - Esto creará automáticamente las tablas `products`, `banners`, `categories`, las políticas de seguridad RLS y el bucket de almacenamiento `catalog-media`.
4. Ve a **Project Settings > API** en Supabase y copia `Project URL` y `anon public API key`.
5. En `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anon
   NEXT_PUBLIC_DEFAULT_WHATSAPP=3644663166
   NEXT_PUBLIC_SITE_NAME="Yuyito Hierbas"
   ```
