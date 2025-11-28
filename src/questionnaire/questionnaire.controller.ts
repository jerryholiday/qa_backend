import { Controller, Get, Post, Put, Delete, Body, Param, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { QuestionnaireService } from './questionnaire.service';

@Controller('api/questionnaires')
export class QuestionnaireController {
  constructor(private readonly questionnaireService: QuestionnaireService) {}

  @Get()
  async getAllQuestionnaires(@Res() res: Response) {
    const questionnaires = await this.questionnaireService.findAll();
    return res.json(questionnaires);
  }

  @Get('active')
  async getActiveQuestionnaires(@Res() res: Response) {
    const questionnaires = await this.questionnaireService.getActiveQuestionnaires();
    return res.json(questionnaires);
  }

  @Get(':id')
  async getQuestionnaireById(@Param('id') id: string, @Res() res: Response) {
    const questionnaire = await this.questionnaireService.findOne(parseInt(id));
    if (!questionnaire) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Questionnaire not found' });
    }
    return res.json(questionnaire);
  }

  @Post()
  async createQuestionnaire(@Body() body: any, @Res() res: Response) {
    const { title, description, coverImage, categoryId, totalQuestions } = body;
    const questionnaire = await this.questionnaireService.create(
      title,
      description,
      coverImage,
      categoryId,
      totalQuestions
    );
    return res.status(HttpStatus.CREATED).json(questionnaire);
  }

  @Put(':id')
  async updateQuestionnaire(
    @Param('id') id: string,
    @Body() body: any,
    @Res() res: Response
  ) {
    const { title, description, coverImage, categoryId, totalQuestions, isActive } = body;
    const questionnaire = await this.questionnaireService.update(
      parseInt(id),
      title,
      description,
      coverImage,
      categoryId,
      totalQuestions,
      isActive
    );
    if (!questionnaire) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Questionnaire not found' });
    }
    return res.json(questionnaire);
  }

  @Delete(':id')
  async deleteQuestionnaire(@Param('id') id: string, @Res() res: Response) {
    const result = await this.questionnaireService.remove(parseInt(id));
    if (!result) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: 'Questionnaire not found' });
    }
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
