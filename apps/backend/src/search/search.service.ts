import { Product } from '@lib/database/product/product.entity';
import { Injectable, Logger } from '@nestjs/common';
import { searchRecipeVideo } from 'libs/search/youtube';
import { Ingredient } from 'types/ingredient';
import { Video } from 'types/video';

@Injectable()
export class SearchService {
  protected readonly logger = new Logger(this.constructor.name);

  async searchRecipeVideoOnYoutube(query: string): Promise<Video[]> {
    const videos: Video[] = await searchRecipeVideo(query);
    return videos;
  }

  async search(keyword: string): Promise<Product[]> {
    const searchResult = await Product.searchBy({ name: keyword });
    return searchResult;
  }

  async searchByIngredients(ingredients: Ingredient[]): Promise<Product[]> {
    const result = await Promise.all(
      ingredients.map(async (ingredient) => {
        const ingredientUnit = ingredient.unit.toLowerCase();

        const searchResult1 = await Product.searchBy({
          name: ingredient.name,
        });

        let searchResult2 = searchResult1.filter(
          (product) => product.amountUnit === ingredientUnit,
        );

        if (searchResult2.length === 0) {
          searchResult2 = searchResult1.filter(
            (product) => product.quantityUnit === ingredientUnit,
          );
        }

        if (searchResult2.length === 0) {
          searchResult2 = searchResult1;
        }

        const searchResult3 = searchResult2.filter(
          (product) => ingredient.amount === product.amount * product.quantity,
        );

        if (searchResult3.length > 0) {
          return searchResult3[0];
        }

        const searchResult4 = searchResult2.sort((a, b) => {
          return (
            Math.abs(a.amount * a.quantity - ingredient.amount) -
            Math.abs(b.amount * b.quantity - ingredient.amount)
          );
        });

        return searchResult4[0];
      }),
    );

    return result.filter((product) => !!product);
  }
}
