import { Injectable } from '@nestjs/common';
import { OpenAIService } from 'libs/openai/openai.service';
import { FullRecipe } from 'types/full-recipe';
import { Ingredient } from 'types/ingredient';
import { Recipe } from 'types/recipe';

@Injectable()
export class AppService {
  constructor(private readonly openAIService: OpenAIService) {}

  async getFullRecipe(
    description: string,
  ): Promise<Pick<FullRecipe, 'ingredients' | 'recipe'>> {
    return await this.openAIService.extractRecipeAndIngredients(description);
  }

  async getRecipe(description: string): Promise<Recipe> {
    return await this.openAIService.extractRecipe(description);
  }

  async getIngredients(description: string): Promise<Ingredient[]> {
    return await this.openAIService.extractIngredients(description);
  }
}
