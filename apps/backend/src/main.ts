import { config } from 'dotenv';
config(); // load env before loading tracer and logger

import otelSDK from './tracer'; // otelSDK should be imported before any other imports
import createLogger from './logger';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

process.on('SIGTERM', () => {
  otelSDK
    .shutdown()
    .then(
      () => console.log('SDK shut down successfully'),
      (err) => console.log('Error shutting down SDK', err),
    )
    .finally(() => process.exit(0));
});

async function bootstrap() {
  otelSDK.start();
  const app = await NestFactory.create(AppModule, {
    logger: createLogger(),
  });
  app.enableCors({
    origin: '*', // FIXME: change this
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
    ],
  });
  await app.listen(8000);
}
bootstrap();
