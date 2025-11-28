import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../entities/question.entity';
import { Option } from '../entities/option.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
  ) {}

  async findAll(): Promise<Question[]> {
    return this.questionRepository.find({
      relations: ['options', 'questionnaire'],
    });
  }

  async findOne(id: number): Promise<Question | undefined> {
    return this.questionRepository.findOne({
      where: { id },
      relations: ['options', 'questionnaire'],
    }) as Promise<Question | undefined>;
  }

  async findByQuestionnaire(questionnaireId: number): Promise<Question[]> {
    return this.questionRepository.find({
      where: { questionnaire: { id: questionnaireId } },
      relations: ['options'],
      order: { order: 'ASC' },
    });
  }

  async create(
    content: string,
    order: number,
    type: string,
    questionnaireId: number,
  ): Promise<Question> {
    const question = this.questionRepository.create({
      content,
      order,
      type,
      questionnaire: { id: questionnaireId },
    });
    return this.questionRepository.save(question);
  }

  async update(
    id: number,
    content?: string,
    order?: number,
    type?: string,
  ): Promise<Question | undefined> {
    const question = await this.findOne(id);
    if (!question) return undefined;

    if (content) question.content = content;
    if (order !== undefined) question.order = order;
    if (type) question.type = type;

    return this.questionRepository.save(question);
  }

  async delete(id: number): Promise<boolean> {
    // First delete all options for this question
    await this.optionRepository.delete({ question: { id } });
    const result = await this.questionRepository.delete(id);
    return (
      result.affected !== null &&
      result.affected !== undefined &&
      result.affected > 0
    );
  }

  async createOption(
    content: string,
    value: number,
    order: number,
    questionId: number,
  ): Promise<Option> {
    const option = this.optionRepository.create({
      content,
      value,
      order,
      question: { id: questionId },
    });
    return this.optionRepository.save(option);
  }

  async updateOption(
    id: number,
    content?: string,
    value?: number,
    order?: number,
  ): Promise<Option | undefined> {
    const option = await this.optionRepository.findOne({ where: { id } });
    if (!option) return undefined;

    if (content) option.content = content;
    if (value !== undefined) option.value = value;
    if (order !== undefined) option.order = order;

    return this.optionRepository.save(option);
  }

  async deleteOption(id: number): Promise<boolean> {
    const result = await this.optionRepository.delete(id);
    return (
      result.affected !== null &&
      result.affected !== undefined &&
      result.affected > 0
    );
  }
}
