import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ description: '用户名', example: 'admin', required: false })
  username?: string;

  @ApiProperty({ description: '密码', example: 'password', required: false })
  password?: string;

  @ApiProperty({ description: '用户角色', example: 'admin', required: false })
  role?: string;
}
