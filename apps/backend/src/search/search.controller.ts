import { Controller, Get, Logger, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { Video } from 'types/video';
import { OpenAIService } from 'libs/openai/openai.service';
import { mockSearchVideoResponse } from 'src/search/mock.response';
import axios from 'axios';
import { load } from 'cheerio';
import { ProductPackage } from 'types/product-package';
import { PRODUCT_PACKAGE_MOCK } from 'libs/const/product-package.mock';

@Controller('search')
export class SearchController {
  protected readonly logger = new Logger(this.constructor.name);

  constructor(
    private readonly searchService: SearchService,
    private readonly openaiService: OpenAIService,
  ) {}

  @Get('product-package/youtube/mock')
  async searchProductPackageOnYoutubeMock(
    @Query('query') query: string,
  ): Promise<ProductPackage[]> {
    // mimic 3 seconds delay
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return PRODUCT_PACKAGE_MOCK;
  }

  @Get('product-package/youtube')
  async searchProductPackageOnYoutube(
    @Query('query') query: string,
  ): Promise<ProductPackage[]> {
    return await this.searchService.getProductPackage(query);
  }

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

  @Get('ingredient')
  async searchByIngredient(@Query('keyword') keyword: string) {
    return await this.searchService.searchByIngredients(
      PRODUCT_PACKAGE_MOCK[0].ingredients,
    );
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

    const finals = await Promise.all(
      items.map(async (item) => {
        const url = 'https://www.10000recipe.com' + item;
        const response2 = await axios.get(url);

        const html2 = response2.data;
        const $2 = load(html2);
        const img_url = $2('#main_thumbs').attr()['src'];
        const title = $2('.view2_summary.st3').children('h3').text();
        const ingredients = [];
        const recipes = [];
        const steps = [];
        const ingreList = $2('#divConfirmedMaterialArea')
          .children('ul')
          .children('li');
        ingreList.each((index, list) => {
          const ingre = $2(list)
            .children('.ingre_list_name')
            .children('a')
            .text()
            .trim();
          const ea = $2(list).children('.ingre_list_ea').text().trim();
          let end = -1;
          // 숫자의 처음부터 끝까지를 amount로 넣지
          const regex = /[^0-9]/g;
          for (let i = 0; i < ea.length; i++) {
            if (ea[i].replace(regex, '').length == 1) end = i;
          }
          let amount = '';
          let unit = '';
          if (end == -1) {
            amount = '';
            unit = ea;
          } else {
            amount = ea.substring(0, end + 1);
            unit = ea.substring(end + 1);
          }
          ingredients[index] = {
            name: ingre,
            amount: amount,
            unit: ea,
          };
        });

        const recipeList = $2('#obx_recipe_step_start').children(
          '.view_step_cont.media',
        );
        recipeList.each((index, list) => {
          const recipe = $2(list).children('.media-body').text().trim();
          steps[index] = {
            step: index,
            description: recipe,
          };
        });

        const products = await this.searchService.searchByIngredients(
          ingredients,
        );
        const data = {
          url: img_url,
          title: title,
          ingredients: ingredients,
          recipe: steps,
          products,
        };
        return data;
      }),
    );
    console.log(finals);
  }
}
