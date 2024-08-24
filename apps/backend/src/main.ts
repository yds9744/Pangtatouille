import { config } from 'dotenv';
config(); // load env before loading tracer and logger

import otelSDK from './tracer'; // otelSDK should be imported before any other imports
import createLogger from './logger';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  const apiVersion = '1';
  const config = new DocumentBuilder()
    .setTitle('Pang API')
    .setVersion(apiVersion)
    .addServer('http://localhost:8000')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`api/v${apiVersion}`, app, document);

  await app.listen(8000);
}
bootstrap();
