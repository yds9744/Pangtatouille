import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { OpenAIService } from '../../libs/openai/openai.service';

@Controller('search')
export class SearchController {
  constructor(
    private readonly systemService: SearchService,
    private readonly openaiService: OpenAIService,
  ) {}

  @Get()
  search(@Query('query') query: string): Promise<string> {
    return this.systemService.searchYoutube(query);
  }
}
