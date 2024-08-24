import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ProductPackageService } from './product-package.service';
// import { FULL_RECIPES_MOCK } from 'libs/const/recipe.mock';

@Controller('product-package')
export class ProductPackageController {
  constructor(private readonly productPackageService: ProductPackageService) {}

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.productPackageService.findOne(id);
  }

  // @Post()
  // async createOne() {
  //   return await this.productPackageService.createOne(FULL_RECIPES_MOCK[0]);
  // }
}
