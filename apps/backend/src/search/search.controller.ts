import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { Video } from 'types/video';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('youtube')
  searchYoutube(@Query('query') query: string): Promise<Video[]> {
    return this.searchService.searchYoutube(query);
  }

  @Get()
  async search(@Query('keyword') keyword: string) {
    return await this.searchService.search(keyword);
  }
}
