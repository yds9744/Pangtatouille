import { Ingredient } from 'types/ingredient';
import { Recipe } from 'types/recipe';

export type FullRecipe = {
  ingredients: Ingredient[];
  recipe: Recipe;
};
