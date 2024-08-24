import { ApiProperty } from '@nestjs/swagger';
import {
  EXAMPLE_YOUTUBE_DESCRIPTION_EN,
  EXAMPLE_YOUTUBE_DESCRIPTION_KO,
} from 'libs/openai/consts';

export class GetIngredientsDto {
  @ApiProperty({
    description: 'youtube description that contains ingredients',
    example: '',
  })
  description: string;

  static mockEn(): GetIngredientsDto {
    return {
      description: EXAMPLE_YOUTUBE_DESCRIPTION_EN,
    };
  }

  static mockKo(): GetIngredientsDto {
    return {
      description: EXAMPLE_YOUTUBE_DESCRIPTION_KO,
    };
  }
}
