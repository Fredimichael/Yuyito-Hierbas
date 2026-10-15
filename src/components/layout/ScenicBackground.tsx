"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

// =========================================================================
// 1. TODAS LAS IMÁGENES DE public/images/
// =========================================================================
const BACKGROUND_SCENES = [
  { id: "img-1", src: "/images/herbs/yuyos.png" },
  { id: "img-2", src: "/images/herbs/_MG_3032.jpg" },
  { id: "img-5", src: "/images/herbs/hierbas-5.webp" },
  { id: "img-6", src: "/images/herbs/_MG_3175.jpg" },
  { id: "img-7", src: "/images/herbs/_MG_3110.jpg" },

];


// =========================================================================
// 2. AJUSTES DE OPACIDAD Y NITIDEZ:
// =========================================================================
const OVERLAY_DARKNESS = 0.0;

// IMAGE_OPACITY: Opacidad propia de la imagen activa (1 = 100% visible)
const IMAGE_OPACITY = 1; // <-- LINEA 28: Cambiá entre 0.5 y 1 según prefieras

export function ScenicBackground() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      // Porcentaje de scroll de 0 a 1
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));

      // Divide el scroll proporcionalmente entre las 6 imágenes
      const index = Math.min(
        BACKGROUND_SCENES.length - 1,
        Math.floor(progress * BACKGROUND_SCENES.length)
      );

      setActiveIndex(index);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 6 Imágenes en transición suave */}
      {BACKGROUND_SCENES.map((item, idx) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === activeIndex ? "scale-100" : "scale-105 pointer-events-none"
            }`}
          style={{
            opacity: idx === activeIndex ? IMAGE_OPACITY : 0,
            transitionProperty: "opacity, transform",
            transitionDuration: "1200ms",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <Image
            src={item.src}
            alt="Fondo Yuyito Hierbas"
            fill
            priority={idx === 0}
            sizes="100vw"
            className="object-cover object-center transform scale-[1.02]"
          />
        </div>
      ))}

      {/* 
        CAPA DE OSCURECIMIENTO / CONTRASTE (LINEA 77):
        Controla qué tan oscura es la capa superior sobre las imágenes.
      */}
      <div
        className="absolute inset-0 bg-[#05080e]"
        style={{ opacity: OVERLAY_DARKNESS }}
      />

      {/* Degradado suave superior e inferior para legibilidad del navbar y footer */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05080e]/50 via-transparent to-[#05080e]/70" />
    </div>
  );
}
