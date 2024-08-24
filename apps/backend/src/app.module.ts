import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SystemModule } from './system/system.module';
import { ConfigModule } from '@nestjs/config';
import { GlobalModule } from './core/global.module';

@Module({
  imports: [
    SystemModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GlobalModule,
  ],
  controllers: [AppController],
  providers: [Logger, AppService],
})
export class AppModule {}
