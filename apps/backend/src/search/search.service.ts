import { Product } from '@lib/database/product/product.entity';
import { Injectable, Logger } from '@nestjs/common';
import { Video } from 'types/video';
import * as yt from 'youtube-search-without-api-key';

@Injectable()
export class SearchService {
  protected readonly logger = new Logger(this.constructor.name);

  async searchYoutube(query: string): Promise<Video[]> {
    const videos: Video[] = await yt.search(query);
    this.logger.log(`Found videos: ${JSON.stringify(videos, null, 2)}`);
    return videos;
  }

  async search(keyword: string): Promise<Product[]> {
    const searchResult = await Product.searchBy({ name: keyword });
    return searchResult;
  }
}
