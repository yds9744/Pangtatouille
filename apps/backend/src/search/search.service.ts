import { Product } from '@lib/database/product/product.entity';
import { Injectable, Logger } from '@nestjs/common';
import { searchRecipeVideo } from 'libs/search/youtube';
import { Video } from 'types/video';

@Injectable()
export class SearchService {
  protected readonly logger = new Logger(this.constructor.name);

  async searchRecipeVideoOnYoutube(query: string): Promise<Video[]> {
    const videos: Video[] = await searchRecipeVideo(query);
    return videos;
  }

  async search(keyword: string): Promise<Product[]> {
    const searchResult = await Product.searchBy({ name: keyword });
    return searchResult;
  }
}
