import { ProductPackage } from "@/types/product-package";
import { RecipeCard } from "@/app/search/components/recipe-card";

export async function YoutubeRecipeCards({ keyword }: { keyword: string }) {
  const productPackages: ProductPackage[] = await fetch(
    `${process.env.SERVER_BASE_URL}/search/product-package/youtube?query=${keyword}`,
    { cache: "no-cache" }
  ).then((res) => res.json());

  return (
    <>
      {productPackages.map((recipe) => (
        <RecipeCard key={recipe.id} productPackage={recipe} />
      ))}
    </>
  );
}
