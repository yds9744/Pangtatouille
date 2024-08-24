import { FullRecipe } from "@/types/full-recipe";
import { RecipeCard } from "@/app/search/components/recipe-card";

export async function RecipeCards({ keyword }: { keyword: string }) {
  const fullRecipes: FullRecipe[] = await fetch(
    `http://localhost:8000/search/full-recipe/youtube/mock?query=${keyword}`,
    { cache: "no-store" }
  ).then((res) => res.json());

  return (
    <div>
      {fullRecipes.map((recipe, index) => (
        <RecipeCard key={index} fullRecipe={recipe} />
      ))}
    </div>
  );
}
