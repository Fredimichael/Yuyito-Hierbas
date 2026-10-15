"use client";

import React, { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X, Check, ArrowUpDown } from "lucide-react";
import { Category, FilterState, Product, SortOption } from "@/types";
import { CLUB_NAME } from "@/lib/constants";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  categories: Category[];
  onSelectProduct: (product: Product) => void;
  onOpenShare: (title: string, url: string, price: number, description?: string) => void;
}

export function ProductGrid({
  products,
  categories,
  onSelectProduct,
  onOpenShare,
}: ProductGridProps) {
  const [filterState, setFilterState] = useState<FilterState>({
    category: "todos",
    search: "",
    sortBy: "featured",
    onlyInStock: false,
  });

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (filterState.category !== "todos" && p.category.toLowerCase() !== filterState.category.toLowerCase()) {
          return false;
        }
        // In stock filter
        if (filterState.onlyInStock && !p.in_stock) {
          return false;
        }
        // Search filter
        if (filterState.search.trim()) {
          const q = filterState.search.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          return matchTitle || matchDesc || matchCat;
        }
        return true;
      })
      .sort((a, b) => {
        if (filterState.sortBy === "featured") {
          return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
        }
        if (filterState.sortBy === "newest") {
          return new Date(b.created_at || "").getTime() - new Date(a.created_at || "").getTime();
        }
        if (filterState.sortBy === "price-asc") {
          return a.price - b.price;
        }
        if (filterState.sortBy === "price-desc") {
          return b.price - a.price;
        }
        return 0;
      });
  }, [products, filterState]);

  const clearFilters = () => {
    setFilterState({
      category: "todos",
      search: "",
      sortBy: "featured",
      onlyInStock: false,
    });
  };

  return (
    <div id="catalogo" className="w-full py-8 sm:py-12 scroll-mt-24">
      {/* Control Bar: Search + Category Pills + Filters */}
      <div className="flex flex-col gap-5 mb-8">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Section title & count */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>Catálogo de Productos</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-mono border border-emerald-500/30">
                {filteredProducts.length}
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-white/50 mt-1">
              Explorá todos los productos, blends y accesorios de {CLUB_NAME}
            </p>
          </div>

          {/* Search Bar (iOS Glass Searchfield) */}
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Buscar por nombre, categoría..."
              value={filterState.search}
              onChange={(e) => setFilterState((prev) => ({ ...prev, search: e.target.value }))}
              className="w-full glass-panel pl-10 pr-9 py-2.5 rounded-2xl text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all"
            />
            {filterState.search && (
              <button
                onClick={() => setFilterState((prev) => ({ ...prev, search: "" }))}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/50 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls Row: Category Pills + Sort + Stock Toggle */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pt-2">
          {/* Categories Pill Navigation */}
          <div className="flex items-center gap-2 overflow-x-auto py-1 w-full lg:w-auto scrollbar-none no-scrollbar">
            {categories.map((cat) => {
              const isActive = filterState.category.toLowerCase() === cat.slug.toLowerCase();
              return (
                <button
                  key={cat.id}
                  onClick={() => setFilterState((prev) => ({ ...prev, category: cat.slug }))}
                  className={`px-4.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${isActive
                    ? "ios-glass-category-active"
                    : "ios-glass-category-inactive"
                    }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Secondary Controls: In Stock Toggle & Sort */}
          <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end shrink-0">
            {/* iOS Style In Stock Toggle */}
            <label className="flex items-center gap-2.5 cursor-pointer glass-pill px-3 py-1.5 rounded-full select-none">
              <span className="text-xs text-white/70 font-medium">Solo en stock</span>
              <div
                onClick={() => setFilterState((prev) => ({ ...prev, onlyInStock: !prev.onlyInStock }))}
                className={`w-9 h-5 flex items-center rounded-full p-0.5 duration-300 cursor-pointer ${filterState.onlyInStock ? "bg-emerald-500" : "bg-white/20"
                  }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${filterState.onlyInStock ? "translate-x-4" : "translate-x-0"
                    }`}
                />
              </div>
            </label>

            {/* Sort Select */}
            <div className="relative">
              <select
                value={filterState.sortBy}
                onChange={(e) => setFilterState((prev) => ({ ...prev, sortBy: e.target.value as SortOption }))}
                className="glass-panel text-xs text-white/80 font-medium px-3 py-2 pr-7 rounded-xl appearance-none focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-neutral-900 text-white">
                  Destacados
                </option>
                <option value="newest" className="bg-neutral-900 text-white">
                  Más Nuevos
                </option>
                <option value="price-asc" className="bg-neutral-900 text-white">
                  Menor Precio
                </option>
                <option value="price-desc" className="bg-neutral-900 text-white">
                  Mayor Precio
                </option>
              </select>
              <ArrowUpDown className="w-3 h-3 text-white/40 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div id="catalogo-productos" className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 scroll-mt-24">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onShare={onOpenShare}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="glass-panel rounded-3xl p-12 text-center flex flex-col items-center justify-center max-w-md mx-auto my-12">
          <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 mb-4">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">No se encontraron productos</h3>
          <p className="text-xs text-white/60 mb-6">
            No hay ningún artículo que coincida con tus criterios de búsqueda o categoría.
          </p>
          <button
            onClick={clearFilters}
            className="glass-button-primary px-5 py-2.5 rounded-full text-xs font-semibold"
          >
            Restablecer Filtros
          </button>
        </div>
      )}
    </div>
  );
}
