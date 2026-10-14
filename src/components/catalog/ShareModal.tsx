"use client";

import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { X, Copy, Check, MessageCircle, Share2 } from "lucide-react";
import { CLUB_NAME } from "@/lib/constants";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
  description?: string;
  price?: number;
}

export function ShareModal({
  isOpen,
  onClose,
  title,
  url,
  description,
  price,
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description || `Mirá este producto en ${CLUB_NAME}`,
          url,
        });
      } catch (err) {
        console.log("Share canceled", err);
      }
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const shareText = encodeURIComponent(
    `Mirá "${title}" en el catálogo oficial de ${CLUB_NAME}: ${url}`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xl animate-in fade-in duration-200">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative glass-dock w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 z-10 overflow-hidden">
        {/* Decorative ambient orb */}
        <div className="absolute -top-20 -right-20 w-44 h-44 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-44 h-44 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
              <Share2 className="w-4 h-4 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">Compartir</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full glass-button text-white/60 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* QR Code Container */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="p-4 rounded-2xl bg-white/95 shadow-xl border border-white/30 transition-transform hover:scale-105 duration-300">
            <QRCodeSVG
              value={url}
              size={180}
              level="M"
              includeMargin={false}
              fgColor="#05080e"
              bgColor="#ffffff"
            />
          </div>
          <p className="text-xs text-white/50 mt-3 text-center">
            Escaneá el código QR con la cámara de tu celular para abrir al instante
          </p>
        </div>

        {/* Item Title & Summary */}
        <div className="glass-panel p-3.5 rounded-2xl mb-6">
          <h4 className="text-sm font-semibold text-white truncate">{title}</h4>
          {price !== undefined && (
            <p className="text-xs font-mono text-emerald-400 font-bold mt-0.5">
              ${price.toLocaleString("es-AR")}
            </p>
          )}
          <p className="text-[11px] text-white/40 truncate mt-1">{url}</p>
        </div>

        {/* Copy Link Input Bar */}
        <div className="flex items-center gap-2 mb-6">
          <input
            type="text"
            readOnly
            value={url}
            className="w-full glass-panel px-3.5 py-2.5 rounded-xl text-xs text-white/80 font-mono truncate focus:outline-none border-white/10"
          />
          <button
            onClick={handleCopy}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 ${
              copied
                ? "bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                : "glass-button text-white hover:text-white"
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copiado</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar</span>
              </>
            )}
          </button>
        </div>

        {/* Direct Social Button: WhatsApp */}
        <div>
          <a
            href={`https://wa.me/?text=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-button w-full p-2.5 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold text-emerald-300 hover:text-emerald-200 border-emerald-500/20 hover:border-emerald-500/40 transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Compartir por WhatsApp</span>
          </a>
        </div>

        {/* Native mobile share if supported */}
        {typeof navigator !== "undefined" && typeof navigator.share === "function" && (
          <button
            onClick={handleNativeShare}
            className="glass-button-primary w-full mt-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Más opciones del dispositivo</span>
          </button>
        )}
      </div>
    </div>
  );
}
