import { Global, Module } from '@nestjs/common';
import { OpenAIProviderModule } from '../../libs/openai/openai.module';
import { OpenAIService } from '../../libs/openai/openai.service';

@Global()
@Module({
  imports: [OpenAIProviderModule],
  providers: [OpenAIService],
  exports: [OpenAIService],
})
export class GlobalModule {}
