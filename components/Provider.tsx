'use client'
import { Toaster } from 'react-hot-toast'
import { CartProvider } from '@/context/CartContext'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <Toaster position="top-right" />
    </CartProvider>
  )
}
