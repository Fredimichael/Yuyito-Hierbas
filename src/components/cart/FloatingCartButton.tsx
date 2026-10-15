"use client";

import React from "react";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export function FloatingCartButton() {
  const { totalItems, totalPrice, openCart, isOpen } = useCart();

  if (totalItems === 0 || isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 font-navbar animate-bounce-subtle">
      <button
        onClick={openCart}
        className="group flex items-center gap-3 px-5 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-xs sm:text-sm shadow-[0_0_35px_rgba(16,185,129,0.5)] border border-emerald-300/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        aria-label={`Ver pedido de ${totalItems} productos por ${formatPrice(totalPrice)}`}
      >
        <div className="relative flex items-center justify-center">
          <ShoppingBag className="w-5 h-5 fill-white/20" />
          <span className="absolute -top-2 -right-2.5 w-5 h-5 rounded-full bg-white text-emerald-800 text-[10px] font-black flex items-center justify-center shadow-md">
            {totalItems}
          </span>
        </div>

        <div className="flex flex-col text-left leading-tight">
          <span className="text-[10px] uppercase font-bold text-emerald-100 tracking-wider">
            Ver Pedido
          </span>
          <span className="text-xs sm:text-sm font-black">
            {formatPrice(totalPrice)}
          </span>
        </div>

        <ArrowRight className="w-4 h-4 ml-0.5 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
