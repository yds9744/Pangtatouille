import { Product } from '@lib/database/product/product.entity';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductService {
  async findAll() {
    const allProduct = await Product.find();
    return allProduct;
  }

  async findOne(id: number) {
    const product = await Product.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }
}
