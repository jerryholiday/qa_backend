import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestResult } from '../entities/test-result.entity';
import { Answer } from '../entities/answer.entity';
import { Option } from '../entities/option.entity';

@Injectable()
export class TestResultService {
  constructor(
    @InjectRepository(TestResult) private readonly testResultRepository: Repository<TestResult>,
    @InjectRepository(Answer) private readonly answerRepository: Repository<Answer>,
    @InjectRepository(Option) private readonly optionRepository: Repository<Option>,
  ) {}

  async findAll(): Promise<TestResult[]> {
    return this.testResultRepository.find({
      relations: ['questionnaire', 'answers', 'answers.question', 'answers.option'],
    });
  }

  async findOne(id: number): Promise<TestResult | undefined> {
    return this.testResultRepository.findOne({
      where: { id },
      relations: ['answers', 'answers.option', 'answers.option.question', 'user'],
    }) as Promise<TestResult | undefined>;
  }

  async findByUserId(userId: string): Promise<TestResult[]> {
    return this.testResultRepository.find({
      where: { userId },
      relations: ['questionnaire'],
    });
  }

  async submitTest(
    userId: string,
    questionnaireId: number,
    answers: { questionId: number; optionId: number }[]
  ): Promise<TestResult> {
    // Calculate total score
    let totalScore = 0;
    for (const answer of answers) {
      const option = await this.optionRepository.findOne({ where: { id: answer.optionId } });
      if (option) {
        totalScore += option.value;
      }
    }

    // Determine result text based on score (simplified for now)
    let resultText = '';
    if (totalScore < 50) {
      resultText = '低分组：你具有内向、谨慎的性格特点。';
    } else if (totalScore < 100) {
      resultText = '中分组：你具有平衡、适中的性格特点。';
    } else {
      resultText = '高分组：你具有外向、积极的性格特点。';
    }

    // Create test result
    const testResult = this.testResultRepository.create({
      userId,
      totalScore,
      resultText,
      questionnaire: { id: questionnaireId },
    });
    const savedTestResult = await this.testResultRepository.save(testResult);

    // Create answers
    for (const answer of answers) {
      const newAnswer = this.answerRepository.create({
        testResult: savedTestResult,
        question: { id: answer.questionId },
        option: { id: answer.optionId },
      });
      await this.answerRepository.save(newAnswer);
    }

    return savedTestResult;
  }
}
