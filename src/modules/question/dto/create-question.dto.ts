import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto {
  @ApiProperty({ description: '问题内容', example: '什么是TypeScript？' })
  content: string;

  @ApiProperty({ description: '问题顺序', example: 1 })
  order: number;

  @ApiProperty({ description: '问题类型', example: 'single_choice' })
  type: string;

  @ApiProperty({ description: '问卷ID', example: '60d0fe4f5311236168a109ca' })
  questionnaireId: string;
}
