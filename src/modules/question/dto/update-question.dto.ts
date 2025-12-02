import { ApiProperty } from '@nestjs/swagger';

export class UpdateQuestionDto {
  @ApiProperty({ description: '问题内容', example: '什么是TypeScript？', required: false })
  content?: string;

  @ApiProperty({ description: '问题顺序', example: 1, required: false })
  order?: number;

  @ApiProperty({ description: '问题类型', example: 'single_choice', required: false })
  type?: string;
}
