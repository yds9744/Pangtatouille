import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Ingredient } from 'types/ingredient';
import { GetIngredientsDto } from 'src/app.dto';

@Controller()
export class AppController {
  protected readonly logger = new Logger(this.constructor.name);
  constructor(private readonly appService: AppService) {}

  @Post('ingredients')
  async getIngredients(@Body() body: GetIngredientsDto): Promise<Ingredient[]> {
    this.logger.log('Getting ingredients...');
    body.description = GetIngredientsDto.mock().description;
    return await this.appService.getIngredients(body.description);
  }
}
