import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Questionnaire } from '../entities/questionnaire.entity';
import { Question } from '../entities/question.entity';
import { Category } from '../entities/category.entity';

@Injectable()
export class QuestionnaireService {
  constructor(
    @InjectRepository(Questionnaire)
    private readonly questionnaireRepository: Repository<Questionnaire>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Questionnaire[]> {
    return this.questionnaireRepository.find({
      relations: ['category', 'questions'],
    });
  }

  async findOne(id: number): Promise<Questionnaire | undefined> {
    return this.questionnaireRepository.findOne({
      where: { id },
      relations: ['category', 'questions', 'questions.options'],
    }) as Promise<Questionnaire | undefined>;
  }

  async create(
    title: string,
    description: string,
    coverImage: string,
    categoryId: number,
    totalQuestions: number,
  ): Promise<Questionnaire> {
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });

    const questionnaire = this.questionnaireRepository.create({
      title,
      description,
      coverImage,
      totalQuestions,
      category: category || { id: categoryId },
    });
    return this.questionnaireRepository.save(questionnaire);
  }

  async update(
    id: number,
    title?: string,
    description?: string,
    coverImage?: string,
    categoryId?: number,
    totalQuestions?: number,
    isActive?: boolean,
  ): Promise<Questionnaire | undefined> {
    const questionnaire = await this.findOne(id);
    if (!questionnaire) return undefined;

    if (title) questionnaire.title = title;
    if (description !== undefined) questionnaire.description = description;
    if (coverImage) questionnaire.coverImage = coverImage;
    if (categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: categoryId },
      });
      if (category) questionnaire.category = category;
    }
    if (totalQuestions !== undefined)
      questionnaire.totalQuestions = totalQuestions;
    if (isActive !== undefined) questionnaire.isActive = isActive;

    return this.questionnaireRepository.save(questionnaire);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.questionnaireRepository.delete(id);
    return (
      result.affected !== null &&
      result.affected !== undefined &&
      result.affected > 0
    );
  }

  async getActiveQuestionnaires(): Promise<Questionnaire[]> {
    return this.questionnaireRepository.find({
      where: { isActive: true },
      relations: ['category'],
    });
  }
}
