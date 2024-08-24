import { Ingredient } from "./ingredient";
import { Recipe } from "./recipe";
import { Product } from "./product";
import { Video } from "./video";

export type FullRecipe = {
  ingredients: Ingredient[];
  recipe: Recipe;
  products: Product[];
  video: Video;
};
