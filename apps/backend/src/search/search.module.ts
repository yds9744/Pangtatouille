import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { ProductPackageService } from 'src/product-package/product-package.service';

@Module({
  controllers: [SearchController],
  providers: [SearchService, ProductPackageService],
})
export class SearchModule {}
