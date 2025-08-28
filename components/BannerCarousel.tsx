"use client"

import { useState } from "react"
// import { banners } from "@/data/banners" // Eliminar esta línea
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

type Banner = {
  image: string
  alt: string
  href: string
}

type BannerCarouselProps = {
  images: Banner[]
}

export default function BannerCarousel({ images }: BannerCarouselProps) {
  const [current, setCurrent] = useState(0)

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="relative w-full h-[250px] md:h-[400px] overflow-hidden rounded-2xl shadow-lg">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.4 }}
          className="absolute w-full h-full"
        >
          <Link href={images[current].href}>
            <Image
              src={images[current].image}
              alt={images[current].alt}
              fill
              className="object-cover cursor-pointer"
              priority
            />
          </Link>
        </motion.div>
      </AnimatePresence>

      {/* Botón Anterior */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Botón Siguiente */}
      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicadores (puntitos) */}
      <div className="absolute bottom-3 w-full flex justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full ${
              i === current ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
