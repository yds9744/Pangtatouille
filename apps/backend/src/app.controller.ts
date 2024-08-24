import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Ingredient } from 'types/ingredient';
import { GetIngredientsDto } from 'src/app.dto';
import { Recipe } from 'types/recipe';
import { ProductPackage } from 'types/product-package';

@Controller()
export class AppController {
  protected readonly logger = new Logger(this.constructor.name);
  constructor(private readonly appService: AppService) {}

  @Post('product-package')
  async getProductPackage(
    @Body() body: GetIngredientsDto,
  ): Promise<Pick<ProductPackage, 'ingredients' | 'recipe'>> {
    this.logger.log('Getting full recipe...');
    body.description = GetIngredientsDto.mockKo().description;
    return await this.appService.getProductPackage(body.description);
  }

  @Post('recipe')
  async getRecipe(@Body() body: GetIngredientsDto): Promise<Recipe> {
    this.logger.log('Getting recipe...');
    body.description = GetIngredientsDto.mockEn().description;
    return await this.appService.getRecipe(body.description);
  }

  @Post('ingredients')
  async getIngredients(@Body() body: GetIngredientsDto): Promise<Ingredient[]> {
    this.logger.log('Getting ingredients...');
    body.description = GetIngredientsDto.mockEn().description;
    return await this.appService.getIngredients(body.description);
  }
}
