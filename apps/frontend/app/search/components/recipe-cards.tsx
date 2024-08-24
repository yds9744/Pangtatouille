import { ProductPackage } from "@/types/product-package";
import { RecipeCard } from "@/app/search/components/recipe-card";

export async function RecipeCards({ keyword }: { keyword: string }) {
  const productPackages: ProductPackage[] = await fetch(
    `http://localhost:8000/search/product-package/youtube/mock?query=${keyword}`
  ).then((res) => res.json());

  return (
    <div>
      {productPackages.map((recipe) => (
        <RecipeCard key={recipe.id} productPackage={recipe} />
      ))}
    </div>
  );
}
