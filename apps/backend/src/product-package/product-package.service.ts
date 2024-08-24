import { ProductPackage } from '@lib/database/product-package/product-package.entity';
import { Injectable } from '@nestjs/common';
import { FullRecipe } from 'types/full-recipe';

@Injectable()
export class ProductPackageService {
  async findOne(id: number) {
    const productPackage = await ProductPackage.findOneBy({ id });
    return productPackage;
  }

  async createOne(productPackage: FullRecipe) {
    const newProductPackage = new ProductPackage();
    newProductPackage.ingredients = productPackage.ingredients;
    newProductPackage.recipe = productPackage.recipe;
    newProductPackage.products = productPackage.products;
    newProductPackage.video = productPackage.video;
    await newProductPackage.save();
    return newProductPackage;
  }
}
