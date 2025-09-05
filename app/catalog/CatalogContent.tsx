'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Filters from '@/components/Filters'
import ProductGrid from '@/components/ProductGrid'
import { products as data, type Product, type Subcategory } from '@/data/products'

export default function CatalogContent() {
  const [items, setItems] = useState<Product[]>(data)
  const searchParams = useSearchParams()

  useEffect(() => {
    const subcat = searchParams.get('subcat')
    if (subcat) {
      // 👇 AQUÍ ESTÁ EL CAMBIO 👇
      // Usamos .includes() para buscar el 'subcat' dentro del array p.subcategory
      setItems(data.filter(p => p.subcategory.includes(subcat as Subcategory)))
    } else {
      setItems(data)
    }
  }, [searchParams])

  return (
    <div>
      <h1 className="font-heading text-3xl mb-6">Catálogo</h1>
      <Filters data={data} onChange={setItems} />
      <ProductGrid items={items} />
    </div>
  )
}