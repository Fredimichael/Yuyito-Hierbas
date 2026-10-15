"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, ShieldCheck, Heart, Sparkles } from "lucide-react";
import { CLUB_NAME, CLUB_TAGLINE, DEFAULT_WHATSAPP_NUMBER } from "@/lib/constants";
import { getWhatsAppShareUrl } from "@/lib/utils";

export function Footer() {
  const handleWhatsAppContact = () => {
    const msg = `¡Hola ${CLUB_NAME}! Me gustaría recibir información del catálogo.`;
    window.open(getWhatsAppShareUrl(DEFAULT_WHATSAPP_NUMBER, msg), "_blank");
  };

  return (
    <footer className="relative mt-20 border-t border-white/10 glass-dock">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand Info */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden flex items-center justify-center">
                <Image
                  src="/logo-yuyito.png"
                  alt={CLUB_NAME}
                  width={56}
                  height={56}
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                {CLUB_NAME}
              </span>
            </div>
            <p className="text-sm text-white/60 max-w-sm mt-1 leading-relaxed">
              {CLUB_TAGLINE}. Descubrí todos los productos y blends de Yuyito Hierbas y realizá tus pedidos.
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-white/50">Chaco, Argentina • Envíos a todo el país</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs uppercase tracking-wider text-white font-bold">Navegación</h4>
            <div className="flex flex-col gap-2 text-sm text-white/60">
              <Link href="/#catalogo" className="hover:text-emerald-400 transition-colors">
                Catálogo General
              </Link>
              <Link href="/#destacados" className="hover:text-emerald-400 transition-colors">
                Productos Destacados
              </Link>
              <button
                onClick={handleWhatsAppContact}
                className="text-left hover:text-emerald-400 transition-colors"
              >
                Atención al Cliente
              </button>
              <Link href="/admin" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Panel de Control</span>
              </Link>
            </div>
          </div>

          {/* Col 3: Direct WhatsApp Action */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs uppercase tracking-wider text-white font-bold">Contacto Directo</h4>
            <p className="text-xs text-white/60 leading-relaxed">
              Comunicate directamente con nuestro equipo para consultas de stock, pedidos especiales y envíos.
            </p>
            <button
              onClick={handleWhatsAppContact}
              className="glass-button-primary mt-1 py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Abrir Chat de WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} {CLUB_NAME}. Todos los derechos reservados.</p>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-white/50">
              Catálogo de Productos
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
