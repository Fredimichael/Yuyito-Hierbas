"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  X, 
  Share2, 
  MessageCircle, 
  CheckCircle2, 
  XCircle, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ArrowLeft
} from "lucide-react";
import { Product } from "@/types";
import { formatPrice, createWhatsAppMessage, getWhatsAppShareUrl, getCatalogShareUrl, isProductNew, getProductWhatsAppPhone } from "@/lib/utils";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenShare: (title: string, url: string, price: number, description?: string) => void;
}

export function ProductModal({
  product,
  isOpen,
  onClose,
  onOpenShare,
}: ProductModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!isOpen || !product) return null;

  const images = product.images && product.images.length > 0 
    ? product.images 
    : ["https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80"];

  const hasDiscount = product.compare_at_price && product.compare_at_price > product.price;
  const discountPercent = hasDiscount 
    ? Math.round(((product.compare_at_price! - product.price) / product.compare_at_price!) * 100) 
    : 0;

  const rawBadge = (product.badge || "").trim().toUpperCase();
  const isDestacado = rawBadge === "DESTACADO" || product.is_featured;
  const isNuevo = !isDestacado && isProductNew(product);
  const showBadge = isNuevo || isDestacado;
  const badgeText = isDestacado ? "Destacado" : isNuevo ? "Nuevo" : null;

  const productUrl = getCatalogShareUrl(`/producto/${product.id}`);

  const handleWhatsAppBuy = () => {
    const phone = getProductWhatsAppPhone(product);
    const msg = createWhatsAppMessage(product.title, product.price, productUrl);
    window.open(getWhatsAppShareUrl(phone, msg), "_blank");
  };

  const handleShareClick = () => {
    onOpenShare(product.title, productUrl, product.price, product.description);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-2xl animate-in fade-in duration-200">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl z-10 flex flex-col items-center max-h-[96vh] sm:max-h-[92vh]">
        {/* Barra superior en móvil (ARRIBA de la card) */}
        <div className="sm:hidden w-full flex items-center justify-between px-4 pb-2 z-30 pointer-events-auto">
          <button
            onClick={onClose}
            className="p-2.5 rounded-full glass-icon-btn text-white/90 hover:text-white transition-all cursor-pointer shadow-lg active:scale-90"
            title="Volver atrás"
            aria-label="Volver atrás"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>

          <button
            onClick={handleShareClick}
            className="p-2.5 rounded-full glass-icon-btn text-cyan-400 hover:text-white transition-all cursor-pointer shadow-lg active:scale-90"
            title="Compartir Producto"
            aria-label="Compartir Producto"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Card */}
        <div className="relative glass-dock w-full rounded-t-3xl sm:rounded-3xl shadow-2xl border border-white/20 overflow-hidden max-h-[88vh] sm:max-h-[92vh] font-navbar flex flex-col">
          {/* Floating Top-Right Buttons SOLO en Desktop (dentro de la card) */}
          <div className="hidden sm:flex absolute top-5 right-5 items-center gap-2 z-30">
            <button
              onClick={handleShareClick}
              className="p-2.5 rounded-full glass-icon-btn text-cyan-400 hover:text-white transition-all cursor-pointer shadow-lg"
              title="Compartir Producto"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full glass-icon-btn text-white/80 hover:text-white transition-all cursor-pointer shadow-lg"
              title="Cerrar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {/* Left Column: Imagen 9:16 con controles y puntos (como en el boceto) */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="relative w-full aspect-[9/16] max-h-[68vh] rounded-2xl overflow-hidden glass-panel border border-white/20 shadow-2xl group bg-black/40">
              {/* Fondo desenfocado para ambientación */}
              <Image
                src={images[selectedImageIndex]}
                alt=""
                aria-hidden
                fill
                className="object-cover blur-2xl scale-125 opacity-40 pointer-events-none"
              />

              {/* Imagen principal nítida 9:16 */}
              <Image
                src={images[selectedImageIndex]}
                alt={product.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-cover object-center transition-all duration-500 ease-out group-hover:scale-105"
              />

              {/* Contador de fotos (1/2) arriba a la derecha en la imagen */}
              {images.length > 1 && (
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full glass-pill text-[11px] font-bold text-white shadow-lg pointer-events-none z-10">
                  {selectedImageIndex + 1}/{images.length}
                </div>
              )}

              {/* Flechas de navegación (< y >) en los costados */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2.5 rounded-full glass-icon-btn text-white hover:scale-110 active:scale-95 cursor-pointer shadow-lg z-10"
                    aria-label="Foto anterior"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSelectedImageIndex((prev) => (prev + 1) % images.length)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2.5 rounded-full glass-icon-btn text-white hover:scale-110 active:scale-95 cursor-pointer shadow-lg z-10"
                    aria-label="Foto siguiente"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {/* Puntos indicadores (---) en la parte inferior de la imagen */}
              {images.length > 1 && (
                <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 px-3 py-1.5 rounded-full glass-dock shadow-lg">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        idx === selectedImageIndex
                          ? "w-6 bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                          : "w-1.5 bg-white/40 hover:bg-white/70"
                      }`}
                      aria-label={`Ir a foto ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Nombre, [$60.000], Descripción y [Pedir o consult] */}
          <div className="md:col-span-7 flex flex-col justify-between gap-6 pt-2 sm:pt-3">
            <div className="space-y-4">
              {/* Tags en efecto glass (Categoría, Destacado, Stock) */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="ios-glass-pill-emerald px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                  {product.category}
                </span>

                {showBadge && (
                  <span className={`${isDestacado ? "ios-glass-pill-amber" : "ios-glass-pill-emerald"} px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm`}>
                    {isDestacado && <Sparkles className="w-3.5 h-3.5 text-amber-300" />}
                    <span>{badgeText}</span>
                  </span>
                )}

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                    product.in_stock ? "ios-glass-pill-emerald" : "ios-glass-pill-ruby"
                  }`}
                >
                  <span>{product.in_stock ? "En stock" : "Agotado"}</span>
                </span>
              </div>

              {/* Nombre de p. */}
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                {product.title}
              </h2>

              {/* [$60.000] en caja con estilo glass */}
              <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/20 shadow-lg flex items-center justify-between">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    {formatPrice(product.price)}
                  </span>
                  {hasDiscount && (
                    <span className="text-base sm:text-lg line-through text-white/40 font-mono">
                      {formatPrice(product.compare_at_price!)}
                    </span>
                  )}
                </div>

                {hasDiscount && (
                  <span className="ios-glass-pill-discount px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                    -{discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Descripción */}
              <div className="space-y-2">
                <h3 className="text-xs uppercase tracking-wider text-white/50 font-bold">
                  Descripción
                </h3>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed whitespace-pre-line">
                  {product.description || "Sin descripción adicional provista."}
                </p>
              </div>
            </div>

            {/* [Pedir o consult] Botón de acción */}
            <div className="pt-3">
              <button
                onClick={handleWhatsAppBuy}
                className="glass-button-primary w-full py-4 rounded-2xl flex items-center justify-center gap-2.5 font-bold text-sm sm:text-base shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 text-white" />
                <span>Pedir o consultar por WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
