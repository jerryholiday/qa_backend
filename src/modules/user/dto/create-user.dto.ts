import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: '用户名', example: 'admin' })
  username: string;

  @ApiProperty({ description: '密码', example: 'password' })
  password: string;

  @ApiProperty({ description: '用户角色', example: 'user', default: 'user', required: false })
  role?: string;
}
