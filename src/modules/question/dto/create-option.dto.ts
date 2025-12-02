import { ApiProperty } from '@nestjs/swagger';

export class CreateOptionDto {
  @ApiProperty({ description: '选项内容', example: '一种编程语言' })
  content: string;

  @ApiProperty({ description: '选项值', example: 1 })
  value: number;

  @ApiProperty({ description: '选项顺序', example: 1 })
  order: number;
}
