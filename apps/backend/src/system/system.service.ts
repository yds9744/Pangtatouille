import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SystemService {
  protected readonly logger = new Logger(this.constructor.name);

  health(): string {
    this.logger.log('Healthy!');
    return 'Healthy!';
  }
}
