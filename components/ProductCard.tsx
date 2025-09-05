'use client'
import Link from 'next/link'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { useCart } from '@/context/CartContext'
import type { Product } from '@/data/products'

// 👇 1. AÑADIMOS ESTA FUNCIÓN PARA FORMATEAR LAS SUBCATEGORÍAS 👇
function formatSubcategoryLabels(subcategories: string[]) {
  const labels = subcategories.map(sub =>
    // Convierte "para mate" en "Para Mate"
    sub.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  );
  // Une los elementos con un guion
  return labels.join(' - ');
}

export default function ProductCard({ p }: { p: Product }) {
  const { add } = useCart()
  const isOutOfStock = p.outOfStock

  // Función para capitalizar la categoría principal
  const formattedCategory = p.category.charAt(0).toUpperCase() + p.category.slice(1);

  return (
    <div className={`border rounded-2xl p-4 hover:shadow-sm transition ${isOutOfStock ? 'opacity-50' : ''}`}>
      {isOutOfStock ? (
        <div className="pointer-events-none">
          <div className="relative aspect-square bg-neutral-100 rounded-xl mb-3 overflow-hidden">
            <Image src={p.images[0]} alt={p.title} fill className="object-cover" />
          </div>
        </div>
      ) : (
        <Link href={`/product/${p.id}`}>
          <div className="relative aspect-square bg-neutral-100 rounded-xl mb-3 overflow-hidden">
            <Image src={p.images[0]} alt={p.title} fill className="object-cover" />
          </div>
        </Link>
      )}
      <div className={`${isOutOfStock ? '' : 'block hover:underline'}`}>
        <h2 className="font-heading text-lg block">{p.title}</h2>
      </div>

      {/* 👇 2. AQUÍ USAMOS LA NUEVA FUNCIÓN 👇 */}
      <p className="opacity-70 text-sm">{formattedCategory} — {formatSubcategoryLabels(p.subcategory)}</p>

      <div className="flex items-center justify-between mt-2">
        {isOutOfStock ? (
          <span className="font-bold text-red-500 text-sm mx-auto">SIN STOCK</span>
        ) : (
          <>
            <span className="font-medium">${p.price.toFixed(0)}</span>
            <button
              onClick={() => { add(p); toast.success('Producto agregado al carrito') }}
              className="px-3 py-1.5 rounded-full bg-black text-white text-sm hover:opacity-90"
            >
              Agregar
            </button>
          </>
        )}
      </div>
    </div>
  )
}