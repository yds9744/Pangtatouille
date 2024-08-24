import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { RecommendProductService } from './recommend-product.service';
// import { FULL_RECIPES_MOCK } from 'libs/const/recipe.mock';

@Controller('recommend-product')
export class RecommendProductController {
  constructor(
    private readonly recommendProductService: RecommendProductService,
  ) {}

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.recommendProductService.findOne(id);
  }

  // @Post()
  // async createOne() {
  //   return await this.recommendProductService.createOne(FULL_RECIPES_MOCK[0]);
  // }
}
