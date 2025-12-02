import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { QuestionService } from './question.service';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';

@ApiTags('questions')
@Controller('api/questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  @ApiOperation({ summary: '获取所有问题' })
  @ApiResponse({ status: 200, description: '成功获取所有问题' })
  async getAllQuestions(@Res() res: Response) {
    const questions = await this.questionService.findAll();
    return res.json(questions);
  }

  @Get(':id')
  @ApiOperation({ summary: '根据ID获取问题' })
  @ApiParam({
    name: 'id',
    description: '问题ID',
    example: '60d0fe4f5311236168a109ca',
  })
  @ApiResponse({ status: 200, description: '成功获取问题' })
  @ApiResponse({ status: 404, description: '问题不存在' })
  async getQuestionById(@Param('id') id: string, @Res() res: Response) {
    const question = await this.questionService.findOne(id);
    if (!question) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Question not found' });
    }
    return res.json(question);
  }

  @Get('questionnaire/:questionnaireId')
  @ApiOperation({ summary: '根据问卷ID获取问题列表' })
  @ApiParam({
    name: 'questionnaireId',
    description: '问卷ID',
    example: '60d0fe4f5311236168a109cb',
  })
  @ApiResponse({ status: 200, description: '成功获取问题列表' })
  async getQuestionsByQuestionnaire(
    @Param('questionnaireId') questionnaireId: string,
    @Res() res: Response,
  ) {
    const questions =
      await this.questionService.findByQuestionnaire(questionnaireId);
    return res.json(questions);
  }

  @Post()
  @ApiOperation({ summary: '创建新问题' })
  @ApiBody({ type: CreateQuestionDto })
  @ApiResponse({ status: 201, description: '成功创建问题' })
  async createQuestion(
    @Body() createQuestionDto: CreateQuestionDto,
    @Res() res: Response,
  ) {
    const { content, order, type, questionnaireId } = createQuestionDto;
    const question = await this.questionService.create(
      content,
      order,
      type,
      questionnaireId,
    );
    return res.status(HttpStatus.CREATED).json(question);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新问题' })
  @ApiParam({
    name: 'id',
    description: '问题ID',
    example: '60d0fe4f5311236168a109ca',
  })
  @ApiBody({ type: UpdateQuestionDto })
  @ApiResponse({ status: 200, description: '成功更新问题' })
  @ApiResponse({ status: 404, description: '问题不存在' })
  async updateQuestion(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
    @Res() res: Response,
  ) {
    const { content, order, type } = updateQuestionDto;
    const question = await this.questionService.update(
      id,
      content,
      order,
      type,
    );
    if (!question) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Question not found' });
    }
    return res.json(question);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除问题' })
  @ApiParam({
    name: 'id',
    description: '问题ID',
    example: '60d0fe4f5311236168a109ca',
  })
  @ApiResponse({ status: 204, description: '成功删除问题' })
  @ApiResponse({ status: 404, description: '问题不存在' })
  async deleteQuestion(@Param('id') id: string, @Res() res: Response) {
    const result = await this.questionService.delete(id);
    if (!result) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Question not found' });
    }
    return res.status(HttpStatus.NO_CONTENT).send();
  }

  // Option endpoints
  @Post(':questionId/options')
  @ApiOperation({ summary: '为问题创建新选项' })
  @ApiParam({
    name: 'questionId',
    description: '问题ID',
    example: '60d0fe4f5311236168a109ca',
  })
  @ApiBody({ type: CreateOptionDto })
  @ApiResponse({ status: 201, description: '成功创建选项' })
  async createOption(
    @Param('questionId') questionId: string,
    @Body() createOptionDto: CreateOptionDto,
    @Res() res: Response,
  ) {
    const { content, value, order } = createOptionDto;
    const option = await this.questionService.createOption(
      content,
      value,
      order,
      questionId,
    );
    return res.status(HttpStatus.CREATED).json(option);
  }

  @Put('options/:optionId')
  @ApiOperation({ summary: '更新选项' })
  @ApiParam({
    name: 'optionId',
    description: '选项ID',
    example: '60d0fe4f5311236168a109cd',
  })
  @ApiBody({ type: UpdateOptionDto })
  @ApiResponse({ status: 200, description: '成功更新选项' })
  @ApiResponse({ status: 404, description: '选项不存在' })
  async updateOption(
    @Param('optionId') optionId: string,
    @Body() updateOptionDto: UpdateOptionDto,
    @Res() res: Response,
  ) {
    const { content, value, order } = updateOptionDto;
    const option = await this.questionService.updateOption(
      optionId,
      content,
      value,
      order,
    );
    if (!option) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Option not found' });
    }
    return res.json(option);
  }

  @Delete('options/:optionId')
  @ApiOperation({ summary: '删除选项' })
  @ApiParam({
    name: 'optionId',
    description: '选项ID',
    example: '60d0fe4f5311236168a109cd',
  })
  @ApiResponse({ status: 204, description: '成功删除选项' })
  @ApiResponse({ status: 404, description: '选项不存在' })
  async deleteOption(
    @Param('optionId') optionId: string,
    @Res() res: Response,
  ) {
    const result = await this.questionService.deleteOption(optionId);
    if (!result) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Option not found' });
    }
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
