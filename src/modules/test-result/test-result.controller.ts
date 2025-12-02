import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { TestResultService } from './test-result.service';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { SubmitTestDto } from './dto/submit-test.dto';

@ApiTags('test-results')
@Controller('api/test-results')
export class TestResultController {
  constructor(private readonly testResultService: TestResultService) {}

  @Get()
  @ApiOperation({ summary: '获取所有测试结果' })
  @ApiResponse({ status: 200, description: '成功获取所有测试结果' })
  async getAllTestResults(@Res() res: Response) {
    const testResults = await this.testResultService.findAll();
    return res.json(testResults);
  }

  @Get(':id')
  @ApiOperation({ summary: '根据ID获取测试结果' })
  @ApiParam({
    name: 'id',
    description: '测试结果ID',
    example: '60d0fe4f5311236168a109ca',
  })
  @ApiResponse({ status: 200, description: '成功获取测试结果' })
  @ApiResponse({ status: 404, description: '测试结果不存在' })
  async getTestResultById(@Param('id') id: string, @Res() res: Response) {
    const testResult = await this.testResultService.findOne(id);
    if (!testResult) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Test result not found' });
    }
    return res.json(testResult);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: '根据用户ID获取测试结果列表' })
  @ApiParam({
    name: 'userId',
    description: '用户ID',
    example: '60d0fe4f5311236168a109ca',
  })
  @ApiResponse({ status: 200, description: '成功获取测试结果列表' })
  async getTestResultsByUserId(
    @Param('userId') userId: string,
    @Res() res: Response,
  ) {
    const testResults = await this.testResultService.findByUserId(userId);
    return res.json(testResults);
  }

  @Post('submit')
  @ApiOperation({ summary: '提交测试结果' })
  @ApiBody({ type: SubmitTestDto })
  @ApiResponse({ status: 201, description: '成功提交测试结果' })
  async submitTest(@Body() submitTestDto: SubmitTestDto, @Res() res: Response) {
    const { userId, questionnaireId, answers } = submitTestDto;
    const testResult = await this.testResultService.submitTest(
      userId,
      questionnaireId,
      answers,
    );
    return res.status(HttpStatus.CREATED).json(testResult);
  }
}
