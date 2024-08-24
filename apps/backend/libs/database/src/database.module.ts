import { MyDataSource } from '@lib/database/config/database.data-source';
import { Module } from '@nestjs/common';

@Module({
  providers: [MyDataSource],
  exports: [MyDataSource],
})
export class DatabaseModule {}
