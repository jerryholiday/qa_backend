import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Question, QuestionDocument } from '../../schemas/question.schema';
import { Option, OptionDocument } from '../../schemas/option.schema';
import {
  Questionnaire,
  QuestionnaireDocument,
} from '../../schemas/questionnaire.schema';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name)
    private readonly questionModel: Model<QuestionDocument>,
    @InjectModel(Option.name)
    private readonly optionModel: Model<OptionDocument>,
    @InjectModel(Questionnaire.name)
    private readonly questionnaireModel: Model<QuestionnaireDocument>,
  ) {}

  async findAll(): Promise<QuestionDocument[]> {
    const questions = await this.questionModel
      .find()
      .populate('options')
      .populate('questionnaire')
      .exec();
    return questions;
  }

  async findOne(id: string | ObjectId): Promise<QuestionDocument | null> {
    const question = await this.questionModel
      .findById(id)
      .populate('options')
      .populate('questionnaire')
      .exec();
    return question;
  }

  async findByQuestionnaire(
    questionnaireId: string | ObjectId,
  ): Promise<QuestionDocument[]> {
    const questions = await this.questionModel
      .find({ questionnaire: questionnaireId })
      .populate('options')
      .sort({ order: 'asc' })
      .exec();
    return questions;
  }

  async create(
    content: string,
    order: number,
    type: string,
    questionnaireId: string | ObjectId,
  ): Promise<QuestionDocument> {
    const createdQuestion = new this.questionModel({
      content,
      order,
      type,
      questionnaire: questionnaireId,
    });
    const savedQuestion = await createdQuestion.save();

    // Add the question ID to the questionnaire's questions array
    await this.questionnaireModel
      .findByIdAndUpdate(
        questionnaireId,
        { $push: { questions: savedQuestion._id } },
        { new: true },
      )
      .exec();

    return savedQuestion;
  }

  async update(
    id: string | ObjectId,
    content?: string,
    order?: number,
    type?: string,
  ): Promise<QuestionDocument | null> {
    const updateData: Partial<QuestionDocument> = {};
    if (content) updateData.content = content;
    if (order !== undefined) updateData.order = order;
    if (type) updateData.type = type;

    const updatedQuestion = await this.questionModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    return updatedQuestion;
  }

  async delete(id: string | ObjectId): Promise<boolean> {
    // First delete all options for this question
    await this.optionModel.deleteMany({ question: id }).exec();
    const result = await this.questionModel.findByIdAndDelete(id).exec();
    return result !== null;
  }

  async createOption(
    content: string,
    value: number,
    order: number,
    questionId: string | ObjectId,
  ): Promise<OptionDocument> {
    const createdOption = new this.optionModel({
      content,
      value,
      order,
      question: questionId,
    });
    const savedOption = await createdOption.save();

    // Add the option ID to the question's options array
    await this.questionModel
      .findByIdAndUpdate(
        questionId,
        { $push: { options: savedOption._id } },
        { new: true },
      )
      .exec();

    return savedOption;
  }

  async updateOption(
    id: string | ObjectId,
    content?: string,
    value?: number,
    order?: number,
  ): Promise<OptionDocument | null> {
    const updateData: Partial<OptionDocument> = {};
    if (content) updateData.content = content;
    if (value !== undefined) updateData.value = value;
    if (order !== undefined) updateData.order = order;

    const updatedOption = await this.optionModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    return updatedOption;
  }

  async deleteOption(id: string | ObjectId): Promise<boolean> {
    const result = await this.optionModel.findByIdAndDelete(id).exec();
    return result !== null;
  }
}
