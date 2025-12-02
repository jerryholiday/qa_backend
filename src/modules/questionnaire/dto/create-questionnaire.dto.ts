import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionnaireDto {
  @ApiProperty({ description: '问卷标题', example: '技术知识测试' })
  title: string;

  @ApiProperty({
    description: '问卷描述',
    example: '测试您的技术知识水平',
    required: true,
  })
  description: string;

  @ApiProperty({
    description: '问卷封面图片',
    example: 'https://example.com/cover.jpg',
    required: true,
  })
  coverImage: string;

  @ApiProperty({ description: '分类ID', example: '60d0fe4f5311236168a109ca' })
  categoryId: string;

  @ApiProperty({ description: '总题目数', example: 10 })
  totalQuestions: number;
}
