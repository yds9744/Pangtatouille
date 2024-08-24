import { Module } from '@nestjs/common';
import { RecommendProductService } from './recommend-product.service';
import { RecommendProductController } from './recommend-product.controller';

@Module({
  controllers: [RecommendProductController],
  providers: [RecommendProductService],
})
export class RecommendProductModule {}
