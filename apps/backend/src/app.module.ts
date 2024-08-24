import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SystemModule } from './system/system.module';
import { ConfigModule } from '@nestjs/config';
import { GlobalModule } from './core/global.module';
import { MyDataSource } from '@lib/database/config/database.data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { OpenAIService } from 'libs/openai/openai.service';
import { SearchModule } from 'src/search/search.module';
import { ProductModule } from './product/product.module';
import { ProductPackageModule } from './product-package/product-package.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: MyDataSource,
      dataSourceFactory: async (options: DataSourceOptions) =>
        await new DataSource(options).initialize(),
    }),
    GlobalModule,
    SystemModule,
    SearchModule,
    ProductModule,
    ProductPackageModule,
  ],
  controllers: [AppController],
  providers: [Logger, AppService, OpenAIService],
})
export class AppModule {}
