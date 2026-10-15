import { Banner, Category, Product } from "@/types";
import { INITIAL_BANNERS, INITIAL_CATEGORIES, INITIAL_PRODUCTS } from "./constants";
import { isSupabaseConfigured, supabase } from "./supabase";
import { convertImageToWebP } from "./image-utils";

const STORAGE_KEY_PRODUCTS = "yuyito_hierbas_products_v2";
const STORAGE_KEY_BANNERS = "yuyito_hierbas_banners_v3";
const STORAGE_KEY_CATEGORIES = "yuyito_hierbas_categories_v2";

// Helper para obtener datos locales en caso de no tener Supabase configurado
function getLocalItem<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (err) {
    console.warn(`Error reading ${key} from localStorage`, err);
    return fallback;
  }
}

function setLocalItem<T>(key: string, data: T) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.warn(`Error saving ${key} to localStorage`, err);
  }
}

export const DataService = {
  isLiveDb(): boolean {
    return isSupabaseConfigured && supabase !== null;
  },

  async getProducts(): Promise<Product[]> {
    if (this.isLiveDb() && supabase) {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        return data as Product[];
      }
    }
    return getLocalItem<Product[]>(STORAGE_KEY_PRODUCTS, INITIAL_PRODUCTS);
  },

  async getProductById(id: string): Promise<Product | null> {
    if (this.isLiveDb() && supabase) {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (!error && data) {
        return data as Product;
      }
    }
    const products = await this.getProducts();
    return products.find((p) => p.id === id) || null;
  },

  async saveProduct(product: Partial<Product> & { title: string; price: number; category: string }): Promise<Product> {
    const isNew = !product.id;
    const now = new Date().toISOString();

    const productPayload: Product = {
      id: product.id || `prod-${Date.now()}`,
      title: product.title,
      description: product.description || "",
      price: Number(product.price),
      compare_at_price: product.compare_at_price ? Number(product.compare_at_price) : null,
      category: product.category,
      images: product.images && product.images.length > 0 
        ? product.images 
        : ["https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80"],
      in_stock: product.in_stock ?? true,
      is_featured: product.is_featured ?? false,
      badge: product.badge || null,
      whatsapp_number: product.whatsapp_number,
      created_at: product.created_at || now,
      updated_at: now,
    };

    if (this.isLiveDb() && supabase) {
      const { data, error } = await supabase
        .from("products")
        .upsert(productPayload)
        .select()
        .single();

      if (error) {
        console.error("Supabase upsert error:", error);
        throw new Error(error.message);
      }
      return data as Product;
    }

    // Modo local / demo
    const current = getLocalItem<Product[]>(STORAGE_KEY_PRODUCTS, INITIAL_PRODUCTS);
    let updated: Product[];
    if (isNew) {
      updated = [productPayload, ...current];
    } else {
      updated = current.map((p) => (p.id === productPayload.id ? productPayload : p));
    }
    setLocalItem(STORAGE_KEY_PRODUCTS, updated);
    return productPayload;
  },

  async deleteProduct(id: string): Promise<boolean> {
    if (this.isLiveDb() && supabase) {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) {
        console.error("Supabase delete error:", error);
        throw new Error(error.message);
      }
      return true;
    }

    const current = getLocalItem<Product[]>(STORAGE_KEY_PRODUCTS, INITIAL_PRODUCTS);
    const updated = current.filter((p) => p.id !== id);
    setLocalItem(STORAGE_KEY_PRODUCTS, updated);
    return true;
  },

  async getBanners(): Promise<Banner[]> {
    if (this.isLiveDb() && supabase) {
      const { data, error } = await supabase
        .from("banners")
        .select("*")
        .order("order", { ascending: true });

      if (!error && data && data.length > 0) {
        return data as Banner[];
      }
    }
    return getLocalItem<Banner[]>(STORAGE_KEY_BANNERS, INITIAL_BANNERS);
  },

  async saveBanner(banner: Partial<Banner> & { title: string; image_url: string }): Promise<Banner> {
    const isNew = !banner.id;
    const bannerPayload: Banner = {
      id: banner.id || `banner-${Date.now()}`,
      title: banner.title,
      subtitle: banner.subtitle || "",
      image_url: banner.image_url,
      button_text: banner.button_text || "Ver Más",
      button_link: banner.button_link || "#catalogo",
      badge: banner.badge || "",
      is_active: banner.is_active ?? true,
      order: banner.order ?? 1,
      created_at: banner.created_at || new Date().toISOString(),
    };

    if (this.isLiveDb() && supabase) {
      const { data, error } = await supabase
        .from("banners")
        .upsert(bannerPayload)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data as Banner;
    }

    const current = getLocalItem<Banner[]>(STORAGE_KEY_BANNERS, INITIAL_BANNERS);
    let updated: Banner[];
    if (isNew) {
      updated = [...current, bannerPayload];
    } else {
      updated = current.map((b) => (b.id === bannerPayload.id ? bannerPayload : b));
    }
    setLocalItem(STORAGE_KEY_BANNERS, updated);
    return bannerPayload;
  },

  async deleteBanner(id: string): Promise<boolean> {
    if (this.isLiveDb() && supabase) {
      const { error } = await supabase.from("banners").delete().eq("id", id);
      if (error) throw new Error(error.message);
      return true;
    }

    const current = getLocalItem<Banner[]>(STORAGE_KEY_BANNERS, INITIAL_BANNERS);
    const updated = current.filter((b) => b.id !== id);
    setLocalItem(STORAGE_KEY_BANNERS, updated);
    return true;
  },

  async getCategories(): Promise<Category[]> {
    if (this.isLiveDb() && supabase) {
      const { data, error } = await supabase.from("categories").select("*");
      if (!error && data && data.length > 0) {
        return data as Category[];
      }
    }
    return getLocalItem<Category[]>(STORAGE_KEY_CATEGORIES, INITIAL_CATEGORIES);
  },

  async saveCategory(category: Partial<Category> & { name: string; slug?: string }): Promise<Category> {
    const slug = (category.slug || category.name)
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const isNew = !category.id;
    const categoryPayload: Category = {
      id: category.id || `cat-${slug || Date.now()}`,
      name: category.name.trim(),
      slug: slug || `cat-${Date.now()}`,
      icon: category.icon || "Tag",
    };

    if (this.isLiveDb() && supabase) {
      const { data, error } = await supabase
        .from("categories")
        .upsert(categoryPayload)
        .select()
        .single();

      if (error) {
        console.error("Supabase category upsert error:", error);
        throw new Error(error.message);
      }
      return data as Category;
    }

    const current = getLocalItem<Category[]>(STORAGE_KEY_CATEGORIES, INITIAL_CATEGORIES);
    let updated: Category[];
    if (isNew) {
      updated = [...current, categoryPayload];
    } else {
      updated = current.map((c) => (c.id === categoryPayload.id ? categoryPayload : c));
    }
    setLocalItem(STORAGE_KEY_CATEGORIES, updated);
    return categoryPayload;
  },

  async deleteCategory(id: string): Promise<boolean> {
    if (this.isLiveDb() && supabase) {
      const { error } = await supabase.from("categories").delete().eq("id", id);
      if (error) {
        console.error("Supabase category delete error:", error);
        throw new Error(error.message);
      }
      return true;
    }

    const current = getLocalItem<Category[]>(STORAGE_KEY_CATEGORIES, INITIAL_CATEGORIES);
    const updated = current.filter((c) => c.id !== id);
    setLocalItem(STORAGE_KEY_CATEGORIES, updated);
    return true;
  },

  async resetDemoData(): Promise<void> {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY_PRODUCTS);
      localStorage.removeItem(STORAGE_KEY_BANNERS);
      localStorage.removeItem(STORAGE_KEY_CATEGORIES);
    }
  },

  async uploadImage(file: File): Promise<string> {
    // 1. Optimizar y convertir automáticamente a WebP antes de subir
    const webpFile = await convertImageToWebP(file, {
      maxWidth: 1600,
      maxHeight: 1600,
      quality: 0.82,
    });

    if (this.isLiveDb() && supabase) {
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.webp`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("catalog-media")
        .upload(filePath, webpFile, {
          contentType: "image/webp",
          cacheControl: "31536000",
          upsert: true,
        });

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      const { data } = supabase.storage
        .from("catalog-media")
        .getPublicUrl(filePath);

      return data.publicUrl;
    }

    // Si no hay Supabase, convertimos el WebP optimizado a base64
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(webpFile);
    });
  }
};
