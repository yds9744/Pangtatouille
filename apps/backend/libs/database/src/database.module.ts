import { MyDataSource } from '@lib/database/config/database.data-source';
import { Product } from '@lib/database/product/product.entity';
import { Module } from '@nestjs/common';

export const entities = [Product];
@Module({
  providers: [MyDataSource],
  exports: [MyDataSource],
})
export class DatabaseModule {}
