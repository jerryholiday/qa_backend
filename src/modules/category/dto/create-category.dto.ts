import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ description: '分类名称', example: '技术' })
  name: string;

  @ApiProperty({ description: '分类描述', example: '技术相关的问卷', required: false })
  description?: string;
}
