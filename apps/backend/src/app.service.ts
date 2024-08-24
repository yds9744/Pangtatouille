import { Injectable } from '@nestjs/common';
import { OpenAIService } from 'libs/openai/openai.service';
import { ProductPackage } from 'types/product-package';
import { Ingredient } from 'types/ingredient';
import { Recipe } from 'types/recipe';

@Injectable()
export class AppService {
  constructor(private readonly openAIService: OpenAIService) {}

  async getProductPackage(
    description: string,
  ): Promise<Pick<ProductPackage, 'ingredients' | 'recipe'>> {
    return await this.openAIService.extractRecipeAndIngredients(description);
  }

  async getRecipe(description: string): Promise<Recipe> {
    return await this.openAIService.extractRecipe(description);
  }

  async getIngredients(description: string): Promise<Ingredient[]> {
    return await this.openAIService.extractIngredients(description);
  }
}
