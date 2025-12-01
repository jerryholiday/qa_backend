import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TestResult, TestResultSchema } from '../../schemas/test-result.schema';
import { Answer, AnswerSchema } from '../../schemas/answer.schema';
import { Option, OptionSchema } from '../../schemas/option.schema';
import { TestResultController } from './test-result.controller';
import { TestResultService } from './test-result.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TestResult.name, schema: TestResultSchema },
      { name: Answer.name, schema: AnswerSchema },
      { name: Option.name, schema: OptionSchema }
    ])
  ],
  controllers: [TestResultController],
  providers: [TestResultService],
})
export class TestResultModule {}
