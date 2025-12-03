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
import { Types } from 'mongoose';
import { QuestionnaireService } from './questionnaire.service';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { UpdateQuestionnaireDto } from './dto/update-questionnaire.dto';

@ApiTags('questionnaires')
@Controller('api/questionnaires')
export class QuestionnaireController {
  constructor(private readonly questionnaireService: QuestionnaireService) {}

  @Get()
  @ApiOperation({ summary: '获取所有问卷' })
  @ApiResponse({ status: 200, description: '成功获取所有问卷' })
  async getAllQuestionnaires(@Res() res: Response) {
    const questionnaires = await this.questionnaireService.findAll();
    return res.json(questionnaires);
  }

  @Get('active')
  @ApiOperation({ summary: '获取所有激活的问卷' })
  @ApiResponse({ status: 200, description: '成功获取所有激活的问卷' })
  async getActiveQuestionnaires(@Res() res: Response) {
    const questionnaires =
      await this.questionnaireService.getActiveQuestionnaires();
    return res.json(questionnaires);
  }

  @Get(':id')
  @ApiOperation({ summary: '根据ID获取问卷' })
  @ApiParam({
    name: 'id',
    description: '问卷ID',
    example: '60d0fe4f5311236168a109ca',
  })
  @ApiResponse({ status: 200, description: '成功获取问卷' })
  @ApiResponse({ status: 404, description: '问卷不存在' })
  async getQuestionnaireById(@Param('id') id: string, @Res() res: Response) {
    const questionnaire = await this.questionnaireService.findOne(id);
    if (!questionnaire) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Questionnaire not found' });
    }
    return res.json(questionnaire);
  }

  @Post()
  @ApiOperation({ summary: '创建新问卷' })
  @ApiBody({ type: CreateQuestionnaireDto })
  @ApiResponse({ status: 201, description: '成功创建问卷' })
  async createQuestionnaire(
    @Body() createQuestionnaireDto: CreateQuestionnaireDto,
    @Res() res: Response,
  ) {
    const { title, description, coverImage, categoryId, totalQuestions } =
      createQuestionnaireDto;
    const questionnaire = await this.questionnaireService.create(
      title,
      description,
      coverImage,
      new Types.ObjectId(categoryId), // 将字符串转换为 ObjectId
      totalQuestions,
    );
    return res.status(HttpStatus.CREATED).json(questionnaire);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新问卷' })
  @ApiParam({
    name: 'id',
    description: '问卷ID',
    example: '60d0fe4f5311236168a109ca',
  })
  @ApiBody({ type: UpdateQuestionnaireDto })
  @ApiResponse({ status: 200, description: '成功更新问卷' })
  @ApiResponse({ status: 404, description: '问卷不存在' })
  async updateQuestionnaire(
    @Param('id') id: string,
    @Body() updateQuestionnaireDto: UpdateQuestionnaireDto,
    @Res() res: Response,
  ) {
    const {
      title,
      description,
      coverImage,
      categoryId,
      totalQuestions,
      isActive,
    } = updateQuestionnaireDto;
    const questionnaire = await this.questionnaireService.update(
      id,
      title,
      description,
      coverImage,
      categoryId ? new Types.ObjectId(categoryId) : undefined, // 将字符串转换为 ObjectId
      totalQuestions,
      isActive,
    );
    if (!questionnaire) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Questionnaire not found' });
    }
    return res.json(questionnaire);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除问卷' })
  @ApiParam({
    name: 'id',
    description: '问卷ID',
    example: '60d0fe4f5311236168a109ca',
  })
  @ApiResponse({ status: 204, description: '成功删除问卷' })
  @ApiResponse({ status: 404, description: '问卷不存在' })
  async deleteQuestionnaire(@Param('id') id: string, @Res() res: Response) {
    const result = await this.questionnaireService.remove(id);
    if (!result) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Questionnaire not found' });
    }
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
