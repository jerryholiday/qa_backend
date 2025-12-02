import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionnaireSchema } from '../../schemas/questionnaire.schema';
import { TestResultSchema } from '../../schemas/test-result.schema';
import { QuestionSchema } from '../../schemas/question.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Questionnaire', schema: QuestionnaireSchema },
      { name: 'TestResult', schema: TestResultSchema },
      { name: 'Question', schema: QuestionSchema },
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
