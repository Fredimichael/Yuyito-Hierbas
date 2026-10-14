"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from "lucide-react";
import { Banner } from "@/types";

interface BannerSliderProps {
  banners: Banner[];
}

export function BannerSlider({ banners }: BannerSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeBanners = banners.filter((b) => b.is_active);

  const nextSlide = useCallback(() => {
    if (activeBanners.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
  }, [activeBanners.length]);

  const prevSlide = () => {
    if (activeBanners.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + activeBanners.length) % activeBanners.length);
  };

  useEffect(() => {
    if (activeBanners.length <= 1) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide, activeBanners.length]);

  if (activeBanners.length === 0) return null;

  const currentBanner = activeBanners[currentIndex];

  return (
    <div className="relative w-full overflow-hidden rounded-[2.5rem] ios-glass-card p-2 sm:p-3 my-8 sm:my-10 group">
      {/* Background Image Container */}
      <div className="relative w-full h-[400px] sm:h-[480px] md:h-[540px] rounded-[2rem] overflow-hidden">
        {activeBanners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
          >
            <Image
              src={banner.image_url}
              alt={banner.title}
              fill
              priority={index === 0}
              className="object-cover object-center transform scale-105 group-hover:scale-100 transition-transform duration-1000"
            />
            {/* Apple style liquid gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/20 to-transparent hidden sm:block" />
          </div>
        ))}

        {/* Content Overlay */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 sm:p-10 md:p-14 max-w-3xl">
          {currentBanner.badge && (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full ios-glass-pill text-xs font-bold text-emerald-300 w-fit mb-3.5 border border-emerald-400/40 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <span>{currentBanner.badge}</span>
            </div>
          )}

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2 sm:mb-3 leading-tight drop-shadow-lg">
            {currentBanner.title}
          </h2>

          {currentBanner.subtitle && (
            <p className="text-sm sm:text-base md:text-lg text-white/80 mb-6 max-w-2xl line-clamp-2 sm:line-clamp-3 leading-relaxed">
              {currentBanner.subtitle}
            </p>
          )}

          {currentBanner.button_text && (
            <div>
              <a
                href={currentBanner.button_link || "#catalogo"}
                className="ios-glass-milky-btn inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-xs sm:text-sm font-extrabold transition-all hover:gap-3.5 shadow-xl text-[#082015]"
              >
                <span>{currentBanner.button_text}</span>
                <ArrowRight className="w-4 h-4 text-[#082015]" />
              </a>
            </div>
          )}
        </div>

        {/* Navigation Arrows */}
        {activeBanners.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              aria-label="Anterior banner"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full ios-glass-icon-btn text-white/90 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Siguiente banner"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full ios-glass-icon-btn text-white/90 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Indicators */}
        {activeBanners.length > 1 && (
          <div className="absolute bottom-5 right-6 z-30 flex items-center gap-2 p-1.5 px-3 rounded-full ios-glass-pill shadow-xl">
            {activeBanners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Ir al banner ${idx + 1}`}
                className={`transition-all duration-300 rounded-full h-2 ${idx === currentIndex ? "w-7 bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.7)]" : "w-2 bg-white/40 hover:bg-white/70"
                  }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
