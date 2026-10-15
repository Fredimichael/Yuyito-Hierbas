-- ==============================================================================
-- YUYITO HIERBAS - SCHEMA DE BASE DE DATOS SUPABASE (POSTGRESQL + RLS + STORAGE)
-- ==============================================================================
-- Instrucciones para conectar a tu nuevo proyecto de Supabase:
-- 1. En tu proyecto de Supabase (https://supabase.com/dashboard)
-- 2. Entra en "SQL Editor" en el menú lateral izquierdo.
-- 3. Crea una "New query", pega todo este archivo y presiona "Run" (▶).
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
DROP POLICY IF EXISTS "Permitir lectura publica de productos" ON public.products;
CREATE POLICY "Permitir lectura publica de productos" 
ON public.products FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Permitir administracion completa a usuarios autenticados" ON public.products;
CREATE POLICY "Permitir administracion completa a usuarios autenticados" 
ON public.products FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Reglas para BANNERS:
DROP POLICY IF EXISTS "Permitir lectura publica de banners" ON public.banners;
CREATE POLICY "Permitir lectura publica de banners" 
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

INSERT INTO storage.buckets (id, name, public)
VALUES ('catalog-media', 'catalog-media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

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
-- DATOS INICIALES (SEMILLA PARA YUYITO HIERBAS)
-- ==============================================================================

INSERT INTO public.categories (id, name, slug, icon) VALUES
('cat-all', 'Todos', 'todos', 'Sparkles'),
('cat-yuyitos', 'Yuyitos & Blends', 'yuyitos', 'Sprout'),
('cat-mates', 'Mates', 'mates', 'Coffee'),
('cat-bombillas', 'Bombillas', 'bombillas', 'Flame'),
('cat-accesorios', 'Accesorios', 'accesorios', 'Sparkles'),
('cat-combos', 'Combos Materos', 'combos', 'Gift')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, slug = EXCLUDED.slug, icon = EXCLUDED.icon;

INSERT INTO public.banners (id, title, subtitle, image_url, button_text, button_link, badge, is_active, "order") VALUES
('banner-1', 'Mixes & Blends de Hierbas', 'Infusiones naturales, flores y yuyitos seleccionados para transformar tu mate en una experiencia de calma y bienestar.', '/images/banners/banner-hierbas.webp', 'Ver Hierbas & Blends', '#catalogo', 'BLENDS & YUYITOS', true, 1),
('banner-2', 'Mates Imperiales de Autor', 'Calabazas seleccionadas y acero inoxidable, forrados en cuero legítimo con virolas cinceladas a mano.', '/images/banners/banner-mates.webp', 'Descubrir Mates', '#catalogo', 'CALIDAD PREMIUM', true, 2),
('banner-3', 'Bombillas en Alpaca & Metal', 'Diseños únicos con mariposas, flores de cristal y apliques labrados que visten de arte cada mateada.', '/images/banners/banner-bombillas.webp', 'Ver Bombillas', '#catalogo', 'ORFEBRERÍA ARTESANAL', true, 3),
('banner-4', 'Combos Materos Especiales', 'Llevate el kit completo con tu bombilla favorita, mix de hierbas y accesorios listo para disfrutar o regalar.', '/images/banners/banner-combos.webp', 'Explorar Combos', '#catalogo', 'KITS COMPLETOS', true, 4)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.products (id, title, description, price, compare_at_price, category, images, in_stock, is_featured, badge, whatsapp_number, created_at) VALUES
('mx-hierbas-01', 'Mix Calma Profunda', 'Infusión natural de hierbas que desinflama, relaja y equilibra desde adentro. Ideal para momentos de estres y ansiedad. Ingredientes: boldo, tilo, cedron, malva, hibiscus y cola de caballo.', 1800, 2000, 'yuyitos', ARRAY['/placeholder/Mix_Calma_Profunda.jpg'], true, true, 'DESTACADO', '3644663166', '2026-08-19T12:35:35.204Z'),
('mx-hierbas-02', 'Mix Equilibrio Vital', 'Infusión natural de hierbas que despierta los sentidos y armoniza tu interior. Ideal para comenzar el día con energía y enfoque. Ingredientes: siempre vive, malva, rosa mosqueta, naranja y canela.', 1800, NULL, 'yuyitos', ARRAY['/placeholder/Mix_Equilibrio_Vital.jpg', '/placeholder/Mix_Equilibrio_Vital2.jpg'], true, false, 'NUEVO', '3644663166', '2026-08-21T12:35:35.204Z'),
('mx-hierbas-03', 'Mix Dulce Natural', '“Dulce Natural” es una infusión tropical, naturalmente dulce con stevia y sin azúcares añadidos. No eleva los niveles de glucosa en sangre, por lo que es ideal para personas con diabetes o quienes buscan un estilo de vida equilibrado. Ingredientes: coco en escamas, cedrón, cáscara de naranja, manzanilla y anís estrellado, ofrece frescura, aroma y beneficios digestivos en cualquier momento del día.', 1800, 2000, 'yuyitos', ARRAY['/placeholder/Mix_Dulce_Natural.jpg'], true, true, 'DESTACADO', '3644663166', '2026-08-23T12:35:35.204Z'),
('mx-hierbas-04', 'Mix Gin Tonic', 'Mezcla de hierbas y flores especialmente seleccionadas para realzar el sabor de tu gin tonic. Ingredientes: anis estrellado, coco', 1800, NULL, 'yuyitos', ARRAY['/placeholder/Mix_Gin_Tonic1.jpg', '/placeholder/Mix_Gin_Tonic2.jpg'], false, false, 'NUEVO', '3644663166', '2026-08-25T12:35:35.204Z'),
('mx-hierbas-05', 'Mix ', 'Mix ', 1300, NULL, 'yuyitos', ARRAY['/placeholder/Mix_hierbas.jpg'], true, false, NULL, '3644663166', '2026-08-27T12:35:35.204Z'),
('mx-hierbas-06', 'Mix Floral "Serenidad"', 'Este mix floral, equilibrado y armonioso, es ideal para acompañar momentos de calma y conexión. Se compone de una infusión natural con ingredientes como siempreviva, rosa mosqueta, manzanilla, flor de tilo, pétalos de rosa, caléndula, coco en escamas y naranja. Su contenido es de 50 g.', 3800, NULL, 'yuyitos', ARRAY['/placeholder/Mix_Floral.jpg'], true, false, NULL, '3644663166', '2026-08-29T12:35:35.204Z'),
('mx-hierbas-07', 'Mix Herbal "Refrescante"', 'Esta infusión natural ha sido creada para brindar frescura y bienestar. Contiene una mezcla revitalizante de menta, cedrón, eucalipto, yerba lucero, boldo, poleo, burrito y anís estrellado. El contenido es de 50 g.', 3800, NULL, 'yuyitos', ARRAY['/placeholder/Mix_Herbal.jpg'], true, false, NULL, '3644663166', '2026-08-31T12:35:35.204Z'),
('mx-hierbas-08', 'Mix Relajante', 'Este mix ha sido especialmente formulado para calmar la ansiedad, mejorar la calidad del sueño y relajar tanto el cuerpo como la mente. Sus ingredientes incluyen tilo, pasiflora, melisa, manzanilla, cedrón y pétalos de rosa. El contenido es de 50 g.', 3800, NULL, 'yuyitos', ARRAY['/placeholder/Mix_Relajante.jpg'], true, false, NULL, '3644663166', '2026-09-02T12:35:35.204Z'),
('mx-hierbas-10', 'Ruleta de Yuyitos', 'Una experiencia única para explorar sabores. Nuestra Ruleta de Yuyitos es una selección especial de 6 hierbas y flores para que puedas crear tus propias mezclas. Ideal para regalar o para llevar tu ritual del mate a otro nivel. Importante: La selección de hierbas puede variar según la disponibilidad de stock, ¡pero siempre te llevarás una combinación increíble!', 7200, 8500, 'yuyitos', ARRAY['/placeholder/_MG_2591.jpg', '/placeholder/_MG_2684.jpg', '/placeholder/_MG_2693.jpg'], true, true, 'DESTACADO', '3644663166', '2026-09-04T12:35:35.204Z'),
('mx-hierbas-11', 'Mix Gin Tonic', 'Mezcla de hierbas y flores especialmente seleccionadas para realzar el sabor de tu gin tonic. Los ingredientes varian según la disponibilidad de stock, pero siempre incluyen una combinación única y deliciosa. ¡Experimenta y descubre nuevas sensaciones en cada copa!', 1800, NULL, 'yuyitos', ARRAY['/placeholder/MIX_GIN_TONIC2.jpg', '/placeholder/MIX_GIN_TONIC1.jpg', '/placeholder/MIX_GIN_TONIC3.jpg', '/placeholder/MIX_GIN_TONIC4.jpg', '/placeholder/MIX_GIN_TONIC5.jpg'], true, false, NULL, '3644663166', '2026-09-06T12:35:35.205Z'),
('mm-accesorios-01', 'Mate Imperial Dorado', 'Mate de acero inoxidable interior, forrado en cuero legítimo con virola dorada grabada en finos detalles artesanales. Su diseño combina elegancia, durabilidad e higiene, ofreciendo una experiencia de mate única y con estilo. Ideal para quienes buscan tradición con un toque moderno.', 45000, NULL, 'mates', ARRAY['/placeholder/Mate1.jpg', '/placeholder/Mate2.jpg'], true, false, NULL, '3644663166', '2026-09-08T12:35:35.205Z'),
('mm-accesorios-02', 'Mate Imperial Cincelado', 'Mate con interior de acero inoxidable, forrado en cuero legítimo y virola dorada con grabados de hojas y arabescos artesanales. Combina elegancia, resistencia e higiene, brindando una experiencia única para los amantes del mate. Un diseño tradicional con un acabado refinado que resalta el arte en cada detalle.', 45000, 51500, 'mates', ARRAY['/placeholder/Mate3.jpg', '/placeholder/Mate4.jpg', '/placeholder/Mate5.jpg'], true, true, 'DESTACADO', '3644663166', '2026-09-10T12:35:35.205Z'),
('mm-accesorios-03', 'Mate Imperial Plateado "Para Viajeros" ', 'Mate de calabaza forrado en cuero con virola de acero inoxidable bañada en dorado, grabada con la frase "Vamos a darle la vuelta al mundo". Un diseño elegante y tradicional que combina resistencia, estilo y la esencia del buen mate. Es ideal para acompañar tus infusiones con un toque de distinción y un mensaje inspirador.', 42000, 48500, 'mates', ARRAY['/placeholder/Mate_Viruela_Blanca.jpg', '/placeholder/Mate-Frase.jpg'], true, true, 'DESTACADO', '3644663166', '2026-09-12T12:35:35.205Z'),
('mm-accesorios-04', 'Mate Imperial Plateado "Felicidad"', 'Mate de calabaza forrado en cuero con virola de acero inoxidable bañada en dorado, grabada con la frase "Felicidad es disfrutar las pequeñas cosas de la vida". Un diseño elegante y tradicional que combina resistencia, estilo y la esencia del buen mate. Es ideal para acompañar tus infusiones con un toque de distinción y un mensaje inspirador.', 42000, NULL, 'mates', ARRAY['/placeholder/Mate_Viruela_Blanca2.jpg', '/placeholder/Mate_Viruela_Blanca3.jpg', '/placeholder/Mate-Frase.jpg'], true, false, NULL, '3644663166', '2026-09-14T12:35:35.205Z'),
('mm-accesorios-05', 'Mate de Acero "Mañana será más bonito"', 'Disfruta de tus mates con un toque de inspiración. Este mate de acero inoxidable con un elegante acabado en negro mate es práctico, duradero e higiénico. Cuenta con una virola de acero pulido y un grabado láser con la frase "Mañana será más bonito", perfecto para empezar el día con energía positiva. Al ser de acero, no necesita curado y es muy fácil de limpiar.', 13000, NULL, 'mates', ARRAY['/placeholder/Mate_Acero.jpg'], true, false, NULL, '3644663166', '2026-09-16T12:35:35.205Z'),
('mm-accesorios-06', 'Mate de Acero "Siempre cree en ti"', 'Un mate para recordarte tu valor cada día. Este mate de acero inoxidable con un elegante acabado en negro mate es práctico, duradero e higiénico. Cuenta con una virola de acero pulido y un delicado grabado láser con la frase "Siempre cree en ti". Al ser de acero, no necesita curado y es muy fácil de limpiar.', 13000, NULL, 'mates', ARRAY['/placeholder/Mate_Acero2.jpg'], true, false, NULL, '3644663166', '2026-09-18T12:35:35.205Z'),
('bb-accesorios-01', 'Bombilla de Acero Inoxidable "Flor Roja"', 'Esta es una bombilla de acero inoxidable de 22.5 cm, con un acabado completamente bañado en un vibrante color rojo. Su diseño es llamativo y elegante, con una decoración central que incluye una mariposa roja y racimos de cuentas del mismo color. El adorno se realza con pequeñas esferas doradas y una esfera dorada más grande en el centro, todo sujeto con alambre dorado que contrasta y complementa perfectamente el color base.', 13000, NULL, 'bombillas', ARRAY['/placeholder/Bombilla_roja.jpg', '/placeholder/Bombilla_roja1.jpg'], true, false, NULL, '3644663166', '2026-09-20T12:35:35.205Z'),
('bb-accesorios-02', 'Bombilla de Alpaca "Mariposa Azul"', 'Esta bombilla de alpaca destaca por su diseño sereno y elegante. En su vástago, tiene una mariposa celeste con textura floral, acompañada de cuentas en tonos celeste, blanco y perla, además de una pequeña rosa verde agua. Los apliques están sujetos con un alambre plateado que armoniza con el metal de la bombilla.', 9000, NULL, 'bombillas', ARRAY['/placeholder/Mariposa_Azul1.jpg', '/placeholder/Mariposa_Azul2.jpg'], true, false, NULL, '3644663166', '2026-09-22T12:35:35.205Z'),
('bb-accesorios-03', 'Bombilla de Alpaca "Mariposa Roja"', 'Esta bombilla de alpaca presenta un diseño vibrante y llamativo. Está decorada con una mariposa roja con textura de flores, complementada por cuentas en tonos rojo pasión, perlas blancas y una rosa blanca. Los apliques están sujetos por un alambre dorado que le da un toque de elegancia.', 9000, NULL, 'bombillas', ARRAY['/placeholder/Mariposa_Roja1.jpg', '/placeholder/Mariposa_Roja2.jpg'], true, false, NULL, '3644663166', '2026-09-24T12:35:35.205Z'),
('bb-accesorios-05', 'Bombilla de Alpaca "Flor de la Suerte"', 'Esta es una bombilla de alpaca con un diseño temático de jardín, lleno de color y detalles artesanales. El adorno principal es una flor turquesa con un centro naranja, sobre la que descansa una pequeña y detallada mariquita. La flor está acompañada de hojas verdes y una pequeña rosa azul en la parte superior. El diseño se complementa con cuentas en forma de perlas y pequeñas estrellas celestes, todo sujeto con un delicado alambre dorado que le da un acabado fino y brillante.', 9000, NULL, 'bombillas', ARRAY['/placeholder/Bombilla_Alpaca1.jpg', '/placeholder/Bombilla_Alpaca2.jpg'], false, false, NULL, '3644663166', '2026-09-26T12:35:35.205Z'),
('bb-accesorios-04', 'Bombilla de Metal "Girasol"', 'Esta bombilla de metal mide 19 cm, presenta un diseño decorativo, un adorno artesanal en el vástago, que consiste en un girasol amarillo acompañado de cuentas doradas y alambre metálico en espiral. Es una pieza llamativa que combina funcionalidad con un estilo alegre y único.', 7000, 8000, 'bombillas', ARRAY['/placeholder/Bombilla-girasol1.jpg', '/placeholder/Bombilla-girasol2.jpg', '/placeholder/Bombilla_Girasol1.jpg', '/placeholder/Bombilla_Girasol2.jpg', '/placeholder/Bombilla_Girasol3.jpg'], true, true, 'DESTACADO', '3644663166', '2026-09-28T12:35:35.205Z'),
('bb-accesorios-06', 'Bombilla de Metal "Mariposa Rosa"', 'Esta bombilla de metal mide 19 cm y presenta un diseño femenino y delicado. Está decorada con una mariposa de porcelana en tonos rosados y blanco perla, que se complementa con cuentas en los mismos colores y pequeñas esferas doradas. Los alambres de metal se enrollan de forma artesanal, uniendo cada elemento y destacando el aplique central.', 7000, NULL, 'bombillas', ARRAY['/placeholder/monchi9.jpg', '/placeholder/monchi8.jpg'], true, false, NULL, '3644663166', '2026-09-30T12:35:35.205Z'),
('bb-accesorios-07', 'Bombilla de Metal "Mariposa Negra"', 'Esta bombilla de metal de 19 cm ofrece un estilo más sofisticado y elegante. En su vástago, tiene una mariposa de porcelana en tonos plateados oscuros y dorados. El adorno se completa con una hilera de cuentas negras intercaladas con esferas doradas, sujetas con alambres de metal. La combinación de colores crea un contraste llamativo y lujoso.', 7000, NULL, 'bombillas', ARRAY['/placeholder/monchi11.jpg', '/placeholder/monchi10.jpg'], true, false, NULL, '3644663166', '2026-10-02T12:35:35.205Z'),
('bb-accesorios-08', 'Bombilla de Metal "Mariposa Celeste"', 'Esta bombilla de metal de 19 cm tiene un diseño fresco y vibrante. Presenta una mariposa de porcelana en tonos celestes y blanco perla, acompañada de cuentas celestes, blancas y doradas. Los alambres metálicos se enrollan de manera artesanal, uniendo cada elemento y resaltando el aplique central con un toque de elegancia y color.', 7000, NULL, 'bombillas', ARRAY['/placeholder/monchi3.jpg', '/placeholder/monchi2.jpg'], true, false, NULL, '3644663166', '2026-10-04T12:35:35.205Z'),
('bb-accesorios-09', 'Bombilla de Metal "Mariposa Fantasía"', 'Esta bombilla de metal de 19 cm presenta un diseño vibrante con una mariposa de metal esmaltado en tonos azules y rosados, que irradia un encanto lúdico. El vástago está adornado con una serie de cuentas de colores pastel (azul, rosa, blanco y dorado), creando una secuencia armoniosa. Los detalles de alambre en espiral añaden un toque artesanal y sostienen firmemente los apliques, haciendo de esta bombilla un accesorio alegre y funcional para el mate.', 7000, NULL, 'bombillas', ARRAY['/placeholder/monchi5.jpg', '/placeholder/monchi4.jpg'], true, false, NULL, '3644663166', '2026-10-06T12:35:35.205Z'),
('bb-accesorios-10', 'Bombilla de Metal "Flor Fucsia"', 'Esta bombilla de metal de 19 cm luce un diseño glamuroso y brillante. El adorno central es una flor de cristales fucsias que capta la luz, creando un efecto deslumbrante. A cada lado de la flor, se encuentran cuentas redondas fucsias y pequeñas esferas doradas, enlazadas con alambre de cobre en espiral. La combinación de colores y texturas confiere a esta bombilla un estilo distintivo, ideal para quienes buscan un toque de sofisticación y color en su mate.', 7000, 8000, 'bombillas', ARRAY['/placeholder/monchi6.jpg', '/placeholder/monchi7.jpg'], true, true, 'DESTACADO', '3644663166', '2026-10-08T12:35:35.205Z'),
('dd-accesorios-17', 'Despolvillador Elegante', 'Despolvillador de plastico con diseño elegante y funcional. Perfecto para mantener tu mate limpio y libre de polvo. Colores disponibles: (Blanco y Gris).', 7500, 8500, 'accesorios', ARRAY['/placeholder/Despolvillador_Blanco1.jpg', '/placeholder/Despolvillador_Blanco2.jpg'], true, true, 'DESTACADO', '3644663166', '2026-10-10T12:35:35.205Z'),
('cb-combos-01', 'Combo Bombilla Mariposa Celeste + Mix Calma Profunda', 'Este combo incluye una bombilla de metal decorada con una mariposa celeste y un mix de hierbas "Calma Profunda". La bombilla mide 19 cm y presenta un diseño fresco y vibrante, mientras que el mix es una infusión natural ideal para momentos de estrés y ansiedad. Una combinación perfecta para disfrutar de un mate relajante con estilo.', 10000, 11500, 'combos', ARRAY['/placeholder/Combo.jpg'], true, true, 'DESTACADO', '3644663166', '2026-10-12T12:35:35.205Z')
ON CONFLICT (id) DO NOTHING;
