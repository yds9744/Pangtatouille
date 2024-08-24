import { Ingredient } from './ingredient';
import { Recipe } from './recipe';
import { Product } from './product';
import { Video } from './video';

export type ProductPackage = {
  id: number;
  ingredients: Ingredient[];
  recipe: Recipe;
  products: Product[];
  video?: Video;
  blog?: {
    url: string;
    imageUrl: img_url;
    title: title;
  };
};
