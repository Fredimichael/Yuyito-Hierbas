"use client";

import React, { useState } from "react";
import { MessageCircle, ArrowRight } from "lucide-react";
import { Banner, Category, Product } from "@/types";
import { CLUB_NAME, CLUB_TAGLINE, DEFAULT_WHATSAPP_NUMBER } from "@/lib/constants";
import { getCatalogShareUrl, getWhatsAppShareUrl } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScenicBackground } from "@/components/layout/ScenicBackground";
import { BannerSlider } from "@/components/catalog/BannerSlider";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { ProductModal } from "@/components/catalog/ProductModal";
import { ShareModal } from "@/components/catalog/ShareModal";

interface CatalogClientProps {
  initialProducts: Product[];
  initialBanners: Banner[];
  initialCategories: Category[];
}

export function CatalogClient({
  initialProducts,
  initialBanners,
  initialCategories,
}: CatalogClientProps) {
  const [products] = useState<Product[]>(initialProducts);
  const [banners] = useState<Banner[]>(initialBanners);
  const [categories] = useState<Category[]>(initialCategories);

  // Selected product modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Share modal state
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

  const handleOpenShare = (
    title: string,
    url: string,
    price?: number,
    description?: string
  ) => {
    setShareData({
      isOpen: true,
      title,
      url,
      price,
      description,
    });
  };

  const handleOpenCatalogShare = () => {
    handleOpenShare(
      `${CLUB_NAME} - ${CLUB_TAGLINE}`,
      getCatalogShareUrl(),
      undefined,
      `Explorá el catálogo oficial de ${CLUB_NAME}.`
    );
  };

  const handleDirectWhatsApp = () => {
    const msg = `¡Hola ${CLUB_NAME}! Me comunico desde su catálogo web para hacer una consulta.`;
    window.open(getWhatsAppShareUrl(DEFAULT_WHATSAPP_NUMBER, msg), "_blank");
  };

  return (
    <div className="min-h-screen text-white flex flex-col relative">
      {/* Background with seamless scroll transitions */}
      <ScenicBackground />

      {/* Navigation */}
      <Navbar onOpenShareModal={handleOpenCatalogShare} />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-8 pt-24 sm:pt-28 w-full z-10">
        {/* Destacados / Banners */}
        {banners.length > 0 && (
          <section id="destacados" className="scroll-mt-28">
            <BannerSlider banners={banners} />
          </section>
        )}

        {/* Catalog */}
        <section id="catalogo" className="scroll-mt-28 mt-4">
          <ProductGrid
            products={products}
            categories={categories}
            onSelectProduct={(prod) => setSelectedProduct(prod)}
            onOpenShare={(title, url, price, description) =>
              handleOpenShare(title, url, price, description)
            }
          />
        </section>

        {/* Contacto Directo WhatsApp */}
        <section id="contacto" className="scroll-mt-28 my-16 sm:my-20">
          <div className="ios-glass-card rounded-[2.5rem] p-8 sm:p-12 text-center max-w-2xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mx-auto mb-5 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <MessageCircle className="w-7 h-7" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              ¿Tenés alguna consulta?
            </h2>
            <p className="text-sm sm:text-base text-white/70 mt-2 max-w-md mx-auto">
              Escribinos directamente a nuestro WhatsApp oficial para atención inmediata, envíos y pedidos personalizados.
            </p>
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleDirectWhatsApp}
                className="ios-glass-milky-btn inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-extrabold text-[#082015] shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-700" />
                <span>Escribir por WhatsApp</span>
                <ArrowRight className="w-4 h-4 text-emerald-700" />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        onOpenShare={(title, url, price, description) =>
          handleOpenShare(title, url, price, description)
        }
      />

      {/* Share / QR Modal */}
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
