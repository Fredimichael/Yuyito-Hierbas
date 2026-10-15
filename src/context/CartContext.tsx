"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, CartItem } from "@/types";
import { CLUB_NAME, DEFAULT_WHATSAPP_NUMBER } from "@/lib/constants";
import { formatPrice, getWhatsAppShareUrl } from "@/lib/utils";

const CART_STORAGE_KEY = "yuyito_cart_items_v2";

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  lastAddedProduct: Product | null;
  sendOrderViaWhatsApp: (customerName?: string, notes?: string) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState<Product | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Cargar carrito desde localStorage al montar
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Error cargando carrito desde localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Guardar en localStorage ante cambios
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn("Error guardando carrito en localStorage", e);
    }
  }, [items, isLoaded]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const addToCart = (product: Product, quantity: number = 1) => {
    if (!product.in_stock) return;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((i) => i.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      return [...prevItems, { product, quantity }];
    });

    setLastAddedProduct(product);
    // Limpiar feedback tras 2.5s
    setTimeout(() => {
      setLastAddedProduct((curr) => (curr?.id === product.id ? null : curr));
    }, 2500);
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const sendOrderViaWhatsApp = (customerName?: string, notes?: string): string => {
    if (items.length === 0) return "";

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderId = `YH-${randomNum}`;

    const dateStr = new Intl.DateTimeFormat("es-AR", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date());

    let message = `🌿 *NUEVO PEDIDO - ${CLUB_NAME.toUpperCase()}* 🌿\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `📋 *N° de Pedido:* #${orderId}\n`;
    message += `📅 *Fecha:* ${dateStr}\n`;
    if (customerName && customerName.trim()) {
      message += `👤 *Cliente:* ${customerName.trim()}\n`;
    }
    message += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `📦 *Detalle del pedido (${totalItems} ${totalItems === 1 ? "unidad" : "unidades"}):*\n`;

    items.forEach((item, index) => {
      const itemSubtotal = item.product.price * item.quantity;
      message += `${index + 1}. *${item.product.title}*\n`;
      message += `   • Cantidad: ${item.quantity} un. x ${formatPrice(item.product.price)}\n`;
      message += `   • Subtotal: ${formatPrice(itemSubtotal)}\n`;
    });

    message += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `💰 *TOTAL A PAGAR:* ${formatPrice(totalPrice)}\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;

    if (notes && notes.trim()) {
      message += `\n📝 *Aclaraciones / Notas:*\n${notes.trim()}\n`;
    }

    message += `\n¡Hola! Me gustaría confirmar la disponibilidad de este pedido y coordinar los medios de pago y el envío. ¡Muchas gracias!`;

    const url = getWhatsAppShareUrl(DEFAULT_WHATSAPP_NUMBER, message);
    window.open(url, "_blank");

    return orderId;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        lastAddedProduct,
        sendOrderViaWhatsApp,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
}
