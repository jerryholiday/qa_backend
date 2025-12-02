import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { DashboardService } from './dashboard.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('dashboard')
@Controller('api/dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  @ApiOperation({ summary: '获取仪表盘统计数据' })
  @ApiResponse({ status: 200, description: '成功获取仪表盘统计数据' })
  async getDashboardStats(@Res() res: Response) {
    const stats = await this.dashboardService.getDashboardStats();
    return res.status(HttpStatus.OK).json(stats);
  }
}
