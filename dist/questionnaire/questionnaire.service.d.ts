import { Repository } from 'typeorm';
import { Questionnaire } from '../entities/questionnaire.entity';
import { Question } from '../entities/question.entity';
import { Category } from '../entities/category.entity';
export declare class QuestionnaireService {
    private readonly questionnaireRepository;
    private readonly questionRepository;
    private readonly categoryRepository;
    constructor(questionnaireRepository: Repository<Questionnaire>, questionRepository: Repository<Question>, categoryRepository: Repository<Category>);
    findAll(): Promise<Questionnaire[]>;
    findOne(id: number): Promise<Questionnaire | undefined>;
    create(title: string, description: string, coverImage: string, categoryId: number, totalQuestions: number): Promise<Questionnaire>;
    update(id: number, title?: string, description?: string, coverImage?: string, categoryId?: number, totalQuestions?: number, isActive?: boolean): Promise<Questionnaire | undefined>;
    remove(id: number): Promise<boolean>;
    getActiveQuestionnaires(): Promise<Questionnaire[]>;
}
