import { RecommendProduct } from '@lib/database/recommend-product/recommend-product.entity';
import { Injectable } from '@nestjs/common';
import { FullRecipe } from 'types/full-recipe';

@Injectable()
export class RecommendProductService {
  async findOne(id: number) {
    const recommendProduct = await RecommendProduct.findOneBy({ id });
    return recommendProduct;
  }

  async createOne(recommendProduct: FullRecipe) {
    const newRecommendProduct = new RecommendProduct();
    newRecommendProduct.ingredients = recommendProduct.ingredients;
    newRecommendProduct.recipe = recommendProduct.recipe;
    newRecommendProduct.products = recommendProduct.products;
    newRecommendProduct.video = recommendProduct.video;
    await newRecommendProduct.save();
    return newRecommendProduct;
  }
}
