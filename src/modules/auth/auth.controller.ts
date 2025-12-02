import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: '用户登录' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: '登录成功',
    schema: {
      example: {
        user: {
          id: '60d0fe4f5311236168a109ca',
          username: 'admin',
          role: 'admin',
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: '无效的凭证' })
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const { username, password } = loginDto;
    const user = await this.authService.findByUsername(username);

    if (!user || user.password !== password) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Invalid credentials' });
    }

    return res.json({
      user: { id: user.id, username: user.username, role: user.role },
    });
  }
}
