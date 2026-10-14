import { Banner, Category, Product } from "@/types";

export const DEFAULT_WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_DEFAULT_WHATSAPP || "3644663166";
export const CLUB_NAME =
  process.env.NEXT_PUBLIC_SITE_NAME || "Yuyito Hierbas";
export const CLUB_TAGLINE = "Hierbas Serranas, Blends & Accesorios";

// Cantidad de días que dura el badge "NUEVO" antes de expirar automáticamente
export const NEW_PRODUCT_DAYS = 30;

export const INITIAL_CATEGORIES: Category[] = [
  {
    "id": "cat-all",
    "name": "Todos",
    "slug": "todos",
    "icon": "Sparkles"
  },
  {
    "id": "cat-yuyitos",
    "name": "Yuyitos & Blends",
    "slug": "yuyitos",
    "icon": "Sprout"
  },
  {
    "id": "cat-mates",
    "name": "Mates",
    "slug": "mates",
    "icon": "Coffee"
  },
  {
    "id": "cat-bombillas",
    "name": "Bombillas",
    "slug": "bombillas",
    "icon": "Flame"
  },
  {
    "id": "cat-accesorios",
    "name": "Accesorios",
    "slug": "accesorios",
    "icon": "Sparkles"
  },
  {
    "id": "cat-combos",
    "name": "Combos Materos",
    "slug": "combos",
    "icon": "Gift"
  }
];

