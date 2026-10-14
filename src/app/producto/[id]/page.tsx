"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, 
  MessageCircle, 
  Share2, 
  CheckCircle2, 
  XCircle, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Sprout
} from "lucide-react";
import { Product } from "@/types";
import { DataService } from "@/lib/data-service";
import { formatPrice, createWhatsAppMessage, getWhatsAppShareUrl, getCatalogShareUrl, isProductNew, getProductWhatsAppPhone } from "@/lib/utils";
import { CLUB_NAME } from "@/lib/constants";
import { ShareModal } from "@/components/catalog/ShareModal";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScenicBackground } from "@/components/layout/ScenicBackground";
import { ProductCard } from "@/components/catalog/ProductCard";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Share Modal State
  const [shareData, setShareData] = useState<{
    isOpen: boolean;
    title: string;
    url: string;
    price?: number;
    description?: string;
  }>({
    isOpen: false,
    title: "",
    url: "",
  });

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      try {
        const prod = await DataService.getProductById(productId);
        setProduct(prod);
        if (prod) {
          const all = await DataService.getProducts();
          const related = all
            .filter((p) => p.category === prod.category && p.id !== prod.id)
            .slice(0, 4);
          setRelatedProducts(related);
        }
      } catch (err) {
        console.error("Error loading product", err);
      } finally {
        setLoading(false);
      }
    }
    if (productId) {
      loadProduct();
    }
  }, [productId]);

  const openShare = (title: string, url: string, price: number, description?: string) => {
    setShareData({
      isOpen: true,
      title,
      url,
      price,
      description,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#05080e] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
          <p className="text-xs text-white/50 font-medium">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#05080e] flex flex-col items-center justify-center p-6 text-center">
        <div className="glass-panel p-8 rounded-3xl max-w-md w-full">
          <Sprout className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Producto no encontrado</h2>
          <p className="text-xs text-white/60 mb-6">
            El artículo que estás buscando no existe o fue retirado del catálogo.
          </p>
          <Link href="/" className="glass-button-primary px-6 py-3 rounded-full text-xs font-semibold inline-block">
            Volver al Catálogo
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : [
    "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80"
  ];

  const hasDiscount = product.compare_at_price && product.compare_at_price > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.compare_at_price! - product.price) / product.compare_at_price!) * 100)
    : 0;

  const rawBadge = (product.badge || "").trim().toUpperCase();
  const isDestacado = rawBadge === "DESTACADO" || product.is_featured;
  const isNuevo = !isDestacado && isProductNew(product);

  const currentUrl = typeof window !== "undefined" ? window.location.href : getCatalogShareUrl(`/producto/${product.id}`);

  const handleWhatsAppBuy = () => {
    const phone = getProductWhatsAppPhone(product);
    const msg = createWhatsAppMessage(product.title, product.price, currentUrl);
    window.open(getWhatsAppShareUrl(phone, msg), "_blank");
  };

  return (
    <div className="min-h-screen bg-[#05080e] text-white flex flex-col relative overflow-hidden font-navbar">
      {/* Background escénico con desenfoque dinámico */}
      <ScenicBackground />

      <Navbar onOpenShareModal={() => openShare(product.title, currentUrl, product.price, product.description)} />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-16 w-full z-10">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white/80 hover:text-white mb-6 glass-pill px-4.5 py-2.5 rounded-full w-fit transition-all hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-400" />
          <span>Volver al catálogo completo</span>
        </Link>

        {/* Main Product Glass Card */}
        <div className="glass-dock rounded-[2.5rem] p-6 sm:p-10 border border-white/20 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Gallery Column: 9:16 Ratio */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="relative w-full aspect-[9/16] rounded-[2rem] overflow-hidden glass-panel border border-white/20 shadow-2xl group bg-black/40">
              {/* Fondo desenfocado de la misma imagen para armonizar márgenes */}
              <Image
                src={images[selectedImageIndex]}
                alt=""
                aria-hidden
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover blur-2xl scale-125 opacity-40 pointer-events-none"
              />

              {/* Imagen principal nítida en formato 9:16 */}
              <Image
                src={images[selectedImageIndex]}
                alt={product.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Badges superiores flotantes */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10 pointer-events-none">
                {hasDiscount ? (
                  <div className="px-3.5 py-1.5 rounded-full bg-red-500/85 backdrop-blur-md border border-red-400/40 text-white font-bold text-xs shadow-xl tracking-wide flex items-center gap-1.5 pointer-events-auto">
                    <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                    <span>-{discountPercent}% OFF</span>
                  </div>
                ) : <span />}

                {images.length > 1 && (
                  <div className="px-3 py-1 rounded-full glass-pill text-[11px] font-semibold text-white/90 shadow-lg pointer-events-auto">
                    {selectedImageIndex + 1} / {images.length}
                  </div>
                )}
              </div>

              {/* Controles de navegación */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 p-2.5 rounded-full glass-icon-btn text-white transition-all hover:scale-110 active:scale-95 shadow-xl cursor-pointer"
                    aria-label="Foto anterior"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setSelectedImageIndex((prev) => (prev + 1) % images.length)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-2.5 rounded-full glass-icon-btn text-white transition-all hover:scale-110 active:scale-95 shadow-xl cursor-pointer"
                    aria-label="Foto siguiente"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Miniaturas en formato 9:16 */}
            {images.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-16 sm:w-20 aspect-[9/16] rounded-xl overflow-hidden shrink-0 transition-all cursor-pointer glass-panel border ${
                      idx === selectedImageIndex
                        ? "ring-2 ring-emerald-400 scale-95 border-emerald-400/80 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                        : "border-white/10 opacity-60 hover:opacity-100 hover:border-white/30"
                    }`}
                  >
                    <Image src={img} alt={`Vista ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column in Liquid Glass */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            <div className="space-y-6">
              {/* Category, Badge, Discount & Stock Row */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="ios-glass-pill-emerald px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                  {product.category}
                </span>
                {isDestacado && (
                  <span className="ios-glass-pill-amber px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Destacado</span>
                  </span>
                )}
                {isNuevo && (
                  <span className="ios-glass-pill-emerald px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                    <span>Nuevo</span>
                  </span>
                )}
                {hasDiscount && (
                  <span className="ios-glass-pill-discount px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                    -{discountPercent}% OFF
                  </span>
                )}
                <span
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-sm ${
                    product.in_stock ? "ios-glass-pill-emerald" : "ios-glass-pill-ruby"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      product.in_stock ? "bg-emerald-400 animate-pulse" : "bg-red-400"
                    }`}
                  />
                  <span>{product.in_stock ? "En stock" : "Agotado"}</span>
                </span>
              </div>

              {/* Product Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
                {product.title}
              </h1>

              {/* Price Glass Card */}
              <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-white/20 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-white/50 font-semibold block mb-1">
                    Precio Oficial
                  </span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                      {formatPrice(product.price)}
                    </span>
                    {hasDiscount && (
                      <span className="text-lg sm:text-xl line-through text-white/40 font-mono">
                        {formatPrice(product.compare_at_price!)}
                      </span>
                    )}
                  </div>
                </div>
                {hasDiscount && (
                  <div className="px-3.5 py-1.5 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold shadow-sm">
                    Ahorras {formatPrice(product.compare_at_price! - product.price)}
                  </div>
                )}
              </div>

              {/* Value / Trust Badges in Glass */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="glass-panel p-3.5 rounded-2xl flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div className="text-[11px] leading-tight">
                    <span className="font-bold text-white block">Calidad Oficial</span>
                    <span className="text-white/50">{CLUB_NAME}</span>
                  </div>
                </div>
                <div className="glass-panel p-3.5 rounded-2xl flex items-center gap-2.5">
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div className="text-[11px] leading-tight">
                    <span className="font-bold text-white block">Atención Directa</span>
                    <span className="text-white/50">Asesoramiento personal</span>
                  </div>
                </div>
                <div className="glass-panel p-3.5 rounded-2xl col-span-2 sm:col-span-1 flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div className="text-[11px] leading-tight">
                    <span className="font-bold text-white block">Envíos & Entrega</span>
                    <span className="text-white/50">Coordinación por WhatsApp</span>
                  </div>
                </div>
              </div>

              {/* Description Glass Box */}
              <div className="glass-panel p-6 rounded-3xl border border-white/15 space-y-3">
                <h3 className="text-xs uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Descripción del Producto
                </h3>
                <p className="text-sm sm:text-base text-white/90 leading-relaxed whitespace-pre-line font-normal">
                  {product.description || "Sin descripción adicional provista."}
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-4 border-t border-white/10">
              <button
                onClick={handleWhatsAppBuy}
                className="glass-button-primary w-full sm:flex-1 py-4 sm:py-4.5 rounded-2xl flex items-center justify-center gap-3 font-extrabold text-sm sm:text-base shadow-2xl transition-all hover:scale-[1.02] cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 text-white" />
                <span>Pedir por WhatsApp</span>
              </button>

              <button
                onClick={() => openShare(product.title, currentUrl, product.price, product.description)}
                className="glass-button w-full sm:w-auto px-6 py-4 rounded-2xl flex items-center justify-center gap-2 text-sm font-semibold text-white/90 hover:text-white transition-all cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-cyan-400" />
                <span>Compartir / QR</span>
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 sm:mt-24">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
              Otros productos en <span className="text-emerald-400 capitalize">{product.category}</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onSelect={(selected) => router.push(`/producto/${selected.id}`)}
                  onShare={openShare}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />

      <ShareModal
        isOpen={shareData.isOpen}
        onClose={() => setShareData((prev) => ({ ...prev, isOpen: false }))}
        title={shareData.title}
        url={shareData.url}
        price={shareData.price}
        description={shareData.description}
      />
    </div>
  );
}
