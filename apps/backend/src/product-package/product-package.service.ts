import { ProductPackage } from '@lib/database/product-package/product-package.entity';
import { Injectable } from '@nestjs/common';
import { Ingredient } from 'types/ingredient';
import { Product } from 'types/product';
import { Recipe } from 'types/recipe';
import { Video } from 'types/video';

@Injectable()
export class ProductPackageService {
  async findOne(id: number) {
    const productPackage = await ProductPackage.findOneBy({ id });
    return productPackage;
  }

  async createOne(
    video: Video,
    ingredients: Ingredient[],
    recipe: Recipe,
    products: Product[],
  ) {
    const newProductPackage = new ProductPackage();
    newProductPackage.ingredients = ingredients;
    newProductPackage.recipe = recipe;
    newProductPackage.products = products;
    newProductPackage.video = video;
    await newProductPackage.save();
    return newProductPackage;
  }
}
