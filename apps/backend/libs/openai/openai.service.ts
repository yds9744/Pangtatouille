import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';
import { Ingredient } from 'types/ingredient';
import { Recipe } from 'types/recipe';

@Injectable()
export class OpenAIService {
  protected readonly logger = new Logger(this.constructor.name);
  public openai: OpenAI;

  constructor(private readonly configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: configService.getOrThrow('OPENAI_API_KEY'),
    });
  }

  async extractRecipe(text: string): Promise<Recipe> {
    this.logger.log(`Extracting recipe from text... ${text}`);
    const RecipeObj = z.object({
      steps: z.array(
        z.object({
          step: z.number(),
          description: z.string(),
          optional: z.boolean().optional(), // If optional is boolean and can be undefined
        }),
      ),
    });

    const completion = await this.openai.beta.chat.completions.parse({
      // model: 'gpt-4o-2024-08-06',
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Extract the recipe information.' },
        {
          role: 'user',
          content: text,
        },
      ],
      response_format: zodResponseFormat(RecipeObj, 'recipe'),
    });

    const recipe = completion.choices[0].message.parsed as Recipe;
    return recipe;
  }

  async extractIngredients(text: string): Promise<Ingredient[]> {
    this.logger.log(`Extracting ingredients from text... ${text}`);
    const Ingredients = z.object({
      ingredients: z.array(
        z.object({
          name: z.string(),
          amount: z.number(),
          unit: z.string(),
          optional: z.boolean().optional(), // If optional is boolean and can be undefined
        }),
      ),
    });

    const completion = await this.openai.beta.chat.completions.parse({
      // model: 'gpt-4o-2024-08-06',
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Extract the ingredients information.' },
        {
          role: 'user',
          content: text,
        },
      ],
      response_format: zodResponseFormat(Ingredients, 'ingredients'),
    });

    const ingredients = completion.choices[0].message.parsed
      .ingredients as Ingredient[];

    return ingredients;
  }

  async isRecipe(text: string): Promise<boolean> {
    this.logger.log(`Checking if text is a recipe... ${text}`);
    const IsRecipe = z.object({
      isRecipe: z.boolean(),
    });
    const completion = await this.openai.beta.chat.completions.parse({
      // model: 'gpt-4o-2024-08-06',
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'Check if the text contains recipe. The recipe should contain steps and ingredients so that people can follow the recipe.',
        },
        {
          role: 'user',
          content: text,
        },
      ],
      response_format: zodResponseFormat(IsRecipe, 'isRecipe'),
    });

    return completion.choices[0].message.parsed.isRecipe;
  }
}
