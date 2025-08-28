'use client'
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { Product } from '@/data/products'

type CartItem = Product & { qty: number }

type CartContextType = {
  items: CartItem[]
  add: (p: Product) => void
  remove: (id: string) => void
  clear: () => void
  total: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const raw = typeof window !== 'undefined' ? localStorage.getItem('saira_cart') : null
    if (raw) setItems(JSON.parse(raw))
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('saira_cart', JSON.stringify(items))
    }
  }, [items])

  const add = (p: Product) => {
    setItems(prev => {
      const idx = prev.findIndex(i => i.id === p.id)
      if (idx >= 0) {
        const copy = [...prev]
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 }
        return copy
      }
      return [...prev, { ...p, qty: 1 }]
    })
  }

  const remove = (id: string) => setItems(prev => prev.filter(i => i.id !== id))
  const clear = () => setItems([])

  const total = useMemo(() => items.reduce((s, i) => s + i.price * i.qty, 0), [items])

  return (
    <CartContext.Provider value={{ items, add, remove, clear, total }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