export const INITIAL_BANNERS: Banner[] = [
  {
    id: "banner-1",
    title: "Mixes & Blends de Hierbas",
    subtitle: "Infusiones naturales, flores y yuyitos seleccionados para transformar tu mate en una experiencia de calma y bienestar.",
    image_url: "/images/banners/banner-hierbas.webp",
    button_text: "Ver Hierbas & Blends",
    button_link: "#catalogo",
    badge: "BLENDS & YUYITOS",
    is_active: true,
    order: 1,
  },
  {
    id: "banner-2",
    title: "Mates Imperiales de Autor",
    subtitle: "Calabazas seleccionadas y acero inoxidable, forrados en cuero legítimo con virolas cinceladas a mano.",
    image_url: "/images/banners/banner-mates.webp",
    button_text: "Descubrir Mates",
    button_link: "#catalogo",
    badge: "CALIDAD PREMIUM",
    is_active: true,
    order: 2,
  },
  {
    id: "banner-3",
    title: "Bombillas en Alpaca & Metal",
    subtitle: "Diseños únicos con mariposas, flores de cristal y apliques labrados que visten de arte cada mateada.",
    image_url: "/images/banners/banner-bombillas.webp",
    button_text: "Ver Bombillas",
    button_link: "#catalogo",
    badge: "ORFEBRERÍA ARTESANAL",
    is_active: true,
    order: 3,
  },
  {
    id: "banner-4",
    title: "Combos Materos Especiales",
    subtitle: "Llevate el kit completo con tu bombilla favorita, mix de hierbas y accesorios listo para disfrutar o regalar.",
    image_url: "/images/banners/banner-combos.webp",
    button_text: "Explorar Combos",
    button_link: "#catalogo",
    badge: "KITS COMPLETOS",
    is_active: true,
    order: 4,
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    "id": "mx-hierbas-01",
    "title": "Mix Calma Profunda",
    "description": "Infusión natural de hierbas que desinflama, relaja y equilibra desde adentro. Ideal para momentos de estres y ansiedad. Ingredientes: boldo, tilo, cedron, malva, hibiscus y cola de caballo.",
    "price": 1800,
    "compare_at_price": 2000,
    "category": "yuyitos",
    "images": [
      "/placeholder/Mix_Calma_Profunda.jpg"
    ],
    "in_stock": true,
    "is_featured": true,
    "badge": "DESTACADO",
    "whatsapp_number": "3644663166",
    "created_at": "2026-08-19T12:35:35.204Z"
  },
  {
    "id": "mx-hierbas-02",
    "title": "Mix Equilibrio Vital",
    "description": "Infusión natural de hierbas que despierta los sentidos y armoniza tu interior. Ideal para comenzar el día con energía y enfoque. Ingredientes: siempre vive, malva, rosa mosqueta, naranja y canela.",
    "price": 1800,
    "compare_at_price": null,
    "category": "yuyitos",
    "images": [
      "/placeholder/Mix_Equilibrio_Vital.jpg",
      "/placeholder/Mix_Equilibrio_Vital2.jpg"
    ],
    "in_stock": true,
    "is_featured": false,
    "badge": "NUEVO",
    "whatsapp_number": "3644663166",
    "created_at": "2026-08-21T12:35:35.204Z"
  },
  {
    "id": "mx-hierbas-03",
    "title": "Mix Dulce Natural",
    "description": "“Dulce Natural” es una infusión tropical, naturalmente dulce con stevia y sin azúcares añadidos. No eleva los niveles de glucosa en sangre, por lo que es ideal para personas con diabetes o quienes buscan un estilo de vida equilibrado. Ingredientes: coco en escamas, cedrón, cáscara de naranja, manzanilla y anís estrellado, ofrece frescura, aroma y beneficios digestivos en cualquier momento del día.",
    "price": 1800,
    "compare_at_price": 2000,
    "category": "yuyitos",
    "images": [
      "/placeholder/Mix_Dulce_Natural.jpg"
    ],
    "in_stock": true,
    "is_featured": true,
    "badge": "DESTACADO",
    "whatsapp_number": "3644663166",
    "created_at": "2026-08-23T12:35:35.204Z"
  },
  {
    "id": "mx-hierbas-04",
    "title": "Mix Gin Tonic",
    "description": "Mezcla de hierbas y flores especialmente seleccionadas para realzar el sabor de tu gin tonic. Ingredientes: anis estrellado, coco",
    "price": 1800,
    "compare_at_price": null,
    "category": "yuyitos",
    "images": [
      "/placeholder/Mix_Gin_Tonic1.jpg",
      "/placeholder/Mix_Gin_Tonic2.jpg"
    ],
    "in_stock": false,
    "is_featured": false,
    "badge": "NUEVO",
    "whatsapp_number": "3644663166",
    "created_at": "2026-08-25T12:35:35.204Z"
  },
  {
    "id": "mx-hierbas-05",
    "title": "Mix ",
    "description": "Mix ",
    "price": 1300,
    "compare_at_price": null,
    "category": "yuyitos",
    "images": [
      "/placeholder/Mix_hierbas.jpg"
    ],
    "in_stock": true,
    "is_featured": false,
    "badge": null,
    "whatsapp_number": "3644663166",
    "created_at": "2026-08-27T12:35:35.204Z"
  },
  {
    "id": "mx-hierbas-06",
    "title": "Mix Floral \"Serenidad\"",
    "description": "Este mix floral, equilibrado y armonioso, es ideal para acompañar momentos de calma y conexión. Se compone de una infusión natural con ingredientes como siempreviva, rosa mosqueta, manzanilla, flor de tilo, pétalos de rosa, caléndula, coco en escamas y naranja. Su contenido es de 50 g.",
    "price": 3800,
    "compare_at_price": null,
    "category": "yuyitos",
    "images": [
      "/placeholder/Mix_Floral.jpg"
    ],
    "in_stock": true,
    "is_featured": false,
    "badge": null,
    "whatsapp_number": "3644663166",
    "created_at": "2026-08-29T12:35:35.204Z"
  },
  {
    "id": "mx-hierbas-07",
    "title": "Mix Herbal \"Refrescante\"",
    "description": "Esta infusión natural ha sido creada para brindar frescura y bienestar. Contiene una mezcla revitalizante de menta, cedrón, eucalipto, yerba lucero, boldo, poleo, burrito y anís estrellado. El contenido es de 50 g.",
    "price": 3800,
    "compare_at_price": null,
    "category": "yuyitos",
    "images": [
      "/placeholder/Mix_Herbal.jpg"
    ],
    "in_stock": true,
    "is_featured": false,
    "badge": null,
    "whatsapp_number": "3644663166",
    "created_at": "2026-08-31T12:35:35.204Z"
  },
  {
    "id": "mx-hierbas-08",
    "title": "Mix Relajante",
    "description": "Este mix ha sido especialmente formulado para calmar la ansiedad, mejorar la calidad del sueño y relajar tanto el cuerpo como la mente. Sus ingredientes incluyen tilo, pasiflora, melisa, manzanilla, cedrón y pétalos de rosa. El contenido es de 50 g.",
    "price": 3800,
    "compare_at_price": null,
    "category": "yuyitos",
    "images": [
      "/placeholder/Mix_Relajante.jpg"
    ],
    "in_stock": true,
    "is_featured": false,
    "badge": null,
    "whatsapp_number": "3644663166",
    "created_at": "2026-09-02T12:35:35.204Z"
  },
  {
    "id": "mx-hierbas-10",
    "title": "Ruleta de Yuyitos",
    "description": "Una experiencia única para explorar sabores. Nuestra Ruleta de Yuyitos es una selección especial de 6 hierbas y flores para que puedas crear tus propias mezclas. Ideal para regalar o para llevar tu ritual del mate a otro nivel. Importante: La selección de hierbas puede variar según la disponibilidad de stock, ¡pero siempre te llevarás una combinación increíble!",
    "price": 7200,
    "compare_at_price": 8500,
    "category": "yuyitos",
    "images": [
      "/placeholder/_MG_2591.jpg",
      "/placeholder/_MG_2684.jpg",
      "/placeholder/_MG_2693.jpg"
    ],
    "in_stock": true,
    "is_featured": true,
    "badge": "DESTACADO",
    "whatsapp_number": "3644663166",
    "created_at": "2026-09-04T12:35:35.204Z"
  },
  {
    "id": "mx-hierbas-11",
    "title": "Mix Gin Tonic",
    "description": "Mezcla de hierbas y flores especialmente seleccionadas para realzar el sabor de tu gin tonic. Los ingredientes varian según la disponibilidad de stock, pero siempre incluyen una combinación única y deliciosa. ¡Experimenta y descubre nuevas sensaciones en cada copa!",
    "price": 1800,
    "compare_at_price": null,
    "category": "yuyitos",
    "images": [
      "/placeholder/MIX_GIN_TONIC2.jpg",
      "/placeholder/MIX_GIN_TONIC1.jpg",
      "/placeholder/MIX_GIN_TONIC3.jpg",
      "/placeholder/MIX_GIN_TONIC4.jpg",
      "/placeholder/MIX_GIN_TONIC5.jpg"
    ],
    "in_stock": true,
    "is_featured": false,
    "badge": null,
    "whatsapp_number": "3644663166",
    "created_at": "2026-09-06T12:35:35.205Z"
  },
  {
    "id": "mm-accesorios-01",
    "title": "Mate Imperial Dorado",
    "description": "Mate de acero inoxidable interior, forrado en cuero legítimo con virola dorada grabada en finos detalles artesanales. Su diseño combina elegancia, durabilidad e higiene, ofreciendo una experiencia de mate única y con estilo. Ideal para quienes buscan tradición con un toque moderno.",
    "price": 45000,
    "compare_at_price": null,
    "category": "mates",
    "images": [
      "/placeholder/Mate1.jpg",
      "/placeholder/Mate2.jpg"
    ],
    "in_stock": true,
    "is_featured": false,
    "badge": null,
    "whatsapp_number": "3644663166",
    "created_at": "2026-09-08T12:35:35.205Z"
  },
  {
    "id": "mm-accesorios-02",
    "title": "Mate Imperial Cincelado",
    "description": "Mate con interior de acero inoxidable, forrado en cuero legítimo y virola dorada con grabados de hojas y arabescos artesanales. Combina elegancia, resistencia e higiene, brindando una experiencia única para los amantes del mate. Un diseño tradicional con un acabado refinado que resalta el arte en cada detalle.",
    "price": 45000,
    "compare_at_price": 51500,
    "category": "mates",
    "images": [
      "/placeholder/Mate3.jpg",
      "/placeholder/Mate4.jpg",
      "/placeholder/Mate5.jpg"
    ],
    "in_stock": true,
    "is_featured": true,
    "badge": "DESTACADO",
    "whatsapp_number": "3644663166",
    "created_at": "2026-09-10T12:35:35.205Z"
  },
  {
    "id": "mm-accesorios-03",
    "title": "Mate Imperial Plateado \"Para Viajeros\" ",
    "description": "Mate de calabaza forrado en cuero con virola de acero inoxidable bañada en dorado, grabada con la frase \"Vamos a darle la vuelta al mundo\". Un diseño elegante y tradicional que combina resistencia, estilo y la esencia del buen mate. Es ideal para acompañar tus infusiones con un toque de distinción y un mensaje inspirador.",
    "price": 42000,
    "compare_at_price": 48500,
    "category": "mates",
    "images": [
      "/placeholder/Mate_Viruela_Blanca.jpg",
      "/placeholder/Mate-Frase.jpg"
    ],
    "in_stock": true,
    "is_featured": true,
    "badge": "DESTACADO",
    "whatsapp_number": "3644663166",
    "created_at": "2026-09-12T12:35:35.205Z"
  },
  {
    "id": "mm-accesorios-04",
    "title": "Mate Imperial Plateado \"Felicidad\"",
    "description": "Mate de calabaza forrado en cuero con virola de acero inoxidable bañada en dorado, grabada con la frase \"Felicidad es disfrutar las pequeñas cosas de la vida\". Un diseño elegante y tradicional que combina resistencia, estilo y la esencia del buen mate. Es ideal para acompañar tus infusiones con un toque de distinción y un mensaje inspirador.",
    "price": 42000,
    "compare_at_price": null,
    "category": "mates",
    "images": [
      "/placeholder/Mate_Viruela_Blanca2.jpg",
      "/placeholder/Mate_Viruela_Blanca3.jpg",
      "/placeholder/Mate-Frase.jpg"
    ],
    "in_stock": true,
    "is_featured": false,
    "badge": null,
    "whatsapp_number": "3644663166",
    "created_at": "2026-09-14T12:35:35.205Z"
  },
  {
    "id": "mm-accesorios-05",
    "title": "Mate de Acero \"Mañana será más bonito\"",
    "description": "Disfruta de tus mates con un toque de inspiración. Este mate de acero inoxidable con un elegante acabado en negro mate es práctico, duradero e higiénico. Cuenta con una virola de acero pulido y un grabado láser con la frase \"Mañana será más bonito\", perfecto para empezar el día con energía positiva. Al ser de acero, no necesita curado y es muy fácil de limpiar.",
    "price": 13000,
    "compare_at_price": null,
    "category": "mates",
    "images": [
      "/placeholder/Mate_Acero.jpg"
    ],
    "in_stock": true,
    "is_featured": false,
    "badge": null,
    "whatsapp_number": "3644663166",
    "created_at": "2026-09-16T12:35:35.205Z"
  },
  {
    "id": "mm-accesorios-06",
    "title": "Mate de Acero \"Siempre cree en ti\"",
    "description": "Un mate para recordarte tu valor cada día. Este mate de acero inoxidable con un elegante acabado en negro mate es práctico, duradero e higiénico. Cuenta con una virola de acero pulido y un delicado grabado láser con la frase \"Siempre cree en ti\". Al ser de acero, no necesita curado y es muy fácil de limpiar.",
    "price": 13000,
    "compare_at_price": null,
    "category": "mates",
    "images": [
      "/placeholder/Mate_Acero2.jpg"
    ],
    "in_stock": true,
    "is_featured": false,
    "badge": null,
    "whatsapp_number": "3644663166",
    "created_at": "2026-09-18T12:35:35.205Z"
  },
  {
    "id": "bb-accesorios-01",
    "title": "Bombilla de Acero Inoxidable \"Flor Roja\"",
    "description": "Esta es una bombilla de acero inoxidable de 22.5 cm, con un acabado completamente bañado en un vibrante color rojo. Su diseño es llamativo y elegante, con una decoración central que incluye una mariposa roja y racimos de cuentas del mismo color. El adorno se realza con pequeñas esferas doradas y una esfera dorada más grande en el centro, todo sujeto con alambre dorado que contrasta y complementa perfectamente el color base.",
    "price": 13000,
    "compare_at_price": null,
    "category": "bombillas",
    "images": [
      "/placeholder/Bombilla_roja.jpg",
      "/placeholder/Bombilla_roja1.jpg"
    ],
    "in_stock": true,
    "is_featured": false,
    "badge": null,
    "whatsapp_number": "3644663166",
    "created_at": "2026-09-20T12:35:35.205Z"
  },
  {
    "id": "bb-accesorios-02",
    "title": "Bombilla de Alpaca \"Mariposa Azul\"",
    "description": "Esta bombilla de alpaca destaca por su diseño sereno y elegante. En su vástago, tiene una mariposa celeste con textura floral, acompañada de cuentas en tonos celeste, blanco y perla, además de una pequeña rosa verde agua. Los apliques están sujetos con un alambre plateado que armoniza con el metal de la bombilla.",
    "price": 9000,
    "compare_at_price": null,
    "category": "bombillas",
    "images": [
      "/placeholder/Mariposa_Azul1.jpg",
      "/placeholder/Mariposa_Azul2.jpg"
    ],
    "in_stock": true,
    "is_featured": false,
    "badge": null,
    "whatsapp_number": "3644663166",
    "created_at": "2026-09-22T12:35:35.205Z"
  },
  {
    "id": "bb-accesorios-03",
    "title": "Bombilla de Alpaca \"Mariposa Roja\"",
    "description": "Esta bombilla de alpaca presenta un diseño vibrante y llamativo. Está decorada con una mariposa roja con textura de flores, complementada por cuentas en tonos rojo pasión, perlas blancas y una rosa blanca. Los apliques están sujetos por un alambre dorado que le da un toque de elegancia.",
    "price": 9000,
    "compare_at_price": null,
    "category": "bombillas",
    "images": [
      "/placeholder/Mariposa_Roja1.jpg",
      "/placeholder/Mariposa_Roja2.jpg"
    ],
    "in_stock": true,
    "is_featured": false,
    "badge": null,
    "whatsapp_number": "3644663166",
    "created_at": "2026-09-24T12:35:35.205Z"
  },
  {
    "id": "bb-accesorios-05",
    "title": "Bombilla de Alpaca \"Flor de la Suerte\"",
    "description": "Esta es una bombilla de alpaca con un diseño temático de jardín, lleno de color y detalles artesanales. El adorno principal es una flor turquesa con un centro naranja, sobre la que descansa una pequeña y detallada mariquita. La flor está acompañada de hojas verdes y una pequeña rosa azul en la parte superior. El diseño se complementa con cuentas en forma de perlas y pequeñas estrellas celestes, todo sujeto con un delicado alambre dorado que le da un acabado fino y brillante.",
    "price": 9000,
    "compare_at_price": null,
    "category": "bombillas",
    "images": [
      "/placeholder/Bombilla_Alpaca1.jpg",
      "/placeholder/Bombilla_Alpaca2.jpg"
    ],
    "in_stock": false,
    "is_featured": false,
    "badge": null,
    "whatsapp_number": "3644663166",
    "created_at": "2026-09-26T12:35:35.205Z"
  },
  {
    "id": "bb-accesorios-04",
    "title": "Bombilla de Metal \"Girasol\"",
    "description": "Esta bombilla de metal mide 19 cm, presenta un diseño decorativo, un adorno artesanal en el vástago, que consiste en un girasol amarillo acompañado de cuentas doradas y alambre metálico en espiral. Es una pieza llamativa que combina funcionalidad con un estilo alegre y único.",
    "price": 7000,
    "compare_at_price": 8000,
    "category": "bombillas",
    "images": [
      "/placeholder/Bombilla-girasol1.jpg",
      "/placeholder/Bombilla-girasol2.jpg",
      "/placeholder/Bombilla_Girasol1.jpg",
      "/placeholder/Bombilla_Girasol2.jpg",
      "/placeholder/Bombilla_Girasol3.jpg"
    ],
    "in_stock": true,
    "is_featured": true,
    "badge": "DESTACADO",
    "whatsapp_number": "3644663166",
    "created_at": "2026-09-28T12:35:35.205Z"
  },
  {
    "id": "bb-accesorios-06",
    "title": "Bombilla de Metal \"Mariposa Rosa\"",
    "description": "Esta bombilla de metal mide 19 cm y presenta un diseño femenino y delicado. Está decorada con una mariposa de porcelana en tonos rosados y blanco perla, que se complementa con cuentas en los mismos colores y pequeñas esferas doradas. Los alambres de metal se enrollan de forma artesanal, uniendo cada elemento y destacando el aplique central.",
    "price": 7000,
    "compare_at_price": null,
    "category": "bombillas",
    "images": [
      "/placeholder/monchi9.jpg",
      "/placeholder/monchi8.jpg"
    ],
    "in_stock": true,
    "is_featured": false,
    "badge": null,
    "whatsapp_number": "3644663166",
    "created_at": "2026-09-30T12:35:35.205Z"
  },
  {
    "id": "bb-accesorios-07",
    "title": "Bombilla de Metal \"Mariposa Negra\"",
    "description": "Esta bombilla de metal de 19 cm ofrece un estilo más sofisticado y elegante. En su vástago, tiene una mariposa de porcelana en tonos plateados oscuros y dorados. El adorno se completa con una hilera de cuentas negras intercaladas con esferas doradas, sujetas con alambres de metal. La combinación de colores crea un contraste llamativo y lujoso.",
    "price": 7000,
    "compare_at_price": null,
    "category": "bombillas",
    "images": [
      "/placeholder/monchi11.jpg",
      "/placeholder/monchi10.jpg"
    ],
    "in_stock": true,
    "is_featured": false,
    "badge": null,
    "whatsapp_number": "3644663166",
    "created_at": "2026-10-02T12:35:35.205Z"
  },
  {
    "id": "bb-accesorios-08",
    "title": "Bombilla de Metal \"Mariposa Celeste\"",
    "description": "Esta bombilla de metal de 19 cm tiene un diseño fresco y vibrante. Presenta una mariposa de porcelana en tonos celestes y blanco perla, acompañada de cuentas celestes, blancas y doradas. Los alambres metálicos se enrollan de manera artesanal, uniendo cada elemento y resaltando el aplique central con un toque de elegancia y color.",
    "price": 7000,
    "compare_at_price": null,
    "category": "bombillas",
    "images": [
      "/placeholder/monchi3.jpg",
      "/placeholder/monchi2.jpg"
    ],
    "in_stock": true,
    "is_featured": false,
    "badge": null,
    "whatsapp_number": "3644663166",
    "created_at": "2026-10-04T12:35:35.205Z"
  },
  {
    "id": "bb-accesorios-09",
    "title": "Bombilla de Metal \"Mariposa Fantasía\"",
    "description": "Esta bombilla de metal de 19 cm presenta un diseño vibrante con una mariposa de metal esmaltado en tonos azules y rosados, que irradia un encanto lúdico. El vástago está adornado con una serie de cuentas de colores pastel (azul, rosa, blanco y dorado), creando una secuencia armoniosa. Los detalles de alambre en espiral añaden un toque artesanal y sostienen firmemente los apliques, haciendo de esta bombilla un accesorio alegre y funcional para el mate.",
    "price": 7000,
    "compare_at_price": null,
    "category": "bombillas",
    "images": [
      "/placeholder/monchi5.jpg",
      "/placeholder/monchi4.jpg"
    ],
    "in_stock": true,
    "is_featured": false,
    "badge": null,
    "whatsapp_number": "3644663166",
    "created_at": "2026-10-06T12:35:35.205Z"
  },
  {
    "id": "bb-accesorios-10",
    "title": "Bombilla de Metal \"Flor Fucsia\"",
    "description": "Esta bombilla de metal de 19 cm luce un diseño glamuroso y brillante. El adorno central es una flor de cristales fucsias que capta la luz, creando un efecto deslumbrante. A cada lado de la flor, se encuentran cuentas redondas fucsias y pequeñas esferas doradas, enlazadas con alambre de cobre en espiral. La combinación de colores y texturas confiere a esta bombilla un estilo distintivo, ideal para quienes buscan un toque de sofisticación y color en su mate.",
    "price": 7000,
    "compare_at_price": 8000,
    "category": "bombillas",
    "images": [
      "/placeholder/monchi6.jpg",
      "/placeholder/monchi7.jpg"
    ],
    "in_stock": true,
    "is_featured": true,
    "badge": "DESTACADO",
    "whatsapp_number": "3644663166",
    "created_at": "2026-10-08T12:35:35.205Z"
  },
  {
    "id": "dd-accesorios-17",
    "title": "Despolvillador Elegante",
    "description": "Despolvillador de plastico con diseño elegante y funcional. Perfecto para mantener tu mate limpio y libre de polvo. Colores disponibles: (Blanco y Gris).",
    "price": 7500,
    "compare_at_price": 8500,
    "category": "accesorios",
    "images": [
      "/placeholder/Despolvillador_Blanco1.jpg",
      "/placeholder/Despolvillador_Blanco2.jpg"
    ],
    "in_stock": true,
    "is_featured": true,
    "badge": "DESTACADO",
    "whatsapp_number": "3644663166",
    "created_at": "2026-10-10T12:35:35.205Z"
  },
  {
    "id": "cb-combos-01",
    "title": "Combo Bombilla Mariposa Celeste + Mix Calma Profunda",
    "description": "Este combo incluye una bombilla de metal decorada con una mariposa celeste y un mix de hierbas \"Calma Profunda\". La bombilla mide 19 cm y presenta un diseño fresco y vibrante, mientras que el mix es una infusión natural ideal para momentos de estrés y ansiedad. Una combinación perfecta para disfrutar de un mate relajante con estilo.",
    "price": 10000,
    "compare_at_price": 11500,
    "category": "combos",
    "images": [
      "/placeholder/Combo.jpg"
    ],
    "in_stock": true,
    "is_featured": true,
    "badge": "DESTACADO",
    "whatsapp_number": "3644663166",
    "created_at": "2026-10-12T12:35:35.205Z"
  }
];
