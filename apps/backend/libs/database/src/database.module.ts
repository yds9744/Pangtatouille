import { MyDataSource } from '@lib/database/config/database.data-source';
import { Product } from '@lib/database/product/product.entity';
import { ProductPackage } from '@lib/database/product-package/product-package.entity';
import { Module } from '@nestjs/common';

export const entities = [Product, ProductPackage];
@Module({
  providers: [MyDataSource],
  exports: [MyDataSource],
})
export class DatabaseModule {}
