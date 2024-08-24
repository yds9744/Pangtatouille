import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { Video } from 'types/video';
import { OpenAIService } from 'libs/openai/openai.service';
import { mockSearchVideoResponse } from 'src/search/mock.response';
import axios from 'axios';
import { load } from 'cheerio';
@Controller('search')
export class SearchController {
  constructor(
    private readonly searchService: SearchService,
    private readonly openaiService: OpenAIService,
  ) {}

  @Get('recipe/youtube/mock')
  async searchRecipeOnYoutubeMock(
    @Query('query') query: string,
  ): Promise<Video[]> {
    return mockSearchVideoResponse;
  }

  @Get('recipe/youtube')
  async searchRecipeOnYoutube(@Query('query') query: string): Promise<Video[]> {
    const videos = await this.searchService.searchRecipeVideoOnYoutube(query);
    const recipeVideos = await Promise.all(
      videos.map(async (video) => {
        const isRecipe = await this.openaiService.isRecipe(video.description);
        return { ...video, isRecipe };
      }),
    );

    return recipeVideos.filter((video) => video.isRecipe);
  }

  @Get()
  async search(@Query('keyword') keyword: string) {
    return await this.searchService.search(keyword);
  }

  @Get('recipe/10000recipe')
  async searchRecipeOn10000Recipe(@Query('keyword') keyword: string) {
    // keyword를 받으면
    // url을 파싱한다.
    const urlList = 'https://www.10000recipe.com/recipe/list.html?q=' + keyword;
    const response = await axios.get(urlList);
    const html = response.data;
    const $ = load(html);
    const lists = $('ul.common_sp_list_ul').children('li.common_sp_list_li');
    const items = [];
    lists.each((index, list) => {
      if (index < 5) {
        items[index] = $(list).find('a.common_sp_link').attr()['href'];
      }
    });

    const url = 'https://www.10000recipe.com' + items[0];
    const response2 = await axios.get(url);
    console.log(response2.status);
    const html2 = response2.data;
    const $2 = load(html2);
    const img_url = $2('#main_thumbs').attr()['src'];
    const ingreList = $2('.ready_ingre3').children('li');
    ingreList.each((index, list) => {});
  }
}
