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

  async createOne({
    ingredients,
    recipe,
    products,
    video,
    blog,
  }: {
    ingredients: Ingredient[];
    recipe: Recipe;
    products: Product[];
    video?: Video;
    blog?: {
      url: string;
      imageUrl: string;
      title: string;
    };
  }) {
    const newProductPackage = new ProductPackage();
    newProductPackage.ingredients = ingredients;
    newProductPackage.recipe = recipe;
    newProductPackage.products = products;
    newProductPackage.video = video;
    newProductPackage.blog = blog;
    await newProductPackage.save();
    return newProductPackage;
  }
}
