import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { Video } from 'types/video';
import { OpenAIService } from 'libs/openai/openai.service';
import { mockSearchVideoResponse } from 'src/search/mock.response';
import { FullRecipe } from 'types/full-recipe';
import { FULL_RECIPES_MOCK } from 'libs/const/recipe.mock';

@Controller('search')
export class SearchController {
  constructor(
    private readonly searchService: SearchService,
    private readonly openaiService: OpenAIService,
  ) {}

  @Get('full-recipe/youtube/mock')
  async searchFullRecipeOnYoutubeMock(
    @Query('query') query: string,
  ): Promise<FullRecipe[]> {
    return FULL_RECIPES_MOCK;
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
      FULL_RECIPES_MOCK[0].ingredients,
    );
  }

  @Get()
  async search(@Query('keyword') keyword: string) {
    return await this.searchService.search(keyword);
  }
}
