import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }, @Res() res: Response) {
    const { username, password } = body;
    const user = await this.authService.findByUsername(username);

    if (!user || user.password !== password) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid credentials' });
    }

    return res.json({ user: { id: user.id, username: user.username, role: user.role } });
  }
}
