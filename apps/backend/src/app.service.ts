import { Injectable } from '@nestjs/common';
import { OpenAIService } from 'libs/openai/openai.service';
import { Ingredient } from 'types/ingredient';

@Injectable()
export class AppService {
  constructor(private readonly openAIService: OpenAIService) {}

  async getIngredients(description: string): Promise<Ingredient[]> {
    return await this.openAIService.extractIngredients(description);
  }
}
