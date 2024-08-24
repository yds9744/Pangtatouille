import { Injectable, Logger } from '@nestjs/common';
import * as yt from 'youtube-search-without-api-key';

@Injectable()
export class SearchService {
  protected readonly logger = new Logger(this.constructor.name);

  async searchYoutube(query: string): Promise<string> {
    const videos = await yt.search(query);
    this.logger.log(`Found videos: ${JSON.stringify(videos, null, 2)}`);
    return 'Healthy!';
  }
}
