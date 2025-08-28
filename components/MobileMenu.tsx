'use client'
import Link from 'next/link'

export default function MobileMenu({ open, onClose }: { open: boolean, onClose: () => void }) {
  return (
    <div className={`md:hidden transition-all ${open ? 'max-h-64' : 'max-h-0'} overflow-hidden border-b`}>
      <div className="container py-4 flex flex-col gap-3">
        <Link href="/catalog" onClick={onClose}>Catálogo</Link>
        <Link href="/contact" onClick={onClose}>Contacto</Link>
      </div>
    </div>
  )
}
