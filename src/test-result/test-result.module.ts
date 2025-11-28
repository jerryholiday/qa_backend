import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestResult } from '../entities/test-result.entity';
import { Answer } from '../entities/answer.entity';
import { Option } from '../entities/option.entity';
import { TestResultController } from './test-result.controller';
import { TestResultService } from './test-result.service';

@Module({
  imports: [TypeOrmModule.forFeature([TestResult, Answer, Option])],
  controllers: [TestResultController],
  providers: [TestResultService],
})
export class TestResultModule {}
