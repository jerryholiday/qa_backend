import { Controller, Get, Post, Body, Param, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { TestResultService } from './test-result.service';

@Controller('api/test-results')
export class TestResultController {
  constructor(private readonly testResultService: TestResultService) {}

  @Get()
  async getAllTestResults(@Res() res: Response) {
    const testResults = await this.testResultService.findAll();
    return res.json(testResults);
  }

  @Get(':id')
  async getTestResultById(@Param('id') id: string, @Res() res: Response) {
    const testResult = await this.testResultService.findOne(parseInt(id));
    if (!testResult) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Test result not found' });
    }
    return res.json(testResult);
  }

  @Get('user/:userId')
  async getTestResultsByUserId(@Param('userId') userId: string, @Res() res: Response) {
    const testResults = await this.testResultService.findByUserId(userId);
    return res.json(testResults);
  }

  @Post('submit')
  async submitTest(@Body() body: any, @Res() res: Response) {
    const { userId, questionnaireId, answers } = body;
    const testResult = await this.testResultService.submitTest(
      userId,
      questionnaireId,
      answers
    );
    return res.status(HttpStatus.CREATED).json(testResult);
  }
}
