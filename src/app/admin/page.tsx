"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  Sparkles, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle,
  Copy,
  Check,
  Package,
  Layers,
  Tags,
  Tag,
  LogOut,
  RefreshCw,
  Eye,
  EyeOff
} from "lucide-react";
import { Banner, Category, Product } from "@/types";
import { DataService } from "@/lib/data-service";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { CLUB_NAME } from "@/lib/constants";
import { formatPrice, getCatalogShareUrl, isProductNew, getRemainingNewDays } from "@/lib/utils";
import { ProductFormModal } from "@/components/admin/ProductFormModal";
import { BannerFormModal } from "@/components/admin/BannerFormModal";
import { CategoryFormModal } from "@/components/admin/CategoryFormModal";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Data states
  const [products, setProducts] = useState<Product[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeTab, setActiveTab] = useState<"products" | "banners" | "categories">("products");
  const [searchFilter, setSearchFilter] = useState("");

  // Modals
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [bannerToEdit, setBannerToEdit] = useState<Banner | null>(null);

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);

  // Copied alert
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Check auth session
  useEffect(() => {
    // Si ya está guardada una sesión local de admin
    const localSession = sessionStorage.getItem("club_de_monte_admin_auth");
    if (localSession === "true") {
      setIsAuthenticated(true);
    }

    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          setIsAuthenticated(true);
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session) {
          setIsAuthenticated(true);
        }
      });
      return () => subscription.unsubscribe();
    }
  }, []);

  const loadData = async () => {
    try {
      const [prods, bans, cats] = await Promise.all([
        DataService.getProducts(),
        DataService.getBanners(),
        DataService.getCategories(),
      ]);
      setProducts(prods);
      setBanners(bans);
      setCategories(cats);
    } catch (err) {
      console.error("Error loading admin data", err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.auth.signInWithPassword({
          email: authEmail,
          password: authPassword,
        });

        if (error) {
          throw new Error(error.message);
        }
        setIsAuthenticated(true);
      } else {
        // En modo local sin backend configurado aún
        if (authPassword === "admin" || authPassword.length >= 4) {
          setIsAuthenticated(true);
          sessionStorage.setItem("club_de_monte_admin_auth", "true");
        } else {
          setAuthError("Ingresa una contraseña de al menos 4 caracteres.");
        }
      }
    } catch (err: any) {
      setAuthError(err.message || "Error al iniciar sesión");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleDemoAccess = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem("club_de_monte_admin_auth", "true");
  };

  const handleLogout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    sessionStorage.removeItem("club_de_monte_admin_auth");
    setIsAuthenticated(false);
  };

  const handleDeleteProduct = async (id: string, title: string) => {
    if (confirm(`¿Estás seguro de eliminar el producto "${title}"?`)) {
      try {
        await DataService.deleteProduct(id);
        await loadData();
      } catch (err: any) {
        alert(err.message || "Error al eliminar");
      }
    }
  };

  const handleDeleteBanner = async (id: string, title: string) => {
    if (confirm(`¿Estás seguro de eliminar el banner "${title}"?`)) {
      try {
        await DataService.deleteBanner(id);
        await loadData();
      } catch (err: any) {
        alert(err.message || "Error al eliminar");
      }
    }
  };

  const handleDeleteCategory = async (id: string, name: string, slug: string) => {
    if (slug === "todos") {
      alert("No se puede eliminar la categoría principal 'Todos' del sistema.");
      return;
    }

    const prodsInCat = products.filter(
      (p) => p.category.toLowerCase() === slug.toLowerCase()
    ).length;

    let msg = `¿Estás seguro de eliminar la categoría "${name}"?`;
    if (prodsInCat > 0) {
      msg += `\n\nATENCIÓN: Hay ${prodsInCat} producto(s) asignados a esta categoría.`;
    }

    if (confirm(msg)) {
      try {
        await DataService.deleteCategory(id);
        await loadData();
      } catch (err: any) {
        alert(err.message || "Error al eliminar categoría");
      }
    }
  };

  const handleToggleStock = async (product: Product) => {
    try {
      await DataService.saveProduct({
        ...product,
        in_stock: !product.in_stock,
      });
      await loadData();
    } catch (err: any) {
      alert(err.message || "Error actualizando stock");
    }
  };

  const handleToggleFeatured = async (product: Product) => {
    try {
      const willBeFeatured = !product.is_featured;
      await DataService.saveProduct({
        ...product,
        is_featured: willBeFeatured,
        badge: willBeFeatured ? "DESTACADO" : null,
      });
      await loadData();
    } catch (err: any) {
      alert(err.message || "Error actualizando destacado");
    }
  };

  const handleCopyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // If NOT authenticated, render iOS glass login card
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#05080e] flex items-center justify-center p-4 relative overflow-hidden text-white">
        <div className="bg-ambient-orb-1 top-10 left-10" />
        <div className="bg-ambient-orb-2 bottom-10 right-10" />

        <div className="relative glass-dock w-full max-w-md rounded-3xl p-8 border border-white/20 shadow-2xl z-10">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-teal-500/30 border border-emerald-400/40 flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.3)] mb-3">
              <ShieldCheck className="w-7 h-7 text-emerald-400" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white">{CLUB_NAME}</h1>
            <p className="text-xs text-white/50 mt-1">Panel de Control & Administración</p>
          </div>

          {authError && (
            <div className="p-3 mb-4 rounded-xl bg-red-500/20 border border-red-500/30 text-red-200 text-xs">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1">
                Correo Electrónico
              </label>
              <input
                type="email"
                placeholder="admin@tienda.com"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                className="w-full glass-panel px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50 border-white/10"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                className="w-full glass-panel px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50 border-white/10"
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="glass-button-primary w-full py-3 rounded-xl text-xs sm:text-sm font-bold shadow-xl flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{authLoading ? "Verificando..." : "Ingresar al Panel"}</span>
            </button>
          </form>

          {!isSupabaseConfigured && (
            <div className="mt-4 pt-4 border-t border-white/10 text-center">
              <button
                type="button"
                onClick={handleDemoAccess}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-4"
              >
                Ingresar directamente
              </button>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-xs text-white/40 hover:text-white/80 inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver a la tienda</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const filteredProducts = products.filter((p) => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    return p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen bg-[#05080e] text-white flex flex-col relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="bg-ambient-orb-1 top-0 left-10" />
      <div className="bg-ambient-orb-2 top-80 right-10" />

      {/* Admin Top Navigation */}
      <header className="sticky top-0 z-40 border-b border-white/10 glass-dock px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="p-2 rounded-xl glass-button text-white/80 hover:text-white" title="Ver Tienda">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-base sm:text-lg">{CLUB_NAME}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                ADMIN
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={loadData}
              className="p-2 rounded-xl glass-button text-white/70 hover:text-white"
              title="Refrescar Datos"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={handleLogout}
              className="glass-button px-3 py-1.5 rounded-xl text-xs font-semibold text-red-300 hover:text-red-200 border-red-500/30 flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-8 py-8 w-full z-10">
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-panel p-4 rounded-2xl">
            <span className="text-xs text-white/50 font-medium">Total Productos</span>
            <p className="text-2xl font-extrabold text-white mt-1 font-mono">{products.length}</p>
          </div>
          <div className="glass-panel p-4 rounded-2xl">
            <span className="text-xs text-white/50 font-medium">En Stock</span>
            <p className="text-2xl font-extrabold text-emerald-400 mt-1 font-mono">
              {products.filter((p) => p.in_stock).length}
            </p>
          </div>
          <div className="glass-panel p-4 rounded-2xl">
            <span className="text-xs text-white/50 font-medium">Banners Activos</span>
            <p className="text-2xl font-extrabold text-cyan-400 mt-1 font-mono">
              {banners.filter((b) => b.is_active).length}
            </p>
          </div>
          <div
            onClick={() => setActiveTab("categories")}
            className="glass-panel p-4 rounded-2xl cursor-pointer hover:border-amber-400/40 transition-colors"
            title="Ir a gestionar categorías"
          >
            <span className="text-xs text-white/50 font-medium flex items-center justify-between">
              <span>Categorías</span>
              <span className="text-[10px] text-amber-300">Gestionar →</span>
            </span>
            <p className="text-2xl font-extrabold text-amber-300 mt-1 font-mono">{categories.length}</p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            <button
              onClick={() => setActiveTab("products")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === "products"
                  ? "bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                  : "glass-button text-white/70 hover:text-white"
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Productos ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("banners")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === "banners"
                  ? "bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                  : "glass-button text-white/70 hover:text-white"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Banners ({banners.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("categories")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === "categories"
                  ? "bg-amber-500 text-black font-bold shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                  : "glass-button text-white/70 hover:text-white"
              }`}
            >
              <Tags className="w-4 h-4" />
              <span>Categorías ({categories.length})</span>
            </button>
          </div>

          {!isSupabaseConfigured && (
            <button
              onClick={async () => {
                if (confirm("¿Restablecer el catálogo a los productos de ejemplo iniciales?")) {
                  await DataService.resetDemoData();
                  await loadData();
                  alert("Catálogo restablecido.");
                }
              }}
              className="text-[11px] text-white/30 hover:text-amber-300 transition-colors"
              title="Restablecer productos de ejemplo"
            >
              Restablecer productos base
            </button>
          )}
        </div>

        {/* TAB 1: PRODUCTS */}
        {activeTab === "products" && (
          <div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
              <input
                type="text"
                placeholder="Filtrar productos..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="glass-panel px-4 py-2 rounded-xl text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none w-full sm:w-72 border-white/10"
              />

              <button
                onClick={() => {
                  setProductToEdit(null);
                  setIsProductModalOpen(true);
                }}
                className="glass-button-primary px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar Producto</span>
              </button>
            </div>

            <div className="glass-panel rounded-3xl overflow-hidden border border-white/10">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5 text-white/60">
                      <th className="p-4">Producto</th>
                      <th className="p-4">Precio</th>
                      <th className="p-4">Categoría</th>
                      <th className="p-4 text-center">Stock</th>
                      <th className="p-4 text-center">Destacado</th>
                      <th className="p-4 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredProducts.map((p) => {
                      const shareUrl = getCatalogShareUrl(`/producto/${p.id}`);
                      return (
                        <tr key={p.id} className="hover:bg-white/[0.03] transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="relative w-12 h-12 rounded-xl overflow-hidden glass-panel shrink-0">
                                <Image
                                  src={p.images?.[0] || "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=400&q=80"}
                                  alt={p.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <span className="font-semibold text-white line-clamp-1">{p.title}</span>
                                {p.badge?.toUpperCase() === "DESTACADO" && (
                                  <span className="text-[10px] text-amber-300 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 inline-flex items-center gap-1 mt-0.5">
                                    <Sparkles className="w-2.5 h-2.5" />
                                    <span>Destacado</span>
                                  </span>
                                )}
                                {p.badge?.toUpperCase() === "NUEVO" && (
                                  isProductNew(p) ? (
                                    <span 
                                      className="text-[10px] text-emerald-300 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 inline-flex items-center gap-1 mt-0.5"
                                      title={`Etiqueta Nuevo activa: le quedan ${getRemainingNewDays(p)} días`}
                                    >
                                      ✨ Nuevo ({getRemainingNewDays(p)}d)
                                    </span>
                                  ) : (
                                    <span 
                                      className="text-[10px] text-white/40 font-medium bg-white/5 px-2 py-0.5 rounded-full border border-white/10 inline-flex items-center gap-1 mt-0.5"
                                      title="Etiqueta expirada después del período de 30 días"
                                    >
                                      ✨ Nuevo (Expirado)
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="p-4 font-mono font-bold text-white whitespace-nowrap">
                            {formatPrice(p.price)}
                            {p.compare_at_price && (
                              <span className="text-[10px] text-white/40 block line-through">
                                {formatPrice(p.compare_at_price)}
                              </span>
                            )}
                          </td>
                          <td className="p-4">
                            <span className="capitalize px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs">
                              {p.category}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <button
                              onClick={() => handleToggleStock(p)}
                              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
                                p.in_stock
                                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                  : "bg-red-500/20 text-red-300 border border-red-500/30"
                              }`}
                            >
                              {p.in_stock ? "En stock" : "Agotado"}
                            </button>
                          </td>
                          <td className="p-4 text-center">
                            <button
                              onClick={() => handleToggleFeatured(p)}
                              className={`p-1.5 rounded-lg transition-all ${
                                p.is_featured
                                  ? "text-amber-400 bg-amber-500/20 border border-amber-500/30"
                                  : "text-white/30 hover:text-white/60"
                              }`}
                              title={p.is_featured ? "Destacado en portada" : "No destacado"}
                            >
                              <Sparkles className="w-4 h-4" />
                            </button>
                          </td>
                          <td className="p-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleCopyLink(shareUrl, p.id)}
                                className="p-2 rounded-xl glass-button text-white/70 hover:text-white"
                                title="Copiar Enlace Directo"
                              >
                                {copiedId === p.id ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                              <a
                                href={`/producto/${p.id}`}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2 rounded-xl glass-button text-white/70 hover:text-white"
                                title="Ver en Catálogo"
                              >
                                <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                              </a>
                              <button
                                onClick={() => {
                                  setProductToEdit(p);
                                  setIsProductModalOpen(true);
                                }}
                                className="p-2 rounded-xl glass-button text-white/70 hover:text-white"
                                title="Editar"
                              >
                                <Edit3 className="w-3.5 h-3.5 text-amber-300" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(p.id, p.title)}
                                className="p-2 rounded-xl glass-button text-red-400 hover:text-red-300 hover:border-red-500/30"
                                title="Eliminar"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BANNERS */}
        {activeTab === "banners" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-xs sm:text-sm text-white/60">
                Los banners aparecen en la parte superior del catálogo como carrusel destacado.
              </p>
              <button
                onClick={() => {
                  setBannerToEdit(null);
                  setIsBannerModalOpen(true);
                }}
                className="glass-button-primary px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Nuevo Banner</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {banners.map((b) => (
                <div key={b.id} className="glass-panel rounded-3xl overflow-hidden border border-white/10 flex flex-col justify-between">
                  <div className="relative w-full h-44">
                    <Image src={b.image_url} alt={b.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      {b.badge && (
                        <span className="glass-pill px-2.5 py-1 rounded-full text-[10px] font-bold text-amber-300 border border-amber-400/30">
                          {b.badge}
                        </span>
                      )}
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        b.is_active ? "bg-emerald-500/20 text-emerald-300" : "bg-red-500/20 text-red-300"
                      }`}>
                        {b.is_active ? "Activo" : "Inactivo"}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-4 right-4">
                      <h4 className="text-base font-bold text-white line-clamp-1">{b.title}</h4>
                      <p className="text-xs text-white/70 line-clamp-1">{b.subtitle}</p>
                    </div>
                  </div>

                  <div className="p-4 flex items-center justify-between border-t border-white/10 bg-white/[0.02]">
                    <span className="text-xs text-white/40 font-mono">Prioridad: #{b.order}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setBannerToEdit(b);
                          setIsBannerModalOpen(true);
                        }}
                        className="p-2 rounded-xl glass-button text-amber-300"
                        title="Editar"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteBanner(b.id, b.title)}
                        className="p-2 rounded-xl glass-button text-red-400"
                        title="Eliminar"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CATEGORIES */}
        {activeTab === "categories" && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-xs sm:text-sm text-white/70">
                  Gestiona las categorías que ven tus clientes para filtrar los productos en el catálogo.
                </p>
                <p className="text-[11px] text-white/40 mt-0.5">
                  Las nuevas categorías aparecerán automáticamente en los filtros y en el formulario de alta de productos.
                </p>
              </div>

              <button
                onClick={() => {
                  setCategoryToEdit(null);
                  setIsCategoryModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.35)] transition-all cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Nueva Categoría</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((c) => {
                const isSystemDefault = c.slug === "todos";
                const prodsCount = products.filter(
                  (p) => p.category.toLowerCase() === c.slug.toLowerCase()
                ).length;

                return (
                  <div
                    key={c.id}
                    className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-400/20 flex items-center justify-center text-amber-300 shrink-0">
                            <Tag className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-sm font-bold text-white truncate">{c.name}</h4>
                            <p className="text-[11px] text-white/40 font-mono truncate">
                              slug: {c.slug}
                            </p>
                          </div>
                        </div>

                        {isSystemDefault && (
                          <span className="glass-pill px-2 py-0.5 rounded-full text-[9px] font-bold text-white/50 border border-white/10 shrink-0">
                            General
                          </span>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                        <span className="text-white/50">Productos asociados:</span>
                        <span className="font-mono font-bold text-white">
                          {isSystemDefault ? `${products.length} (total)` : prodsCount}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setCategoryToEdit(c);
                          setIsCategoryModalOpen(true);
                        }}
                        className="p-2 rounded-xl glass-button text-amber-300 hover:text-amber-200"
                        title="Editar categoría"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      {!isSystemDefault && (
                        <button
                          onClick={() => handleDeleteCategory(c.id, c.name, c.slug)}
                          className="p-2 rounded-xl glass-button text-red-400 hover:text-red-300"
                          title="Eliminar categoría"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* Product Form Modal */}
      <ProductFormModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        productToEdit={productToEdit}
        categories={categories}
        onSaved={loadData}
      />

      {/* Banner Form Modal */}
      <BannerFormModal
        isOpen={isBannerModalOpen}
        onClose={() => setIsBannerModalOpen(false)}
        bannerToEdit={bannerToEdit}
        onSaved={loadData}
      />

      {/* Category Form Modal */}
      <CategoryFormModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        categoryToEdit={categoryToEdit}
        existingCategories={categories}
        onSaved={loadData}
      />
    </div>
  );
}
