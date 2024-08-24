import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLE_YOUTUBE_DESCRIPTION } from 'libs/openai/consts';

export class GetIngredientsDto {
  @ApiProperty({
    description: 'youtube description that contains ingredients',
    example: '',
  })
  description: string;

  static mock(): GetIngredientsDto {
    return {
      description: EXAMPLE_YOUTUBE_DESCRIPTION,
    };
  }
}
