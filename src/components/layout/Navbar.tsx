"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  Share2,
  ShieldCheck,
  Sparkles,
  MessageCircle,
  Sprout,
  ArrowRight
} from "lucide-react";
import { CLUB_NAME, DEFAULT_WHATSAPP_NUMBER } from "@/lib/constants";
import { getWhatsAppShareUrl } from "@/lib/utils";

interface NavbarProps {
  onOpenShareModal?: () => void;
}

export function Navbar({ onOpenShareModal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWhatsAppContact = () => {
    const msg = `¡Hola ${CLUB_NAME}! Vengo desde su catálogo web y me gustaría recibir información.`;
    window.open(getWhatsAppShareUrl(DEFAULT_WHATSAPP_NUMBER, msg), "_blank");
  };

  return (
    <>
      {/* Backdrop overlay when mobile menu is open with smooth fade */}
      <div
        className={`fixed inset-0 z-30 bg-black/40 backdrop-blur-sm sm:hidden transition-opacity duration-300 ${isMobileMenuOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 px-4 sm:px-8 font-navbar ${isScrolled ? "py-2 sm:py-3" : "py-4 sm:py-6"
          }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col">
          {/* Main Floating Pill Navbar (Siempre píldora perfecta rounded-full como en PC) */}
          <div
            className={`glass-dock rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between transition-all duration-300 ${isScrolled ? "shadow-2xl" : ""
              }`}
          >
            {/* Brand Logo */}
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2.5 sm:gap-3 group"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden bg-white/10 border border-emerald-400/40 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)] group-hover:scale-105 transition-all p-1">
                <Image
                  src="/logoyuyito.png"
                  alt={CLUB_NAME}
                  width={36}
                  height={36}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold tracking-tight text-white text-sm sm:text-lg flex items-center gap-1.5">
                  {CLUB_NAME}
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </span>
                <span className="text-[10px] sm:text-xs text-white/50 tracking-wider uppercase font-medium">
                  Catálogo Oficial
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              <Link
                href="/#catalogo"
                className="px-4 py-2 uppercase rounded-full text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all"
              >
                Catálogo
              </Link>
              <Link
                href="/#destacados"
                className="px-4 py-2 uppercase rounded-full text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all flex items-center gap-1.5"
              >
                Destacados
              </Link>
              <button
                onClick={handleWhatsAppContact}
                className="px-4 py-2 uppercase rounded-full text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                Contacto
              </button>
            </nav>

            {/* Desktop Quick Actions */}
            <div className="hidden sm:flex items-center gap-2.5">
              {onOpenShareModal && (
                <button
                  onClick={onOpenShareModal}
                  className="glass-button px-3.5 py-2 rounded-full text-xs font-semibold text-white/90 flex items-center gap-2 hover:text-white cursor-pointer"
                  title="Compartir Catálogo"
                >
                  <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Compartir</span>
                </button>
              )}

              <Link
                href="/admin"
                className="glass-button px-3.5 py-2 rounded-full text-xs font-semibold text-white/90 flex items-center gap-1.5 hover:text-white hover:border-emerald-400/50"
                title="Panel de Administración"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Admin</span>
              </Link>
            </div>

            {/* Mobile Actions: Share + Hamburger (con estilo píldora rounded-full como en PC) */}
            <div className="flex sm:hidden items-center gap-1.5">
              {onOpenShareModal && (
                <button
                  onClick={onOpenShareModal}
                  className="p-2 rounded-full glass-button text-cyan-300 hover:text-white transition-all active:scale-95 cursor-pointer"
                  aria-label="Compartir catálogo"
                  title="Compartir Catálogo"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-full glass-button transition-all duration-300 active:scale-95 cursor-pointer ${isMobileMenuOpen
                  ? "text-emerald-400 border-emerald-400/50 bg-white/10 rotate-90"
                  : "text-white rotate-0"
                  }`}
                aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Tarjeta Flotante Desplegable de Cristal (Separada justo debajo, estilo Popover / Menú iOS) */}
          <div
            className={`sm:hidden mt-2.5 glass-dock rounded-[2rem] p-3 shadow-2xl border border-white/25 transition-all duration-300 origin-top flex flex-col gap-1.5 ${isMobileMenuOpen
              ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
              : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
              }`}
          >
            <Link
              href="/#catalogo"
              onClick={() => setIsMobileMenuOpen(false)}
              className="glass-panel p-3 rounded-2xl flex items-center justify-between text-white font-medium hover:bg-white/10 active:scale-[0.98] transition-all"
            >
              <div className="flex items-center gap-2.5">
                <Sprout className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-semibold">Catálogo</span>
              </div>
              <ArrowRight className="w-4 h-4 text-white/40" />
            </Link>

            <Link
              href="/#destacados"
              onClick={() => setIsMobileMenuOpen(false)}
              className="glass-panel p-3 rounded-2xl flex items-center justify-between text-white font-medium hover:bg-white/10 active:scale-[0.98] transition-all"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-semibold">Destacados</span>
              </div>
              <ArrowRight className="w-4 h-4 text-white/40" />
            </Link>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleWhatsAppContact();
              }}
              className="glass-panel p-3 rounded-2xl flex items-center justify-between text-white font-medium hover:bg-white/10 active:scale-[0.98] transition-all text-left cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-semibold">Contacto</span>
              </div>
              <ArrowRight className="w-4 h-4 text-white/40" />
            </button>

            <div className="pt-1.5 mt-0.5 border-t border-white/10">
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="glass-button-primary w-full py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs font-bold shadow-lg active:scale-95 transition-all"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Panel de Administración</span>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
