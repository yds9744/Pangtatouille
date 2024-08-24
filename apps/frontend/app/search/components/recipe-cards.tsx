import { FullRecipe } from "@/types/full-recipe";
import { RecipeCard } from "@/app/search/components/recipe-card";

export async function RecipeCards({ keyword }: { keyword: string }) {
  const fullRecipes: FullRecipe[] = await fetch(
    `http://localhost:8000/search/full-recipe/youtube/mock?query=${keyword}`
  ).then((res) => res.json());

  return (
    <div>
      {fullRecipes.map((recipe) => (
        <RecipeCard key={recipe.id} fullRecipe={recipe} />
      ))}
    </div>
  );
}
