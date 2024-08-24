import { ProductPackage } from "@/types/product-package";
import { RecipeCard } from "@/app/search/components/recipe-card";

export async function RecipeCards({ keyword }: { keyword: string }) {
  const productPackages: ProductPackage[] = await fetch(
    `${process.env.SERVER_BASE_URL}/search/product-package/youtube?query=${keyword}`
  ).then((res) => res.json());

  return (
    <>
      {productPackages.map((recipe) => (
        <RecipeCard key={recipe.id} productPackage={recipe} />
      ))}
    </>
  );
}