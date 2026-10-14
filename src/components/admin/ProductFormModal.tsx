"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, Upload, Plus, Trash2, Sparkles, Check, RefreshCw } from "lucide-react";
import { Category, Product } from "@/types";
import { DataService } from "@/lib/data-service";
import { NEW_PRODUCT_DAYS, DEFAULT_WHATSAPP_NUMBER } from "@/lib/constants";
import { isProductNew, getRemainingNewDays } from "@/lib/utils";

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: Product | null;
  categories: Category[];
  onSaved: () => void;
}

export function ProductFormModal({
  isOpen,
  onClose,
  productToEdit,
  categories,
  onSaved,
}: ProductFormModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    compare_at_price: "",
    category: "indumentaria",
    images: ["https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80"],
    in_stock: true,
    whatsapp_number: "",
  });

  const [badgeType, setBadgeType] = useState<"NUEVO" | "DESTACADO" | "NINGUNO">("NUEVO");
  const [renewBadge, setRenewBadge] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setRenewBadge(false);
    if (productToEdit) {
      const rawBadge = (productToEdit.badge || "").trim().toUpperCase();
      let initBadge: "NUEVO" | "DESTACADO" | "NINGUNO" = "NINGUNO";
      if (rawBadge === "DESTACADO" || productToEdit.is_featured) {
        initBadge = "DESTACADO";
      } else if (rawBadge === "NUEVO") {
        initBadge = "NUEVO";
      }
      setBadgeType(initBadge);

      setFormData({
        title: productToEdit.title,
        description: productToEdit.description,
        price: productToEdit.price.toString(),
        compare_at_price: productToEdit.compare_at_price ? productToEdit.compare_at_price.toString() : "",
        category: productToEdit.category,
        images: productToEdit.images && productToEdit.images.length > 0 ? productToEdit.images : [""],
        in_stock: productToEdit.in_stock,
        whatsapp_number: productToEdit.whatsapp_number === "5493624000000" ? "" : (productToEdit.whatsapp_number || ""),
      });
    } else {
      setBadgeType("NUEVO"); // Por defecto siempre Nuevo para productos nuevos
      setFormData({
        title: "",
        description: "",
        price: "",
        compare_at_price: "",
        category: categories.length > 1 ? categories[1].slug : "indumentaria",
        images: ["https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80"],
        in_stock: true,
        whatsapp_number: "",
      });
    }
    setErrorMsg("");
  }, [productToEdit, categories, isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setErrorMsg("");
    try {
      const url = await DataService.uploadImage(file);
      setFormData((prev) => ({
        ...prev,
        images: [url, ...prev.images.filter(Boolean)],
      }));
    } catch (err: any) {
      setErrorMsg(err.message || "Error al subir la imagen");
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddImageUrl = () => {
    if (!imageUrlInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images.filter(Boolean), imageUrlInput.trim()],
    }));
    setImageUrlInput("");
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.price) {
      setErrorMsg("El título y el precio son obligatorios");
      return;
    }

    setIsSaving(true);
    setErrorMsg("");
    try {
      const finalBadge = badgeType === "NUEVO" ? "NUEVO" : badgeType === "DESTACADO" ? "DESTACADO" : null;
      const isFeatured = badgeType === "DESTACADO";

      let createdAt = productToEdit?.created_at;
      if (badgeType === "NUEVO") {
        if (!createdAt || renewBadge || (productToEdit && !isProductNew(productToEdit))) {
          createdAt = new Date().toISOString();
        }
      }

      await DataService.saveProduct({
        id: productToEdit?.id,
        title: formData.title.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        compare_at_price: formData.compare_at_price ? parseFloat(formData.compare_at_price) : null,
        category: formData.category,
        images: formData.images.filter(Boolean),
        in_stock: formData.in_stock,
        is_featured: isFeatured,
        badge: finalBadge,
        whatsapp_number: formData.whatsapp_number.trim() || undefined,
        created_at: createdAt,
      });
      onSaved();
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || "Error al guardar el producto");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative glass-dock w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 z-10 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              {productToEdit ? "Editar Producto" : "Nuevo Producto"}
            </h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full glass-button text-white/60 hover:text-white cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 mb-4 rounded-xl bg-red-500/20 border border-red-500/30 text-red-200 text-xs">
            {errorMsg}
          </div>
        )}

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto pr-1 space-y-4 flex-1">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-white/70 mb-1">
              Nombre / Título del Producto *
            </label>
            <input
              type="text"
              required
              placeholder="Ej: Mochila Táctica Impermeable 40L"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              className="w-full glass-panel px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50 border-white/10"
            />
          </div>

          {/* Pricing Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1">
                Precio de Venta ($ ARS) *
              </label>
              <input
                type="number"
                required
                min="0"
                step="any"
                placeholder="Ej: 45000"
                value={formData.price}
                onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                className="w-full glass-panel px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50 border-white/10 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1">
                Precio Original / Comparación (Opcional tachado)
              </label>
              <input
                type="number"
                min="0"
                step="any"
                placeholder="Ej: 55000"
                value={formData.compare_at_price}
                onChange={(e) => setFormData((prev) => ({ ...prev, compare_at_price: e.target.value }))}
                className="w-full glass-panel px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50 border-white/10 font-mono"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-white/70 mb-1">
              Categoría *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
              className="w-full glass-panel px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50 border-white/10 cursor-pointer"
            >
              {categories
                .filter((c) => c.slug !== "todos")
                .map((c) => (
                  <option key={c.id} value={c.slug} className="bg-neutral-950 text-white">
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Selector de Estado / Badge: Nuevo, Destacado o Sin etiqueta */}
          <div>
            <label className="block text-xs font-semibold text-white/70 mb-1.5">
              Estado / Etiqueta del Producto
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setBadgeType("NUEVO")}
                className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                  badgeType === "NUEVO"
                    ? "bg-emerald-500/30 text-emerald-300 border-emerald-400/60 shadow-[0_0_15px_rgba(16,185,129,0.3)] ring-1 ring-emerald-400/50"
                    : "glass-panel text-white/60 hover:text-white border-white/10 hover:border-white/20"
                }`}
              >
                <span>✨ Nuevo</span>
              </button>
              <button
                type="button"
                onClick={() => setBadgeType("DESTACADO")}
                className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                  badgeType === "DESTACADO"
                    ? "bg-amber-500/30 text-amber-300 border-amber-400/60 shadow-[0_0_15px_rgba(245,158,11,0.3)] ring-1 ring-amber-400/50"
                    : "glass-panel text-white/60 hover:text-white border-white/10 hover:border-white/20"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Destacado</span>
              </button>
              <button
                type="button"
                onClick={() => setBadgeType("NINGUNO")}
                className={`py-2 px-3 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                  badgeType === "NINGUNO"
                    ? "bg-white/20 text-white border-white/40 shadow-sm ring-1 ring-white/30"
                    : "glass-panel text-white/50 hover:text-white border-white/10 hover:border-white/20"
                }`}
              >
                <span>Sin etiqueta</span>
              </button>
            </div>
            <div className="text-[11px] text-white/50 mt-1.5 flex flex-col gap-1">
              {badgeType === "NUEVO" && (
                <>
                  <p>
                    {productToEdit ? (
                      isProductNew(productToEdit) ? (
                        <>
                          <span className="text-emerald-400 font-semibold">Activo:</span> Le quedan {getRemainingNewDays(productToEdit)} días de vigencia (de {NEW_PRODUCT_DAYS} días).
                        </>
                      ) : (
                        <>
                          <span className="text-amber-400 font-semibold">Expirado:</span> El plazo de {NEW_PRODUCT_DAYS} días ya venció. Al guardar se reactivará por 30 días adicionales.
                        </>
                      )
                    ) : (
                      <>Tendrá la etiqueta 'Nuevo' durante los primeros <strong>{NEW_PRODUCT_DAYS} días</strong> desde su publicación.</>
                    )}
                  </p>
                  {productToEdit && isProductNew(productToEdit) && (
                    <button
                      type="button"
                      onClick={() => setRenewBadge(!renewBadge)}
                      className={`text-[10px] text-left underline cursor-pointer flex items-center gap-1 ${renewBadge ? "text-emerald-400 font-bold" : "text-white/40 hover:text-white/70"}`}
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>{renewBadge ? "✓ Se renovará a 30 días al guardar" : "¿Renovar a 30 días completos?"}</span>
                    </button>
                  )}
                </>
              )}
              {badgeType === "DESTACADO" && <p>Aparecerá con el tag 'Destacado' y tendrá prioridad en la tienda.</p>}
              {badgeType === "NINGUNO" && <p>Producto estándar: no mostrará etiqueta en la tarjeta.</p>}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-white/70 mb-1">
              Descripción Detallada
            </label>
            <textarea
              rows={3}
              placeholder="Detalles sobre materiales, medidas, modo de uso o confección..."
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              className="w-full glass-panel px-3.5 py-2 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50 border-white/10"
            />
          </div>

          {/* Images Section */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-white/70">
              Imágenes del Producto
            </label>

            {/* Upload or Add URL */}
            <div className="flex flex-col sm:flex-row gap-2">
              <label className="glass-button px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer flex items-center justify-center gap-2 text-emerald-400 hover:text-white shrink-0">
                <Upload className="w-3.5 h-3.5" />
                <span>{isUploading ? "Subiendo..." : "Subir Archivo"}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>

              <div className="flex gap-2 flex-1">
                <input
                  type="url"
                  placeholder="O pegar URL de imagen externa..."
                  value={imageUrlInput}
                  onChange={(e) => setImageUrlInput(e.target.value)}
                  className="flex-1 glass-panel px-3 py-2 rounded-xl text-xs text-white focus:outline-none border-white/10"
                />
                <button
                  type="button"
                  onClick={handleAddImageUrl}
                  className="glass-button px-3 py-2 rounded-xl text-xs text-white hover:text-emerald-400 shrink-0 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Thumbnail preview list */}
            <div className="flex flex-wrap gap-2 pt-2">
              {formData.images.map((img, idx) => (
                <div key={idx} className="relative w-16 h-16 rounded-xl overflow-hidden glass-panel border border-white/20 group">
                  <Image src={img} alt="Vista previa" fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Stock Toggle */}
          <div>
            <label className="glass-panel p-3 rounded-2xl flex items-center justify-between cursor-pointer border border-white/10">
              <span className="text-xs font-semibold text-white">¿En Stock para entrega inmediata?</span>
              <input
                type="checkbox"
                checked={formData.in_stock}
                onChange={(e) => setFormData((prev) => ({ ...prev, in_stock: e.target.checked }))}
                className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
              />
            </label>
          </div>

          {/* Custom WhatsApp (Optional) */}
          <div>
            <label className="block text-xs font-semibold text-white/70 mb-1">
              WhatsApp específico (Opcional, dejar vacío para usar el del club: {DEFAULT_WHATSAPP_NUMBER})
            </label>
            <input
              type="text"
              placeholder={`Ej: ${DEFAULT_WHATSAPP_NUMBER}`}
              value={formData.whatsapp_number}
              onChange={(e) => setFormData((prev) => ({ ...prev, whatsapp_number: e.target.value }))}
              className="w-full glass-panel px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-white focus:outline-none border-white/10"
            />
          </div>

          {/* Submit */}
          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="glass-button px-5 py-2.5 rounded-xl text-xs font-semibold text-white/70 hover:text-white cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="glass-button-primary px-6 py-2.5 rounded-xl text-xs font-bold shadow-xl flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>{isSaving ? "Guardando..." : "Guardar Producto"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
