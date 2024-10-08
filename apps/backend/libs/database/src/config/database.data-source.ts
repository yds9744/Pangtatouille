import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConfigService } from '@nestjs/config';
import { entities } from '@lib/database/database.module';

@Injectable()
export class MyDataSource implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      name: 'default',
      type: 'postgres',
      host: this.configService.getOrThrow('POSTGRES_HOST'),
      port: this.configService.get('POSTGRES_PORT'),
      username: this.configService.get('POSTGRES_USER'),
      password: this.configService.get('POSTGRES_PASSWORD'),
      database: this.configService.get('POSTGRES_DB'),
      namingStrategy: new SnakeNamingStrategy(),
      logging:
        this.configService.get('NODE_ENV') === 'production' ? ['error'] : true,
      synchronize: false,
      subscribers: [],
      entities: [...entities],
    };
  }
}
