export type Category = 'yuyitos' | 'accesorios' | 'combos' ;
export type Subcategory = 'para mate' | 'para terere'| 'para gin tonic' | 'hierbas-puras' | 'mates' | 'bombillas' | 'despolvilladores' ;

export type Product = {
  id: string
  title: string
  price: number
  category: Category
  subcategory: Subcategory
  images: string[]
  description: string
  featured?: boolean
  outOfStock?: boolean 
}

export const products: Product[] = [
  //Yuyitos///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  { id: 'mx-hierbas-01', 
    title: 'Mix Calma Profunda', 
    price: 1800, 
    category: 'yuyitos', 
    subcategory: 'para mate', 
    images:[ '/placeholder/Mix_Calma_Profunda.jpg'], 
    description: 'Infusión natural de hierbas que desinflama, relaja y equilibra desde adentro. Ideal para momentos de estres y ansiedad. Ingredientes: boldo, tilo, cedron, malva, hibiscus y cola de caballo.' ,
    featured: true 
  },
  { id: 'mx-hierbas-02', 
    title: 'Mix Equilibrio Vital', 
    price: 1800, 
    category: 'yuyitos', 
    subcategory: 'para mate', 
    images:[ '/placeholder/Mix_Equilibrio_Vital.jpg','/placeholder/Mix_Equilibrio_Vital2.jpg'], 
    description: 'Infusión natural de hierbas que despierta los sentidos y armoniza tu interior. Ideal para comenzar el día con energía y enfoque. Ingredientes: siempre vive, malva, rosa mosqueta, naranja y canela.' ,
  },
  { id: 'mx-hierbas-03', 
    title: 'Mix Dulce Natural', 
    price: 1800, 
    category: 'yuyitos', 
    subcategory: 'para mate', 
    images:[ '/placeholder/Mix_Dulce_Natural.jpg',], 
    description: '“Dulce Natural” es una infusión tropical, naturalmente dulce con stevia y sin azúcares añadidos. No eleva los niveles de glucosa en sangre, por lo que es ideal para personas con diabetes o quienes buscan un estilo de vida equilibrado. Ingredientes: coco en escamas, cedrón, cáscara de naranja, manzanilla y anís estrellado, ofrece frescura, aroma y beneficios digestivos en cualquier momento del día.' , 
    featured: true
  },
  { id: 'mx-hierbas-04', 
    title: 'Mix Gin Tonic',
    price: 1000, 
    category: 'yuyitos', 
    subcategory: 'para gin tonic', 
    images:[ '/placeholder/Mix_Gin_Tonic1.jpg','/placeholder/Mix_Gin_Tonic2.jpg'], 
    description: 'Mezcla de hierbas y flores especialmente seleccionadas para realzar el sabor de tu gin tonic. Ingredientes: anis estrellado, coco' ,
    featured: true
  },
  // { id: '', 
  //   title: 'Mix Relax Total', 
  //   price: 1000, 
  //   category: 'yuyitos', 
  //   subcategory: 'para mate', 
  //   images:[ '/placeholder/Mix_Relax_Total.jpg','/placeholder/Anillo_Dual2.jpg'], 
  //   description: 'Anillo de acero dorado con un diseño moderno de bandas múltiples que se cruzan y entrelazan en la parte frontal. Las bandas son lisas, redondeadas y tienen un acabado pulido brillante, creando un efecto de profundidad y movimiento.' , 
  // },
  // { id: '', 
  //   title: 'Hierba Pura de Menta', 
  //   price: 1000, 
  //   category: 'yuyitos', 
  //   subcategory: 'hierbas-puras', 
  //   images:[ '/placeholder/Hierba_Pura_de_Menta.jpg','/placeholder/Anillo_Dual2.jpg'], 
  //   description: 'Anillo de acero dorado con un diseño moderno de bandas múltiples que se cruzan y entrelazan en la parte frontal. Las bandas son lisas, redondeadas y tienen un acabado pulido brillante, creando un efecto de profundidad y movimiento.' , 
  // }
  //Accesorios///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  { id: 'mm-accesorios-01', 
    title: 'Mate Imperial Dorado', 
    price: 45000, 
    category: 'accesorios', 
    subcategory: 'mates', 
    images:[ '/placeholder/Mate1.jpg','/placeholder/Mate2.jpg'], 
    description: 'Mate de acero inoxidable interior, forrado en cuero legítimo con virola dorada grabada en finos detalles artesanales. Su diseño combina elegancia, durabilidad e higiene, ofreciendo una experiencia de mate única y con estilo. Ideal para quienes buscan tradición con un toque moderno.' , 

  },
  { id: 'mm-accesorios-02', 
    title: 'Mate Imperial Cincelado', 
    price: 45000, 
    category: 'accesorios', 
    subcategory: 'mates', 
    images:[ '/placeholder/Mate3.jpg','/placeholder/Mate4.jpg', '/placeholder/Mate5.jpg'], 
    description: 'Mate con interior de acero inoxidable, forrado en cuero legítimo y virola dorada con grabados de hojas y arabescos artesanales. Combina elegancia, resistencia e higiene, brindando una experiencia única para los amantes del mate. Un diseño tradicional con un acabado refinado que resalta el arte en cada detalle.' ,
    featured: true
  },
  { id: 'mm-accesorios-03', 
    title: 'Mate Imperial Plateado "Para Viajeros" ', 
    price: 42000, 
    category: 'accesorios', 
    subcategory: 'mates', 
    images:[ '/placeholder/Mate_Viruela_Blanca.jpg','/placeholder/Mate-Frase.jpg'], 
    description: 'Mate de calabaza forrado en cuero con virola de acero inoxidable bañada en dorado, grabada con la frase "Vamos a darle la vuelta al mundo". Un diseño elegante y tradicional que combina resistencia, estilo y la esencia del buen mate. Es ideal para acompañar tus infusiones con un toque de distinción y un mensaje inspirador.',
    featured: true
  },
  { id: 'mm-accesorios-04', 
    title: 'Mate Imperial Plateado "Felicidad"',
    price: 42000,
    category: 'accesorios',
    subcategory: 'mates',
    images:[ '/placeholder/Mate_Viruela_Blanca2.jpg', '/placeholder/Mate_Viruela_Blanca3.jpg','/placeholder/Mate-Frase.jpg'], 
    description: 'Mate de calabaza forrado en cuero con virola de acero inoxidable bañada en dorado, grabada con la frase "Felicidad es disfrutar las pequeñas cosas de la vida". Un diseño elegante y tradicional que combina resistencia, estilo y la esencia del buen mate. Es ideal para acompañar tus infusiones con un toque de distinción y un mensaje inspirador.',
  },
  //Bombillas de acero inoxidable
  { id: 'bb-accesorios-01', 
    title: 'Bombilla de Acero Inoxidable "Flor Roja"', 
    price: 13000, 
    category: 'accesorios', 
    subcategory: 'bombillas', 
    images:[ '/placeholder/Bombilla_roja.jpg', '/placeholder/Bombilla_roja1.jpg'], 
    description: 'Esta es una bombilla de acero inoxidable de 22.5 cm, con un acabado completamente bañado en un vibrante color rojo. Su diseño es llamativo y elegante, con una decoración central que incluye una mariposa roja y racimos de cuentas del mismo color. El adorno se realza con pequeñas esferas doradas y una esfera dorada más grande en el centro, todo sujeto con alambre dorado que contrasta y complementa perfectamente el color base.',
  }, 
  //Bombillas de alpaca
  { id: 'bb-accesorios-02', 
    title: 'Bombilla de Alpaca "Mariposa Azul"', 
    price: 9000, 
    category: 'accesorios', 
    subcategory: 'bombillas', 
    images:[ '/placeholder/Mariposa_Azul1.jpg','/placeholder/Mariposa_Azul2.jpg'], 
    description: 'Esta bombilla de alpaca destaca por su diseño sereno y elegante. En su vástago, tiene una mariposa celeste con textura floral, acompañada de cuentas en tonos celeste, blanco y perla, además de una pequeña rosa verde agua. Los apliques están sujetos con un alambre plateado que armoniza con el metal de la bombilla.' ,
  },
  { id: 'bb-accesorios-03', 
    title: 'Bombilla de Alpaca "Mariposa Roja"', 
    price: 9000, 
    category: 'accesorios', 
    subcategory: 'bombillas', 
    images:[ '/placeholder/Mariposa_Roja1.jpg','/placeholder/Mariposa_Roja2.jpg'], 
    description: 'Esta bombilla de alpaca presenta un diseño vibrante y llamativo. Está decorada con una mariposa roja con textura de flores, complementada por cuentas en tonos rojo pasión, perlas blancas y una rosa blanca. Los apliques están sujetos por un alambre dorado que le da un toque de elegancia.' ,
  },  
  {
    id: 'bb-accesorios-05', 
    title: 'Bombilla de Alpaca "Flor de la Suerte"', 
    price: 9000, 
    category: 'accesorios', 
    subcategory: 'bombillas', 
    images:[ '/placeholder/Bombilla_Alpaca1.jpg','/placeholder/Bombilla_Alpaca2.jpg'], 
    description: 'Esta es una bombilla de alpaca con un diseño temático de jardín, lleno de color y detalles artesanales. El adorno principal es una flor turquesa con un centro naranja, sobre la que descansa una pequeña y detallada mariquita. La flor está acompañada de hojas verdes y una pequeña rosa azul en la parte superior. El diseño se complementa con cuentas en forma de perlas y pequeñas estrellas celestes, todo sujeto con un delicado alambre dorado que le da un acabado fino y brillante.' ,
    outOfStock: true 
  },
  //Bombillas de metal
  { id: 'bb-accesorios-04', 
    title: 'Bombilla de Metal "Girasol"', 
    price: 7000, 
    category: 'accesorios', 
    subcategory: 'bombillas', 
    images:[ '/placeholder/Bombilla-girasol1.jpg','/placeholder/Bombilla-girasol2.jpg','/placeholder/Bombilla_Girasol1.jpg','/placeholder/Bombilla_Girasol2.jpg', '/placeholder/Bombilla_Girasol3.jpg'], 
    description: 'Esta bombilla de metal mide 19 cm, presenta un diseño decorativo, un adorno artesanal en el vástago, que consiste en un girasol amarillo acompañado de cuentas doradas y alambre metálico en espiral. Es una pieza llamativa que combina funcionalidad con un estilo alegre y único.' , 
    featured: true
  },
  {
    id: 'bb-accesorios-06', 
    title: 'Bombilla de Metal "Mariposa Rosa"', 
    price: 7000, 
    category: 'accesorios', 
    subcategory: 'bombillas', 
    images:[ '/placeholder/monchi9.jpg','/placeholder/monchi8.jpg'], 
    description: 'Esta bombilla de metal mide 19 cm y presenta un diseño femenino y delicado. Está decorada con una mariposa de porcelana en tonos rosados y blanco perla, que se complementa con cuentas en los mismos colores y pequeñas esferas doradas. Los alambres de metal se enrollan de forma artesanal, uniendo cada elemento y destacando el aplique central.' ,
  },
  {
    id: 'bb-accesorios-07', 
    title: 'Bombilla de Metal "Mariposa Negra"', 
    price: 7000, 
    category: 'accesorios', 
    subcategory: 'bombillas', 
    images:[ '/placeholder/monchi11.jpg','/placeholder/monchi10.jpg'], 
    description: 'Esta bombilla de metal de 19 cm ofrece un estilo más sofisticado y elegante. En su vástago, tiene una mariposa de porcelana en tonos plateados oscuros y dorados. El adorno se completa con una hilera de cuentas negras intercaladas con esferas doradas, sujetas con alambres de metal. La combinación de colores crea un contraste llamativo y lujoso.' ,
  },
  {
    id: 'bb-accesorios-08', 
    title: 'Bombilla de Metal "Mariposa Celeste"', 
    price: 7000,
    category: 'accesorios',
    subcategory: 'bombillas',
    images:[ '/placeholder/monchi3.jpg','/placeholder/monchi2.jpg'],
    description: 'Esta bombilla de metal de 19 cm tiene un diseño fresco y vibrante. Presenta una mariposa de porcelana en tonos celestes y blanco perla, acompañada de cuentas celestes, blancas y doradas. Los alambres metálicos se enrollan de manera artesanal, uniendo cada elemento y resaltando el aplique central con un toque de elegancia y color.' ,
  },
  {
    id: 'bb-accesorios-09', 
    title: 'Bombilla de Metal "Mariposa Fantasía"', 
    price: 7000,
    category: 'accesorios',
    subcategory: 'bombillas',
    images:[ '/placeholder/monchi5.jpg','/placeholder/monchi4.jpg'],
    description: 'Esta bombilla de metal de 19 cm presenta un diseño vibrante con una mariposa de metal esmaltado en tonos azules y rosados, que irradia un encanto lúdico. El vástago está adornado con una serie de cuentas de colores pastel (azul, rosa, blanco y dorado), creando una secuencia armoniosa. Los detalles de alambre en espiral añaden un toque artesanal y sostienen firmemente los apliques, haciendo de esta bombilla un accesorio alegre y funcional para el mate.' ,
  },
  {
    id: 'bb-accesorios-10', 
    title: 'Bombilla de Metal "Flor Fucsia"',
    price: 7000,
    category: 'accesorios',
    subcategory: 'bombillas',
    images:[ '/placeholder/monchi6.jpg','/placeholder/monchi7.jpg'],
    description: 'Esta bombilla de metal de 19 cm luce un diseño glamuroso y brillante. El adorno central es una flor de cristales fucsias que capta la luz, creando un efecto deslumbrante. A cada lado de la flor, se encuentran cuentas redondas fucsias y pequeñas esferas doradas, enlazadas con alambre de cobre en espiral. La combinación de colores y texturas confiere a esta bombilla un estilo distintivo, ideal para quienes buscan un toque de sofisticación y color en su mate.' ,
    featured: true
  },
  //Despolvilladores
  { id: 'dd-accesorios-17', 
    title: 'Despolvillador Elegante', 
    price: 7500, 
    category: 'accesorios', 
    subcategory: 'despolvilladores', 
    images:[ '/placeholder/Despolvillador_Blanco1.jpg','/placeholder/Despolvillador_Blanco2.jpg'], 
    description: 'Despolvillador de plastico con diseño elegante y funcional. Perfecto para mantener tu mate limpio y libre de polvo. Colores disponibles: (Blanco y Gris).' ,
    featured: true
  }
  //Combos///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
]