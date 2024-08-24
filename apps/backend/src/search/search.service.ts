import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SearchService {
  protected readonly logger = new Logger(this.constructor.name);

  health(): string {
    this.logger.log('Healthy!');
    return 'Healthy!';
  }
}
