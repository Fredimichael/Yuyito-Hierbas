"use client";

import React from "react";
import Image from "next/image";
import { MessageCircle, Share2, Sparkles } from "lucide-react";
import { Product } from "@/types";
import { formatPrice, createWhatsAppMessage, getWhatsAppShareUrl, getCatalogShareUrl, isProductNew, getProductWhatsAppPhone } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onShare?: (title: string, url: string, price: number, description?: string) => void;
}

export function ProductCard({ product, onSelect, onShare }: ProductCardProps) {
  const mainImage = product.images && product.images.length > 0
    ? product.images[0]
    : "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80";

  const hasDiscount = product.compare_at_price && product.compare_at_price > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.compare_at_price! - product.price) / product.compare_at_price!) * 100)
    : 0;

  const rawBadge = (product.badge || "").trim().toUpperCase();
  const isDestacado = rawBadge === "DESTACADO" || product.is_featured;
  const isNuevo = !isDestacado && isProductNew(product);

  const productUrl = getCatalogShareUrl(`/producto/${product.id}`);

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const phone = getProductWhatsAppPhone(product);
    const msg = createWhatsAppMessage(product.title, product.price, productUrl);
    window.open(getWhatsAppShareUrl(phone, msg), "_blank");
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onShare) {
      onShare(product.title, productUrl, product.price, product.description);
    }
  };

  return (
    <div
      onClick={() => onSelect(product)}
      className="group flex flex-col w-full cursor-pointer select-none transition-all duration-300 hover:scale-[1.015]"
    >
      {/* Card de Imagen 9:16 */}
      <div
        className="relative w-full aspect-[9/16] rounded-[2.2rem] sm:rounded-[2.5rem] product-glass-card overflow-hidden hover:shadow-2xl isolate flex flex-col justify-between"
        style={{ WebkitMaskImage: "-webkit-radial-gradient(white, black)" }}
      >
        {/* Background Image spanning the entire 9:16 card */}
        <div className="absolute inset-0 bg-black/40 overflow-hidden rounded-[2.2rem] sm:rounded-[2.5rem]">
          <Image
            src={mainImage}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
          />

          {/* Top vignette gradient overlay for badges contrast */}
          <div className="absolute inset-x-0 top-0 h-20 sm:h-28 bg-gradient-to-b from-black/80 via-black/30 to-transparent pointer-events-none" />
        </div>

        {/* Top Header: Badge, Stock y Compartir en la misma línea superior */}
        <div className="relative z-10 p-3 sm:p-3 flex items-center justify-between gap-1 w-full pointer-events-none">
          {/* Left: Badge (solo Nuevo o Destacado) */}
          <div className="flex items-center gap-1 pointer-events-auto shrink-0 min-w-0">
            {isDestacado && (
              <span className="ios-glass-pill-amber px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-xs font-bold flex items-center gap-1 shadow-md shrink-0 leading-tight">
                <span>Destacado</span>
              </span>
            )}

            {!isDestacado && isNuevo && (
              <span className="ios-glass-pill-emerald px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-xs font-bold flex items-center gap-1 shadow-md shrink-0 leading-tight">
                <span>Nuevo</span>
              </span>
            )}
          </div>

          {/* Right: Stock (sin puntito) + Compartir en la misma línea */}
          <div className="flex items-center gap-1 pointer-events-auto shrink-0">
            <span
              className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-xs font-semibold shadow-sm shrink-0 leading-tight ${product.in_stock ? "ios-glass-pill-emerald" : "ios-glass-pill-ruby"
                }`}
            >
              <span>{product.in_stock ? "En stock" : "Agotado"}</span>
            </span>

            {onShare && (
              <button
                onClick={handleShareClick}
                className="hidden sm:inline-flex p-1.5 sm:p-2 rounded-full ios-glass-icon-btn text-white/90 hover:text-white shadow-md active:scale-90 transition-transform cursor-pointer shrink-0"
                title="Compartir producto"
              >
                <Share2 className="w-3.5 h-3.5 text-cyan-300" />
              </button>
            )}
          </div>
        </div>

        {/* Acciones flotantes inferiores: Descuento (a la izquierda) + Botón Consultar */}
        <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 z-20 flex items-center gap-1.5 sm:gap-2 pointer-events-auto">
          {hasDiscount && (
            <span className="ios-glass-pill-discount px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold shadow-md flex items-center">
              -{discountPercent}%
            </span>
          )}

          <button
            onClick={handleWhatsAppClick}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white text-[10px] sm:text-xs font-bold shadow-[0_4px_16px_rgba(16,185,129,0.55)] border border-emerald-400/40 hover:scale-105 active:scale-90 transition-all cursor-pointer"
            title="Consultar por WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white fill-white/20" />
            <span>Consultar</span>
          </button>
        </div>
      </div>

      {/* Info debajo de la card (tanto en móvil como en PC) */}
      <div className="pt-2.5 sm:pt-3 px-1 flex flex-col">
        <h3 className="font-bold text-white text-[13px] sm:text-[15px] line-clamp-1 group-hover:text-emerald-300 transition-colors leading-snug">
          {product.title}
        </h3>

        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-sm sm:text-base font-black text-white tracking-tight drop-shadow-sm whitespace-nowrap">
            {formatPrice(product.price)}
          </span>
          {hasDiscount && (
            <span className="text-[11px] sm:text-xs line-through text-white/40 font-mono whitespace-nowrap">
              {formatPrice(product.compare_at_price!)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
