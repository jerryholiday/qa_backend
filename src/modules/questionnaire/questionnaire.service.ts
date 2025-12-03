import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  Questionnaire,
  QuestionnaireDocument,
} from '../../schemas/questionnaire.schema';
import { Question, QuestionDocument } from '../../schemas/question.schema';
import { Category, CategoryDocument } from '../../schemas/category.schema';

@Injectable()
export class QuestionnaireService {
  constructor(
    @InjectModel(Questionnaire.name)
    private readonly questionnaireModel: Model<QuestionnaireDocument>,
    @InjectModel(Question.name)
    private readonly questionModel: Model<QuestionDocument>,
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async findAll(): Promise<QuestionnaireDocument[]> {
    const questionnaires = await this.questionnaireModel
      .find()
      .populate('category')
      .populate('questions')
      .exec();
    return questionnaires;
  }

  async findOne(
    id: string | Types.ObjectId,
  ): Promise<QuestionnaireDocument | null> {
    const questionnaire = await this.questionnaireModel
      .findById(id)
      .populate('category')
      .populate({ path: 'questions', populate: 'options' })
      .exec();
    return questionnaire;
  }

  async create(
    title: string,
    description: string,
    coverImage: string,
    categoryId: string | Types.ObjectId,
    totalQuestions: number,
  ): Promise<QuestionnaireDocument> {
    const createdQuestionnaire = new this.questionnaireModel({
      title,
      description,
      coverImage,
      totalQuestions,
      category: categoryId,
    });
    const savedQuestionnaire = await createdQuestionnaire.save();
    return savedQuestionnaire;
  }

  async update(
    id: string | Types.ObjectId,
    title?: string,
    description?: string,
    coverImage?: string,
    categoryId?: string | Types.ObjectId,
    totalQuestions?: number,
    isActive?: boolean,
  ): Promise<QuestionnaireDocument | null> {
    const updateData: Partial<QuestionnaireDocument> = {};
    if (title) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (coverImage) updateData.coverImage = coverImage;
    if (categoryId) {
      // 确保categoryId是ObjectId类型
      updateData.category =
        typeof categoryId === 'string'
          ? new Types.ObjectId(categoryId)
          : categoryId;
    }
    if (totalQuestions !== undefined)
      updateData.totalQuestions = totalQuestions;
    if (isActive !== undefined) updateData.isActive = isActive;

    const updatedQuestionnaire = await this.questionnaireModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    return updatedQuestionnaire;
  }

  async remove(id: string | Types.ObjectId): Promise<boolean> {
    // 使用findOneAndDelete处理非ObjectId格式的id
    const result = await this.questionnaireModel
      .findOneAndDelete({
        _id: id,
      })
      .exec();
    return result !== null;
  }

  async getActiveQuestionnaires(): Promise<QuestionnaireDocument[]> {
    const activeQuestionnaires = await this.questionnaireModel
      .find({ isActive: true })
      .populate('category')
      .exec();
    return activeQuestionnaires;
  }
}
