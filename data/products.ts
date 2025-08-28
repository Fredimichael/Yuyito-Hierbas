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
    price: 1000, 
    category: 'yuyitos', 
    subcategory: 'para mate', 
    images:[ '/placeholder/Mix_Calma_Profunda.jpg'], 
    description: 'Infusión natural de hierbas que desinflama, relaja y equilibra desde adentro. Ideal para momentos de estres y ansiedad. Ingredientes: boldo, tilo, cedron, malva, hibiscus y cola de caballo.' ,
    featured: true 
  },
  { id: 'mx-hierbas-02', 
    title: 'Mix Equilibrio Vital', 
    price: 1000, 
    category: 'yuyitos', 
    subcategory: 'para mate', 
    images:[ '/placeholder/Mix_Equilibrio_Vital.jpg','/placeholder/Mix_Equilibrio_Vital2.jpg'], 
    description: 'Infusión natural de hierbas que despierta los sentidos y armoniza tu interior. Ideal para comenzar el día con energía y enfoque. Ingredientes: siempre vive, malva, rosa mosqueta, naranja y canela.' ,
  },
  { id: 'mx-hierbas-03', 
    title: 'Mix Dulce Natural', 
    price: 1000, 
    category: 'yuyitos', 
    subcategory: 'para mate', 
    images:[ '/placeholder/Mix_Dulce_Natural.jpg','/placeholder/Mix_Dulce_Natural2.jpg'], 
    description: 'Anillo de acero dorado con un diseño moderno de bandas múltiples que se cruzan y entrelazan en la parte frontal. Las bandas son lisas, redondeadas y tienen un acabado pulido brillante, creando un efecto de profundidad y movimiento.' , 
  },
  { id: 'mx-hierbas-04', 
    title: 'Mix Gin Tonic',
    price: 1000, 
    category: 'yuyitos', 
    subcategory: 'para gin tonic', 
    images:[ '/placeholder/Mix_Gin_Tonic1.jpg','/placeholder/Mix_Gin_Tonic2.jpg'], 
    description: 'Mezcla de hierbas y flores especialmente seleccionadas para realzar el sabor de tu gin tonic. Ingredientes: anis estrellado, coco' ,
    featured: true
  }
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
  ,{ id: 'mm-accesorios-01', 
    title: 'Mate Virola Dorada', 
    price: 1000, 
    category: 'accesorios', 
    subcategory: 'mates', 
    images:[ '/placeholder/Mate1.jpg','/placeholder/Mate2.jpg'], 
    description: 'Mate de acero inoxidable con virola dorada y diseño elegante. Ideal para disfrutar de tu infusión favorita con estilo.' , 
    featured: true
  },
  { id: 'mm-accesorios-02', 
    title: 'Mate Virola Cincelada', 
    price: 1000, 
    category: 'accesorios', 
    subcategory: 'mates', 
    images:[ '/placeholder/Mate3.jpg','/placeholder/Mate4.jpg', '/placeholder/Mate5.jpg'], 
    description: 'Mate de acero inoxidable con virola cincelada y diseño sofisticado. Perfecto para quienes buscan un toque de distinción en su ritual del mate.' ,
  }

  ,{ id: 'mm-accesorios-03', 
    title: 'Bombilla Girasol', 
    price: 1000, 
    category: 'accesorios', 
    subcategory: 'bombillas', 
    images:[ '/placeholder/Bombilla_Girasol.jpg','/placeholder/Bombilla_Girasol1.jpg','/placeholder/Bombilla_Girasol2.jpg', '/placeholder/Bombilla_Girasol3.jpg'], 
    description: 'Bombilla de acero inoxidable con filtro tipo bulbo y diseño de girasol en la parte superior. Ideal para disfrutar de tu mate con estilo y alegría.' , 
  }
  ,{ id: 'mm-accesorios-04', 
    title: 'Bombilla Flor Roja', 
    price: 1000, 
    category: 'accesorios', 
    subcategory: 'bombillas', 
    images:[ '/placeholder/Bombilla_roja.jpg', '/placeholder/Bombilla_.jpg'], 
    description: 'Bombilla de acero inoxidable con filtro tipo bulbo y diseño de flor roja en la parte superior. Perfecta para quienes buscan un toque de color y elegancia en su ritual del mate.' , 
    featured: true}
  ,{ id: 'mm-accesorios-05', 
    title: 'Despolvillador Elegante', 
    price: 1000, 
    category: 'accesorios', 
    subcategory: 'despolvilladores', 
    images:[ '/placeholder/Despolvillador_Blanco1.jpg','/placeholder/Despolvillador_Blanco2.jpg'], 
    description: 'Despolvillador de plastico blanco con diseño elegante y funcional. Perfecto para mantener tu mate limpio y libre de polvo.' ,
    featured: true
  }
  //Combos///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
]