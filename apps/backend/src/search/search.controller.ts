import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { OpenAIService } from '../../libs/openai/openai.service';

@Controller('search')
export class SearchController {
  constructor(
    private readonly searchService: SearchService,
    private readonly openaiService: OpenAIService,
  ) {}

  @Get('youtube')
  searchYoutube(@Query('query') query: string): Promise<string> {
    return this.searchService.searchYoutube(query);
  }

  @Get()
  async search(@Query('keyword') keyword: string) {
    return await this.searchService.search(keyword);
  }
}
