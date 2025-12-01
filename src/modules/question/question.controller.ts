import { Controller, Get, Post, Put, Delete, Body, Param, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { QuestionService } from './question.service';

@Controller('api/questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  async getAllQuestions(@Res() res: Response) {
    const questions = await this.questionService.findAll();
    return res.json(questions);
  }

  @Get(':id')
  async getQuestionById(@Param('id') id: string, @Res() res: Response) {
    const question = await this.questionService.findOne(id);
    if (!question) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Question not found' });
    }
    return res.json(question);
  }

  @Get('questionnaire/:questionnaireId')
  async getQuestionsByQuestionnaire(@Param('questionnaireId') questionnaireId: string, @Res() res: Response) {
    const questions = await this.questionService.findByQuestionnaire(questionnaireId);
    return res.json(questions);
  }

  @Post()
  async createQuestion(@Body() body: any, @Res() res: Response) {
    const { content, order, type, questionnaireId } = body;
    const question = await this.questionService.create(
      content,
      order,
      type,
      questionnaireId
    );
    return res.status(HttpStatus.CREATED).json(question);
  }

  @Put(':id')
  async updateQuestion(
    @Param('id') id: string,
    @Body() body: any,
    @Res() res: Response
  ) {
    const { content, order, type } = body;
    const question = await this.questionService.update(
      id,
      content,
      order,
      type
    );
    if (!question) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Question not found' });
    }
    return res.json(question);
  }

  @Delete(':id')
  async deleteQuestion(@Param('id') id: string, @Res() res: Response) {
    const result = await this.questionService.delete(id);
    if (!result) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Question not found' });
    }
    return res.status(HttpStatus.NO_CONTENT).send();
  }

  // Option endpoints
  @Post(':questionId/options')
  async createOption(
    @Param('questionId') questionId: string,
    @Body() body: { content: string; value: number; order: number },
    @Res() res: Response
  ) {
    const { content, value, order } = body;
    const option = await this.questionService.createOption(
      content,
      value,
      order,
      questionId
    );
    return res.status(HttpStatus.CREATED).json(option);
  }

  @Put('options/:optionId')
  async updateOption(
    @Param('optionId') optionId: string,
    @Body() body: { content?: string; value?: number; order?: number },
    @Res() res: Response
  ) {
    const { content, value, order } = body;
    const option = await this.questionService.updateOption(
      optionId,
      content,
      value,
      order
    );
    if (!option) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Option not found' });
    }
    return res.json(option);
  }

  @Delete('options/:optionId')
  async deleteOption(@Param('optionId') optionId: string, @Res() res: Response) {
    const result = await this.questionService.deleteOption(optionId);
    if (!result) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Option not found' });
    }
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
