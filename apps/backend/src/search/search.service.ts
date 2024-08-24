import { Product } from '@lib/database/product/product.entity';
import { Product as ProductType } from 'types/product';
import { Injectable, Logger } from '@nestjs/common';
import { OpenAIService } from 'libs/openai/openai.service';
import { searchRecipeVideo } from 'libs/search/youtube';
import { ProductPackageService } from 'src/product-package/product-package.service';
import { Ingredient } from 'types/ingredient';
import { Video } from 'types/video';

@Injectable()
export class SearchService {
  constructor(
    private readonly openaiService: OpenAIService,
    private readonly productPackageService: ProductPackageService,
  ) {}
  protected readonly logger = new Logger(this.constructor.name);

  async searchRecipeVideoOnYoutube(query: string): Promise<Video[]> {
    const videos: Video[] = await searchRecipeVideo(query);
    return videos;
  }

  async getProductPackage(query: string) {
    const videos = await this.searchRecipeVideoOnYoutube(query);
    const recipeVideos = (
      await Promise.all(
        videos.map(async (video) => {
          const isRecipe = await this.openaiService.isRecipe(video.description);
          return { ...video, isRecipe };
        }),
      )
    ).filter((video) => video.isRecipe);

    if (recipeVideos.length > 0) {
      const productPackages = await Promise.all(
        recipeVideos.map(async (video) => {
          const recipeAndIngredients =
            await this.openaiService.extractRecipeAndIngredients(
              video.description,
            );
          const products = await this.searchByIngredients(
            recipeAndIngredients.ingredients,
          );
          const productPackage = await this.productPackageService.createOne({
            ingredients: recipeAndIngredients.ingredients,
            recipe: recipeAndIngredients.recipe,
            products,
            video,
          });
          return productPackage;
        }),
      );
      this.logger.log(
        `productPackages: ${JSON.stringify(productPackages, null, 2)}`,
      );
      return productPackages;
    }

    return [];
  }

  async search(keyword: string): Promise<Product[]> {
    const searchResult = await Product.searchBy({ name: keyword });
    return searchResult;
  }

  async searchByIngredients(ingredients: Ingredient[]): Promise<ProductType[]> {
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
          return { ...searchResult3[0], ingredient };
        }

        const searchResult4 = searchResult2.sort((a, b) => {
          return (
            Math.abs(a.amount * a.quantity - ingredient.amount) -
            Math.abs(b.amount * b.quantity - ingredient.amount)
          );
        });

        return { ...searchResult4[0], ingredient };
      }),
    );

    return result.filter((product) => !!product.id);
  }
}
