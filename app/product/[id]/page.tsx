import { notFound } from 'next/navigation'
import Link from 'next/link'
import { products } from '@/data/products'
import ProductDetail from '@/components/ProductDetail'
import ProductGrid from '@/components/ProductGrid'

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === params.id)
  if (!product) return notFound()

  const recommended = products
    .filter(p => p.subcategory === product.subcategory && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="space-y-10">
      <Link href="/catalog" className="inline-block px-4 py-2 rounded-full border">← Volver al catálogo</Link>
      <ProductDetail product={product} />
      {recommended.length > 0 && (
        <section className="space-y-4">
          <h2 className="font-heading text-2xl">Productos recomendados</h2>
          <ProductGrid items={recommended} />
        </section>
      )}
    </div>
  )
}
