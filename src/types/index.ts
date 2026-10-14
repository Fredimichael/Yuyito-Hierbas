export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  compare_at_price?: number | null;
  category: string;
  images: string[];
  in_stock: boolean;
  is_featured: boolean;
  badge?: string | null;
  whatsapp_number?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  image_url: string;
  button_text?: string;
  button_link?: string;
  badge?: string;
  is_active: boolean;
  order: number;
  created_at?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
}

export type SortOption = "featured" | "newest" | "price-asc" | "price-desc";

export interface FilterState {
  category: string;
  search: string;
  sortBy: SortOption;
  onlyInStock: boolean;
}
