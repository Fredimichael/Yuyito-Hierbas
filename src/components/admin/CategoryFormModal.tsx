"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Sparkles,
  Shirt,
  Compass,
  Gem,
  Utensils,
  MapPin,
  Tag,
  Scissors,
  Flame,
  Shield,
  Package,
  ShoppingBag,
  Coffee,
  TreePine,
  Tent,
} from "lucide-react";
import { Category } from "@/types";
import { DataService } from "@/lib/data-service";

interface CategoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryToEdit?: Category | null;
  existingCategories: Category[];
  onSaved: () => void;
}

const AVAILABLE_ICONS = [
  { name: "Tag", label: "Etiqueta", Icon: Tag },
  { name: "Sparkles", label: "Destello", Icon: Sparkles },
  { name: "Shirt", label: "Ropa", Icon: Shirt },
  { name: "Compass", label: "Aventura", Icon: Compass },
  { name: "Gem", label: "Artesanal", Icon: Gem },
  { name: "Utensils", label: "Gastronomía", Icon: Utensils },
  { name: "Coffee", label: "Bebidas", Icon: Coffee },
  { name: "ShoppingBag", label: "Bolsa", Icon: ShoppingBag },
  { name: "Package", label: "Paquete", Icon: Package },
  { name: "Scissors", label: "Corte/Cuero", Icon: Scissors },
  { name: "Flame", label: "Fuego/Asado", Icon: Flame },
  { name: "Shield", label: "Táctico", Icon: Shield },
  { name: "TreePine", label: "Monte", Icon: TreePine },
  { name: "Tent", label: "Camping", Icon: Tent },
  { name: "MapPin", label: "Lugar", Icon: MapPin },
];

export function CategoryFormModal({
  isOpen,
  onClose,
  categoryToEdit,
  existingCategories,
  onSaved,
}: CategoryFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    icon: "Tag",
  });

  const [isAutoSlug, setIsAutoSlug] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  useEffect(() => {
    if (categoryToEdit) {
      setFormData({
        name: categoryToEdit.name,
        slug: categoryToEdit.slug,
        icon: categoryToEdit.icon || "Tag",
      });
      setIsAutoSlug(false);
    } else {
      setFormData({
        name: "",
        slug: "",
        icon: "Tag",
      });
      setIsAutoSlug(true);
    }
    setErrorMsg("");
  }, [categoryToEdit, isOpen]);

  if (!isOpen) return null;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    if (isAutoSlug) {
      setFormData({
        name: newName,
        slug: slugify(newName),
        icon: formData.icon,
      });
    } else {
      setFormData((prev) => ({ ...prev, name: newName }));
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAutoSlug(false);
    setFormData((prev) => ({ ...prev, slug: slugify(e.target.value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanName = formData.name.trim();
    const cleanSlug = formData.slug.trim() || slugify(cleanName);

    if (!cleanName) {
      setErrorMsg("El nombre de la categoría es obligatorio");
      return;
    }

    if (!cleanSlug) {
      setErrorMsg("El identificador (slug) es obligatorio");
      return;
    }

    // Validación de slug protegido o duplicado
    if (
      cleanSlug === "todos" &&
      (!categoryToEdit || categoryToEdit.slug !== "todos")
    ) {
      setErrorMsg("'todos' es un slug reservado para la vista general");
      return;
    }

    const isDuplicate = existingCategories.some(
      (c) => c.slug === cleanSlug && c.id !== categoryToEdit?.id
    );

    if (isDuplicate) {
      setErrorMsg(`Ya existe una categoría con el identificador "${cleanSlug}"`);
      return;
    }

    setIsSaving(true);
    setErrorMsg("");

    try {
      await DataService.saveCategory({
        id: categoryToEdit?.id,
        name: cleanName,
        slug: cleanSlug,
        icon: formData.icon,
      });
      onSaved();
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || "Error al guardar la categoría");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg glass-panel-modal rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Tag className="w-5 h-5 text-amber-400" />
              <span>{categoryToEdit ? "Editar Categoría" : "Nueva Categoría"}</span>
            </h3>
            <p className="text-xs text-white/60 mt-0.5">
              Organiza los productos de tu catálogo para tus clientes
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full glass-button text-white/70 hover:text-white"
            title="Cerrar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {errorMsg && (
          <div className="mt-4 p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs">
            {errorMsg}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Nombre */}
          <div>
            <label className="block text-xs font-semibold text-white/70 mb-1">
              Nombre de la Categoría *
            </label>
            <input
              type="text"
              required
              placeholder="Ej: Calzados & Botas, Cuchillería..."
              value={formData.name}
              onChange={handleNameChange}
              className="w-full glass-panel px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-amber-400/50 border-white/10"
            />
          </div>

          {/* Slug */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-white/70">
                Identificador URL (Slug) *
              </label>
              <button
                type="button"
                onClick={() => {
                  setIsAutoSlug(true);
                  setFormData((prev) => ({ ...prev, slug: slugify(prev.name) }));
                }}
                className="text-[10px] text-amber-300 hover:underline"
              >
                Auto-generar desde nombre
              </button>
            </div>
            <input
              type="text"
              required
              placeholder="ej: calzados-y-botas"
              value={formData.slug}
              onChange={handleSlugChange}
              disabled={categoryToEdit?.slug === "todos"}
              className="w-full glass-panel px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-amber-400/50 border-white/10 font-mono disabled:opacity-50"
            />
            <p className="text-[10px] text-white/40 mt-1">
              Se utiliza internamente para filtrar los productos y en los selectores.
            </p>
          </div>

          {/* Selector de Ícono */}
          <div>
            <label className="block text-xs font-semibold text-white/70 mb-2">
              Ícono Representativo
            </label>
            <div className="grid grid-cols-5 gap-2 max-h-40 overflow-y-auto p-1 scrollbar-none">
              {AVAILABLE_ICONS.map(({ name, label, Icon }) => {
                const isSelected = formData.icon === name;
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, icon: name }))}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all border ${
                      isSelected
                        ? "bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.3)]"
                        : "glass-button text-white/60 hover:text-white border-transparent"
                    }`}
                    title={label}
                  >
                    <Icon className="w-4 h-4 mb-1" />
                    <span className="text-[9px] line-clamp-1">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-4 py-2.5 rounded-xl glass-button text-xs sm:text-sm text-white/70 hover:text-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Guardando...</span>
                </>
              ) : (
                <span>{categoryToEdit ? "Actualizar" : "Crear Categoría"}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
