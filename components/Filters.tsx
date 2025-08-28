'use client'
import { useMemo, useState } from 'react'
import type { Category, Subcategory, Product } from '@/data/products'

const categories: { key: Category, label: string }[] = [
  { key: 'yuyitos', label: 'Yuyitos' },
  { key: 'accesorios', label: 'Accesorios' },
  { key: 'combos', label: 'Combos' },
] 
const subs: { key: Subcategory, label: string }[] = [
  { key: 'para mate', label:  'Para Mate' },
  { key: 'para terere', label: 'Para Tereré' },
  { key: 'para gin tonic', label: 'Para Gin Tonic' },
  { key: 'hierbas-puras', label: 'Hierbas Puras' },
  { key: 'mates', label: 'Mates' },
  { key: 'bombillas', label: 'Bombillas' },
  { key: 'despolvilladores', label: 'Despolvilladores' },
]

export default function Filters({ data, onChange }: { data: Product[], onChange: (items: Product[]) => void }) {
  const [cat, setCat] = useState<Category | 'all'>('all')
  const [sub, setSub] = useState<Subcategory | 'all'>('all')
  const [q, setQ] = useState('')
  const [order, setOrder] = useState<'asc' | 'desc'>('asc') // 👈 nuevo estado

  const filtered = useMemo(() => {
    let result = data.filter(p => {
      if (cat !== 'all' && p.category !== cat) return false
      if (sub !== 'all' && p.subcategory !== sub) return false
      if (q && !p.title.toLowerCase().includes(q.toLowerCase())) return false
      return true
    })
    // Ordenar por precio
    result = result.sort((a, b) => order === 'asc' ? a.price - b.price : b.price - a.price)
    return result
  }, [data, cat, sub, q, order])

  useMemo(() => onChange(filtered), [filtered, onChange])

  return (
    <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between mb-6">
      <div className="flex gap-2 flex-wrap">
        <select value={cat} onChange={e => setCat(e.target.value as any)} className="border rounded-full px-3 py-2">
          <option value="all">Todas las categorías</option>
          {categories.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
        </select>
        <select value={sub} onChange={e => setSub(e.target.value as any)} className="border rounded-full px-3 py-2">
          <option value="all">Todas las subcategorías</option>
          {subs.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
        </select>
        {/* Nuevo filtro de orden */}
        <select value={order} onChange={e => setOrder(e.target.value as 'asc' | 'desc')} className="border rounded-full px-3 py-2">
          <option value="asc">Precio: menor a mayor</option>
          <option value="desc">Precio: mayor a menor</option>
        </select>
      </div>
      <input value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar..." className="border rounded-full px-4 py-2 w-full md:w-64" />
    </div>
  )
}
