import { DataService } from "@/lib/data-service";
import { CatalogClient } from "@/components/catalog/CatalogClient";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [products, banners, categories] = await Promise.all([
    DataService.getProducts(),
    DataService.getBanners(),
    DataService.getCategories(),
  ]);

  return (
    <CatalogClient
      initialProducts={products}
      initialBanners={banners}
      initialCategories={categories}
    />
  );
}
