'use client'
import Link from 'next/link'
import { useState } from 'react'
import MobileMenu from './MobileMenu'
import { useCart } from '@/context/CartContext'
import Image from 'next/image'

function CartBadge({ count }: { count: number }) {
  return (
    <span className="ml-2 inline-flex items-center justify-center text-xs px-2 py-0.5 rounded-full bg-black text-white">
      {count}
    </span>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { items } = useCart()
  const count = items.reduce((s, i) => s + i.qty, 0)

  return (
    <header className="border-b">
      <div className="container flex items-center justify-between py-4">
        
        {/* MOBILE: menú + logo + carrito */}
        <div className="flex w-full items-center justify-between md:hidden">
          {/* Menú hamburguesa */}
          <button
            onClick={() => setOpen(v => !v)}
            aria-label="Menú"
            className="flex flex-col justify-center"
          >
            <div className="w-6 h-0.5 bg-black mb-1"></div>
            <div className="w-6 h-0.5 bg-black mb-1"></div>
            <div className="w-6 h-0.5 bg-black"></div>
          </button>

          {/* Logo centrado */}
          <Link href="/" className="flex items-center">
            <Image        
              src="/Sairapng.png" 
              alt="Logo Sáira" 
              width={100}
              height={40}
              className="h-auto w-auto"
            />
          </Link>

          {/* Carrito */}
          <Link href="/cart" className="relative hover:opacity-70 flex items-center">
            <span className="sr-only">Carrito</span>
            <svg width={20} height={29} viewBox="0 0 24.38 30.52" fill="none" className="text-black">
              <title>icon-cart</title>
              <path
                transform="translate(-3.62 -0.85)"
                d="M28,27.3,26.24,7.51a.75.75,0,0,0-.76-.69h-3.7a6,6,0,0,0-12,0H6.13a.76.76,0,0,0-.76.69L3.62,27.3v.07a4.29,4.29,0,0,0,4.52,4H23.48a4.29,4.29,0,0,0,4.52-4ZM15.81,2.37a4.47,4.47,0,0,1,4.46,4.45H11.35a4.47,4.47,0,0,1,4.46-4.45Zm7.67,27.48H8.13a2.79,2.79,0,0,1-3-2.45L6.83,8.34h3V11a.76.76,0,0,0,1.52,0V8.34h8.92V11a.76.76,0,0,0,1.52,0V8.34h3L26.48,27.4a2.79,2.79,0,0,1-3,2.44Zm0,0"
                fill="currentColor"
              />
            </svg>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold rounded-full px-2 py-0.5 shadow">
                {count}
              </span>
            )}
          </Link>
        </div>

        {/* DESKTOP: logo + links + carrito */}
        <div className="hidden md:flex w-full items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image        
              src="/Sairapng.png" 
              alt="Logo Sáira" 
              width={120}
              height={40}
              className="h-auto w-auto"
            />
          </Link>

          {/* Links */}
          <nav className="flex items-center gap-6">
            <Link href="/catalog" className="hover:opacity-70">Catálogo</Link>
            <Link href="/contact" className="hover:opacity-70">Contacto</Link>
            <Link href="/cart" className="relative hover:opacity-70 flex items-center">
              Carrito <CartBadge count={count} />
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile menu desplegable */}
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  )
}
