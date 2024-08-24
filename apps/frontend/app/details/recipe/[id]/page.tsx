import { ProductPackage } from "@/types/product-package";
import RecipeClientSide from "./RecipeClientSide";

export default async function RecipePage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const recipeId = params.id;
  if (isNaN(parseInt(recipeId))) return null; // WHY GET /details/recipe/placeholder.svg
  const productPackage: ProductPackage = await fetch(
    `${process.env.SERVER_BASE_URL}/product-package/${recipeId}`
  ).then((res) => res.json());

  return (
    <RecipeClientSide productPackage={productPackage}/>
  )
}
