import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiProperty({ description: '分类名称', example: '技术', required: false })
  name?: string;

  @ApiProperty({ description: '分类描述', example: '技术相关的问卷', required: false })
  description?: string;
}
