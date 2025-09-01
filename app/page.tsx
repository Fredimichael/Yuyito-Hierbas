import Link from 'next/link'
import ProductGrid from '@/components/ProductGrid'
import BannerCarousel from '@/components/BannerCarousel'
import { products } from '@/data/products'
import { banners } from '@/data/banners'
import Image from 'next/image'

export default function HomePage() {
  const highlighted = products.filter(p => p.featured).slice(0, 8) 
  return (
    <div className="space-y-12">
      <BannerCarousel images={banners} />
      <section className="text-center py-2 flex flex-col items-center justify-center">
        {/* Logo grande */}
        <Image        
          src="/LogoHome.png" 
          alt="Logo Yuyito Hierbas" 
          width={400}
          height={100}
          className="h-auto w-auto mb-1"
        />
        <p className="text-base md:text-lg opacity-80">Yuyito Hierbas - sabores que viajan, experiencias que transportan.</p>
        <div className="mt-6">
          <Link href="/catalog" className="inline-block bg-black text-white px-6 py-3 rounded-full">Ver catálogo</Link>
        </div>
      </section>
      {/* Productos destacados */}
      <section>
        <h2 className="font-heading text-2xl mb-4">Destacados</h2>
        <ProductGrid items={highlighted} />
      </section>
    </div>
  )
}
