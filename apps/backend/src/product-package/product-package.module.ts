import { Module } from '@nestjs/common';
import { ProductPackageService } from './product-package.service';
import { ProductPackageController } from './product-package.controller';

@Module({
  controllers: [ProductPackageController],
  providers: [ProductPackageService],
})
export class ProductPackageModule {}
