'use client'
import { useMemo, useState, useEffect } from 'react'
import type { Category, Subcategory, Product } from '@/data/products'
import { subcategoriesByCategory } from '@/data/products' // 👈 1. Importar la nueva estructura

const categories: { key: Category, label: string }[] = [
  { key: 'yuyitos', label: 'Yuyitos' },
  { key: 'accesorios', label: 'Accesorios' },
  { key: 'combos', label: 'Combos' },
] 

// 🗑️ Ya no necesitamos la lista estática de subcategorías aquí.

export default function Filters({ data, onChange }: { data: Product[], onChange: (items: Product[]) => void }) {
  const [cat, setCat] = useState<Category | 'all'>('all')
  const [sub, setSub] = useState<Subcategory | 'all'>('all')
  const [q, setQ] = useState('')
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')

  // 👇 2. Generar dinámicamente las subcategorías disponibles
  const availableSubcategories = useMemo(() => {
    if (cat === 'all') {
      return [] // Si no hay categoría seleccionada, no mostrar subcategorías
    }
    return subcategoriesByCategory[cat] || []
  }, [cat])

  // 👇 3. Reiniciar la subcategoría si la categoría principal cambia
  useEffect(() => {
    setSub('all')
  }, [cat])

  const filtered = useMemo(() => {
    let result = data.filter(p => {
      // Filter by category
      if (cat !== 'all' && p.category !== cat) return false

      // Filter by subcategory (the key change)
      if (sub !== 'all' && !p.subcategory.includes(sub)) return false

      // Filter by search query
      if (q && !p.title.toLowerCase().includes(q.toLowerCase())) return false

      return true
    })
    
    // Sort results by price
    result = result.sort((a, b) => order === 'asc' ? a.price - b.price : b.price - a.price)
    
    return result
  }, [data, cat, sub, q, order])
  useEffect(() => { 
    onChange(filtered)
  }, [filtered, onChange])

  return (
    <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between mb-6">
      <div className="flex gap-2 flex-wrap">
        <select value={cat} onChange={e => setCat(e.target.value as any)} className="border rounded-full px-3 py-2">
          <option value="all">Todas las categorías</option>
          {categories.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
        </select>
        
        {/* 👇 4. Actualizar el <select> de subcategorías */}
        <select 
          value={sub} 
          onChange={e => setSub(e.target.value as any)} 
          className="border rounded-full px-3 py-2"
          disabled={cat === 'all'} // Deshabilitado si no hay categoría
        >
          <option value="all">Todas las subcategorías</option>
          {/* Itera sobre la lista dinámica */}
          {availableSubcategories.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
        </select>
        
        <select value={order} onChange={e => setOrder(e.target.value as 'asc' | 'desc')} className="border rounded-full px-3 py-2">
          <option value="asc">Precio: menor a mayor</option>
          <option value="desc">Precio: mayor a menor</option>
        </select>
      </div>
      <input value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar..." className="border rounded-full px-4 py-2 w-full md:w-64" />
    </div>
  )
}