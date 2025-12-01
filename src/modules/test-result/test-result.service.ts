import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import {
  TestResult,
  TestResultDocument,
} from '../../schemas/test-result.schema';
import { Answer, AnswerDocument } from '../../schemas/answer.schema';
import { Option, OptionDocument } from '../../schemas/option.schema';

@Injectable()
export class TestResultService {
  constructor(
    @InjectModel(TestResult.name)
    private readonly testResultModel: Model<TestResultDocument>,
    @InjectModel(Answer.name)
    private readonly answerModel: Model<AnswerDocument>,
    @InjectModel(Option.name)
    private readonly optionModel: Model<OptionDocument>,
  ) {}

  async findAll(): Promise<TestResultDocument[]> {
    const results = await this.testResultModel
      .find()
      .populate('questionnaire')
      .populate({ path: 'answers', populate: ['question', 'option'] })
      .exec();
    return results;
  }

  async findOne(id: string | ObjectId): Promise<TestResultDocument | null> {
    const result = await this.testResultModel
      .findById(id)
      .populate({
        path: 'answers',
        populate: { path: 'option', populate: 'question' },
      })
      .exec();
    return result;
  }

  async findByUserId(userId: string): Promise<TestResultDocument[]> {
    const results = await this.testResultModel
      .find({ userId })
      .populate('questionnaire')
      .exec();
    return results;
  }

  async submitTest(
    userId: string,
    questionnaireId: string | ObjectId,
    answers: {
      questionId: string | ObjectId;
      optionId: string | ObjectId;
    }[],
  ): Promise<TestResultDocument> {
    // Calculate total score
    let totalScore = 0;
    for (const answer of answers) {
      const option = await this.optionModel.findById(answer.optionId).exec();
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
    const createdTestResult = new this.testResultModel({
      userId,
      totalScore,
      resultText,
      questionnaire: questionnaireId,
    });
    const savedTestResult = await createdTestResult.save();

    // Create answers
    for (const answer of answers) {
      const newAnswer = new this.answerModel({
        testResult: savedTestResult._id,
        question: answer.questionId,
        option: answer.optionId,
      });
      await newAnswer.save();
    }

    return savedTestResult;
  }
}
