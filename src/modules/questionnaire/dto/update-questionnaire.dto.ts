import { ApiProperty } from '@nestjs/swagger';

export class UpdateQuestionnaireDto {
  @ApiProperty({ description: '问卷标题', example: '技术知识测试', required: false })
  title?: string;

  @ApiProperty({ description: '问卷描述', example: '测试您的技术知识水平', required: false })
  description?: string;

  @ApiProperty({ description: '问卷封面图片', example: 'https://example.com/cover.jpg', required: false })
  coverImage?: string;

  @ApiProperty({ description: '分类ID', example: '60d0fe4f5311236168a109ca', required: false })
  categoryId?: string;

  @ApiProperty({ description: '总题目数', example: 10, required: false })
  totalQuestions?: number;

  @ApiProperty({ description: '是否激活', example: true, required: false })
  isActive?: boolean;
}
