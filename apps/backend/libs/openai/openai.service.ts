import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';
import { Ingredient } from 'types/ingredient';

@Injectable()
export class OpenAIService {
  protected readonly logger = new Logger(this.constructor.name);
  public openai: OpenAI;

  constructor(private readonly configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: configService.getOrThrow('OPENAI_API_KEY'),
    });
  }

  async extractIngredients(text: string): Promise<Ingredient[]> {
    this.logger.log(`Extracting ingredients from text... ${text}`);
    const Ingredients = z.object({
      ingredients: z.array(
        z.object({
          name: z.string(),
          amount: z.string(),
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
}
