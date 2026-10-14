"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, Upload, Sparkles, Check } from "lucide-react";
import { Banner } from "@/types";
import { DataService } from "@/lib/data-service";

interface BannerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  bannerToEdit?: Banner | null;
  onSaved: () => void;
}

export function BannerFormModal({
  isOpen,
  onClose,
  bannerToEdit,
  onSaved,
}: BannerFormModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    image_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
    button_text: "Explorar Colección",
    button_link: "#catalogo",
    badge: "DESTACADO",
    is_active: true,
    order: 1,
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (bannerToEdit) {
      setFormData({
        title: bannerToEdit.title,
        subtitle: bannerToEdit.subtitle || "",
        image_url: bannerToEdit.image_url,
        button_text: bannerToEdit.button_text || "Ver Más",
        button_link: bannerToEdit.button_link || "#catalogo",
        badge: bannerToEdit.badge || "",
        is_active: bannerToEdit.is_active,
        order: bannerToEdit.order,
      });
    } else {
      setFormData({
        title: "",
        subtitle: "",
        image_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
        button_text: "Explorar Colección",
        button_link: "#catalogo",
        badge: "NUEVO",
        is_active: true,
        order: 1,
      });
    }
    setErrorMsg("");
  }, [bannerToEdit, isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setErrorMsg("");
    try {
      const url = await DataService.uploadImage(file);
      setFormData((prev) => ({ ...prev, image_url: url }));
    } catch (err: any) {
      setErrorMsg(err.message || "Error al subir imagen");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.image_url.trim()) {
      setErrorMsg("El título y la imagen son obligatorios");
      return;
    }

    setIsSaving(true);
    setErrorMsg("");
    try {
      await DataService.saveBanner({
        id: bannerToEdit?.id,
        title: formData.title.trim(),
        subtitle: formData.subtitle.trim(),
        image_url: formData.image_url.trim(),
        button_text: formData.button_text.trim(),
        button_link: formData.button_link.trim(),
        badge: formData.badge.trim() || undefined,
        is_active: formData.is_active,
        order: Number(formData.order),
      });
      onSaved();
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || "Error al guardar el banner");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative glass-dock w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 z-10 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              {bannerToEdit ? "Editar Banner" : "Nuevo Banner"}
            </h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full glass-button text-white/60 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 mb-4 rounded-xl bg-red-500/20 border border-red-500/30 text-red-200 text-xs">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="overflow-y-auto pr-1 space-y-4 flex-1">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-white/70 mb-1">
              Título del Banner *
            </label>
            <input
              type="text"
              required
              placeholder="Ej: Gran Liquidación de Temporada"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              className="w-full glass-panel px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50 border-white/10"
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-xs font-semibold text-white/70 mb-1">
              Subtítulo / Bajada descriptiva
            </label>
            <textarea
              rows={2}
              placeholder="Ej: Hasta 30% OFF en prendas seleccionadas hasta agotar stock."
              value={formData.subtitle}
              onChange={(e) => setFormData((prev) => ({ ...prev, subtitle: e.target.value }))}
              className="w-full glass-panel px-3.5 py-2 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50 border-white/10"
            />
          </div>

          {/* Badge & Order */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1">
                Etiqueta / Badge (Opcional)
              </label>
              <input
                type="text"
                placeholder="Ej: NOVEDAD, PROMO, EDICIÓN ESPECIAL"
                value={formData.badge}
                onChange={(e) => setFormData((prev) => ({ ...prev, badge: e.target.value }))}
                className="w-full glass-panel px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-white focus:outline-none border-white/10 uppercase"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1">
                Orden de aparición (Prioridad)
              </label>
              <input
                type="number"
                min="1"
                value={formData.order}
                onChange={(e) => setFormData((prev) => ({ ...prev, order: Number(e.target.value) }))}
                className="w-full glass-panel px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-white focus:outline-none border-white/10 font-mono"
              />
            </div>
          </div>

          {/* Image Upload or URL */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-white/70">
              Imagen de Fondo (Alta Resolución recomendada) *
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                required
                placeholder="URL de imagen..."
                value={formData.image_url}
                onChange={(e) => setFormData((prev) => ({ ...prev, image_url: e.target.value }))}
                className="flex-1 glass-panel px-3.5 py-2.5 rounded-xl text-xs text-white focus:outline-none border-white/10"
              />
              <label className="glass-button px-3.5 py-2 rounded-xl text-xs font-semibold cursor-pointer flex items-center gap-1.5 text-cyan-400 hover:text-white shrink-0">
                <Upload className="w-3.5 h-3.5" />
                <span>{isUploading ? "..." : "Subir"}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>
            </div>

            {formData.image_url && (
              <div className="relative w-full h-32 rounded-xl overflow-hidden glass-panel border border-white/10 mt-2">
                <Image src={formData.image_url} alt="Vista previa banner" fill className="object-cover" />
              </div>
            )}
          </div>

          {/* Button Text & Link */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1">
                Texto del Botón
              </label>
              <input
                type="text"
                placeholder="Ej: Explorar Colección"
                value={formData.button_text}
                onChange={(e) => setFormData((prev) => ({ ...prev, button_text: e.target.value }))}
                className="w-full glass-panel px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-white focus:outline-none border-white/10"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1">
                Enlace de Destino
              </label>
              <input
                type="text"
                placeholder="Ej: #catalogo o https://wa.me/..."
                value={formData.button_link}
                onChange={(e) => setFormData((prev) => ({ ...prev, button_link: e.target.value }))}
                className="w-full glass-panel px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-white focus:outline-none border-white/10"
              />
            </div>
          </div>

          {/* Active switch */}
          <label className="glass-panel p-3 rounded-2xl flex items-center justify-between cursor-pointer">
            <span className="text-xs font-semibold text-white">¿Banner visible / activo?</span>
            <input
              type="checkbox"
              checked={formData.is_active}
              onChange={(e) => setFormData((prev) => ({ ...prev, is_active: e.target.checked }))}
              className="w-4 h-4 accent-emerald-500 rounded"
            />
          </label>

          {/* Submit */}
          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="glass-button px-5 py-2.5 rounded-xl text-xs font-semibold text-white/70 hover:text-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="glass-button-primary px-6 py-2.5 rounded-xl text-xs font-bold shadow-xl flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>{isSaving ? "Guardando..." : "Guardar Banner"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
