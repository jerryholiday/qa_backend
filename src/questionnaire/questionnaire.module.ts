import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Questionnaire } from '../entities/questionnaire.entity';
import { Question } from '../entities/question.entity';
import { Category } from '../entities/category.entity';
import { QuestionnaireController } from './questionnaire.controller';
import { QuestionnaireService } from './questionnaire.service';

@Module({
  imports: [TypeOrmModule.forFeature([Questionnaire, Question, Category])],
  controllers: [QuestionnaireController],
  providers: [QuestionnaireService],
})
export class QuestionnaireModule {}
