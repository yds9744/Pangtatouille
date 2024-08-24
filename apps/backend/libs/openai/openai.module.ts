import { Module } from '@nestjs/common';
import { DI_TOKEN } from '../const/di-tokens';
import { OpenAIService } from './openai.service';

@Module({
  providers: [
    {
      provide: DI_TOKEN.OPENAI_SERVICE,
      useClass: OpenAIService,
    },
  ],
  exports: [DI_TOKEN.OPENAI_SERVICE],
})
export class OpenAIProviderModule {}
