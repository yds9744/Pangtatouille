import { Controller, Get } from '@nestjs/common';
import { SystemService } from './system.service';
import { OpenAIService } from '../../libs/openai/openai.service';

@Controller('system')
export class SystemController {
  constructor(
    private readonly systemService: SystemService,
    private readonly openaiService: OpenAIService,
  ) {}

  @Get('health')
  health(): string {
    return this.systemService.health();
  }

  @Get('health/openai')
  openaiHealth(): string {
    if (this.openaiService.openai) {
      return 'OpenAI is healthy';
    } else {
      return 'OpenAI is not healthy';
    }
  }
}
