import { Controller, Get, Logger, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { Video } from 'types/video';
import { OpenAIService } from 'libs/openai/openai.service';
import { mockSearchVideoResponse } from 'src/search/mock.response';
import { ProductPackage } from 'types/product-package';
import { PRODUCT_PACKAGE_MOCK } from 'libs/const/product-package.mock';

@Controller('search')
export class SearchController {
  protected readonly logger = new Logger(this.constructor.name);

  constructor(
    private readonly searchService: SearchService,
    private readonly openaiService: OpenAIService,
  ) {}

  @Get('product-package/youtube/mock')
  async searchProductPackageOnYoutubeMock(
    @Query('query') query: string,
  ): Promise<ProductPackage[]> {
    // mimic 3 seconds delay
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return PRODUCT_PACKAGE_MOCK;
  }

  @Get('product-package/youtube')
  async searchProductPackageOnYoutube(
    @Query('query') query: string,
  ): Promise<ProductPackage[]> {
    const videos = await this.searchService.searchRecipeVideoOnYoutube(query);
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
          const products = await this.searchService.searchByIngredients(
            recipeAndIngredients.ingredients,
          );
          const productPackage: ProductPackage = {
            id: 1,
            video,
            products,
            ...recipeAndIngredients,
          };
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

  @Get('recipe/youtube/mock')
  async searchRecipeOnYoutubeMock(
    @Query('query') query: string,
  ): Promise<Video[]> {
    return mockSearchVideoResponse;
  }

  @Get('recipe/youtube')
  async searchRecipeOnYoutube(@Query('query') query: string): Promise<Video[]> {
    const videos = await this.searchService.searchRecipeVideoOnYoutube(query);
    const recipeVideos = await Promise.all(
      videos.map(async (video) => {
        const isRecipe = await this.openaiService.isRecipe(video.description);
        return { ...video, isRecipe };
      }),
    );

    return recipeVideos.filter((video) => video.isRecipe);
  }

  @Get('ingredient')
  async searchByIngredient(@Query('keyword') keyword: string) {
    return await this.searchService.searchByIngredients(
      PRODUCT_PACKAGE_MOCK[0].ingredients,
    );
  }

  @Get()
  async search(@Query('keyword') keyword: string) {
    return await this.searchService.search(keyword);
  }
}
