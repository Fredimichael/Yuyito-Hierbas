-- ==============================================================================
-- CLUB IMPENETRABLE - SCHEMA DE BASE DE DATOS SUPABASE (POSTGRESQL + RLS)
-- ==============================================================================
-- Instrucciones:
-- 1. Ve a tu proyecto en Supabase (https://supabase.com)
-- 2. Entra en "SQL Editor" en el menú izquierdo.
-- 3. Pega todo este contenido y presiona "Run" (Ejecutar).
-- ==============================================================================

-- 1. EXTENSIÓN PARA GENERAR UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABLA DE CATEGORÍAS
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    icon TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABLA DE PRODUCTOS
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY DEFAULT ('prod-' || uuid_generate_v4()),
    title TEXT NOT NULL,
    description TEXT,
    price NUMERIC(12, 2) NOT NULL DEFAULT 0,
    compare_at_price NUMERIC(12, 2),
    category TEXT NOT NULL,
    images TEXT[] NOT NULL DEFAULT '{}',
    in_stock BOOLEAN NOT NULL DEFAULT true,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    badge TEXT,
    whatsapp_number TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TABLA DE BANNERS
CREATE TABLE IF NOT EXISTS public.banners (
    id TEXT PRIMARY KEY DEFAULT ('banner-' || uuid_generate_v4()),
    title TEXT NOT NULL,
    subtitle TEXT,
    image_url TEXT NOT NULL,
    button_text TEXT DEFAULT 'Ver Más',
    button_link TEXT DEFAULT '#catalogo',
    badge TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- POLÍTICAS DE SEGURIDAD (ROW LEVEL SECURITY - RLS)
-- ==============================================================================

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Reglas para PRODUCTOS:
-- Público general puede leer todos los productos
DROP POLICY IF EXISTS "Permitir lectura publica de productos" ON public.products;
CREATE POLICY "Permitir lectura publica de productos" 
ON public.products FOR SELECT 
USING (true);

-- Solo administradores autenticados pueden crear, modificar o borrar productos
DROP POLICY IF EXISTS "Permitir administracion completa a usuarios autenticados" ON public.products;
CREATE POLICY "Permitir administracion completa a usuarios autenticados" 
ON public.products FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Reglas para BANNERS:
DROP POLICY IF EXISTS "Permitir lectura publica de banners activos" ON public.banners;
CREATE POLICY "Permitir lectura publica de banners activos" 
ON public.banners FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Permitir administracion completa a usuarios autenticados para banners" ON public.banners;
CREATE POLICY "Permitir administracion completa a usuarios autenticados para banners" 
ON public.banners FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Reglas para CATEGORIAS:
DROP POLICY IF EXISTS "Permitir lectura publica de categorias" ON public.categories;
CREATE POLICY "Permitir lectura publica de categorias" 
ON public.categories FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Permitir administracion completa a usuarios autenticados para categorias" ON public.categories;
CREATE POLICY "Permitir administracion completa a usuarios autenticados para categorias" 
ON public.categories FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- ==============================================================================
-- STORAGE BUCKET PARA IMÁGENES (PRODUCTOS Y BANNERS)
-- ==============================================================================

-- Crear bucket público para catálogo
INSERT INTO storage.buckets (id, name, public)
VALUES ('catalog-media', 'catalog-media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Políticas de Storage
DROP POLICY IF EXISTS "Permitir acceso publico a imagenes" ON storage.objects;
CREATE POLICY "Permitir acceso publico a imagenes"
ON storage.objects FOR SELECT
USING (bucket_id = 'catalog-media');

DROP POLICY IF EXISTS "Permitir subida de imagenes a usuarios autenticados" ON storage.objects;
CREATE POLICY "Permitir subida de imagenes a usuarios autenticados"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'catalog-media');

DROP POLICY IF EXISTS "Permitir eliminacion de imagenes a usuarios autenticados" ON storage.objects;
CREATE POLICY "Permitir eliminacion de imagenes a usuarios autenticados"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'catalog-media');

-- ==============================================================================
-- DATOS INICIALES (SEMILLA)
-- ==============================================================================

INSERT INTO public.categories (id, name, slug, icon) VALUES
('cat-all', 'Todos', 'todos', 'Sparkles'),
('cat-indumentaria', 'Indumentaria', 'indumentaria', 'Shirt'),
('cat-accesorios', 'Accesorios & EDC', 'accesorios', 'Compass'),
('cat-artesanal', 'Artesanal Autóctono', 'artesanal', 'Gem'),
('cat-gourmet', 'Sabores del Monte', 'gourmet', 'Utensils'),
('cat-experiencias', 'Pases & Experiencias', 'experiencias', 'MapPin')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.banners (id, title, subtitle, image_url, button_text, button_link, badge, is_active, "order") VALUES
('banner-1', 'Nueva Colección El Impenetrable', 'Prendas técnicas y artesanías nativas diseñadas para resistir y destacar.', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80', 'Explorar Colección', '#catalogo', 'TEMPORADA 2026', true, 1),
('banner-2', 'Miel Silvestre & Cacao Nativo', 'Edición limitada cosechada de manera sustentable en el corazón del monte chaqueño.', 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=1600&q=80', 'Ver Gourmet', '#catalogo', 'EDICIÓN LIMITADA', true, 2),
('banner-3', 'Expediciones VIP & Pases de Campo', 'Accedé a travesías guiadas exclusivas con astrofotografía y gastronomía de autor.', 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1600&q=80', 'Reservar Experiencia', '#catalogo', 'MEMBRESÍA CLUB', true, 3)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.products (id, title, description, price, compare_at_price, category, images, in_stock, is_featured, badge) VALUES
('prod-1', 'Chaqueta Cortavientos Monte Tech', 'Confeccionada con tejido impermeable ripstop ultra liviano con memoria térmica. Tratamiento anti-desgarro para excursiones de alta exigencia.', 68500, 82000, 'indumentaria', ARRAY['https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80'], true, true, 'DESTACADO'),
('prod-2', 'Cuchillo Artesanal Acero Damasco & Quebracho Colorado', 'Forjado a mano por maestros cuchilleros locales. Cabo en madera de quebracho colorado rescatado con incrustaciones de bronce. Incluye vaina de cuero vacuno curtido vegetal.', 94000, 110000, 'artesanal', ARRAY['https://images.unsplash.com/photo-1593081891731-fda0877988da?auto=format&fit=crop&w=1000&q=80'], true, true, 'ARTESANAL'),
('prod-3', 'Miel Negra Orgánica del Impenetrable (500g)', 'Cosecha silvestre de abejas nativas en flora virgen de algarrobo y mistol. Sabor intenso con notas ahumadas y propiedades nutricionales excepcionales.', 18500, NULL, 'gourmet', ARRAY['https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=1000&q=80'], true, true, '100% ORGÁNICO'),
('prod-4', 'Mochila Táctica Modular Cordura 35L', 'Diseño ergonómico con sistema MOLLE reforzado, compartimento acolchado para notebook de hasta 16", porta bolsa de hidratación y cierres YKK termosellados.', 89000, 98000, 'accesorios', ARRAY['https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1000&q=80'], true, false, 'MOLLE SYSTEM')
ON CONFLICT (id) DO NOTHING;
