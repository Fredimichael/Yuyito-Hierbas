"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  ArrowRight,
  Sparkles,
  Sprout,
  CheckCircle2,
  Clock
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    sendOrderViaWhatsApp,
  } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [notes, setNotes] = useState("");
  const [orderSentId, setOrderSentId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCheckout = () => {
    const id = sendOrderViaWhatsApp(customerName, notes);
    if (id) {
      setOrderSentId(id);
    }
  };

  const handleResetAndClose = () => {
    setOrderSentId(null);
    closeCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-navbar">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
        onClick={handleResetAndClose}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
        <div className="w-screen max-w-md bg-[#0a1219]/95 backdrop-blur-2xl border-l border-white/15 shadow-2xl flex flex-col justify-between text-white animate-slideInRight">
          
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-extrabold text-lg sm:text-xl text-white tracking-tight flex items-center gap-2">
                  <span>Tu Pedido</span>
                  {totalItems > 0 && (
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-bold">
                      {totalItems} {totalItems === 1 ? "ítem" : "ítems"}
                    </span>
                  )}
                </h2>
                <span className="text-[11px] text-white/50">
                  Armá tu lista y enviala directamente a WhatsApp
                </span>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="p-2 rounded-full glass-button text-white/70 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              aria-label="Cerrar carrito"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal / State: Order Sent Confirmation */}
          {orderSentId ? (
            <div className="flex-1 p-6 sm:p-8 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.4)] animate-bounce">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  ¡Pedido generado con éxito!
                </span>
                <h3 className="text-2xl font-black text-white">
                  Pedido #{orderSentId}
                </h3>
                <p className="text-sm text-white/70 max-w-xs mx-auto">
                  Se ha preparado el mensaje en WhatsApp con el detalle de tu compra para confirmar disponibilidad y envío.
                </p>
              </div>

              <div className="pt-4 flex flex-col gap-2.5 w-full max-w-xs">
                <button
                  onClick={handleCheckout}
                  className="glass-button-primary w-full py-3.5 rounded-xl flex items-center justify-center gap-2 font-bold text-sm shadow-xl cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Reabrir WhatsApp</span>
                </button>
                <button
                  onClick={() => {
                    clearCart();
                    handleResetAndClose();
                  }}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white/60 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                >
                  Limpiar pedido y cerrar
                </button>
              </div>
            </div>
          ) : items.length === 0 ? (
            /* Empty State */
            <div className="flex-1 p-6 sm:p-8 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-white/30">
                <Sprout className="w-10 h-10 text-emerald-400/40" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">
                  Tu carrito está vacío
                </h3>
                <p className="text-xs sm:text-sm text-white/50 max-w-xs">
                  Explorá el catálogo y agregá tus blends, mates o accesorios favoritos para armar tu pedido.
                </p>
              </div>
              <button
                onClick={() => {
                  closeCart();
                  const el = document.getElementById("catalogo");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-2 glass-button-primary px-6 py-3 rounded-full text-xs font-bold shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <span>Explorar Catálogo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* Item List */
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5 divide-y divide-white/5">
              {items.map((item) => {
                const itemTotal = item.product.price * item.quantity;
                const imageSrc =
                  item.product.images && item.product.images.length > 0
                    ? item.product.images[0]
                    : "/placeholder/Mix_Calma_Profunda.jpg";

                return (
                  <div
                    key={item.product.id}
                    className="pt-3.5 first:pt-0 flex items-center gap-3.5 group"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden bg-black/30 border border-white/15 shrink-0">
                      <Image
                        src={imageSrc}
                        alt={item.product.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-white truncate leading-snug">
                        {item.product.title}
                      </h4>
                      <span className="text-[11px] text-white/50 font-medium block">
                        {formatPrice(item.product.price)} c/u
                      </span>

                      {/* Controls: Stepper + Subtotal */}
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 bg-white/10 rounded-full p-0.5 border border-white/10">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="w-6 h-6 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
                            aria-label="Restar uno"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold px-1.5 min-w-[1.2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="w-6 h-6 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
                            aria-label="Sumar uno"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs sm:text-sm font-black text-emerald-400">
                          {formatPrice(itemTotal)}
                        </span>
                      </div>
                    </div>

                    {/* Delete */}
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-white/30 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all cursor-pointer shrink-0"
                      title="Eliminar del pedido"
                      aria-label="Eliminar producto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}

              {/* Customer Inputs (Optional) */}
              <div className="pt-4 space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/60 mb-1">
                    Tu Nombre (Opcional)
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ej: Laura Martínez"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder-white/30 focus:outline-none focus:border-emerald-400/60 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/60 mb-1">
                    Aclaraciones o Notas (Opcional)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ej: Para regalo, consultar por envío a Resistencia..."
                    className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder-white/30 focus:outline-none focus:border-emerald-400/60 transition-colors resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Footer / Summary / Checkout Button */}
          {!orderSentId && items.length > 0 && (
            <div className="p-5 sm:p-6 border-t border-white/10 bg-[#060c11]/80 backdrop-blur-md space-y-3.5">
              {/* Pricing breakdown */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span>Productos ({totalItems})</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span>Envío</span>
                  <span className="text-emerald-400 font-medium">A coordinar por WhatsApp</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <span className="text-sm font-bold text-white">Total Estimado</span>
                  <span className="text-xl sm:text-2xl font-black text-emerald-400 tracking-tight">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>

              {/* Primary Action Button: Finalizar Pedido por WhatsApp */}
              <button
                onClick={handleCheckout}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-[0_0_30px_rgba(16,185,129,0.4)] border border-emerald-400/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white/20" />
                <span>Finalizar Pedido por WhatsApp</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={clearCart}
                  className="text-[11px] text-white/40 hover:text-red-400 transition-colors cursor-pointer"
                >
                  Vaciar carrito
                </button>
                <button
                  onClick={closeCart}
                  className="text-[11px] text-white/60 hover:text-white transition-colors cursor-pointer"
                >
                  Seguir mirando productos
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
