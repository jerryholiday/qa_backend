import { ApiProperty } from '@nestjs/swagger';

export class UpdateOptionDto {
  @ApiProperty({ description: '选项内容', example: '一种编程语言', required: false })
  content?: string;

  @ApiProperty({ description: '选项值', example: 1, required: false })
  value?: number;

  @ApiProperty({ description: '选项顺序', example: 1, required: false })
  order?: number;
}
