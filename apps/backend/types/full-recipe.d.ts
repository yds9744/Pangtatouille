import { Ingredient } from 'types/ingredient';
import { Recipe } from 'types/recipe';
import { Product } from 'types/product';

export type FullRecipe = {
  ingredients: Ingredient[];
  recipe: Recipe;
  products: Product[];
};
