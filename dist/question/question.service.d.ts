import { Repository } from 'typeorm';
import { Question } from '../entities/question.entity';
import { Option } from '../entities/option.entity';
export declare class QuestionService {
    private readonly questionRepository;
    private readonly optionRepository;
    constructor(questionRepository: Repository<Question>, optionRepository: Repository<Option>);
    findAll(): Promise<Question[]>;
    findOne(id: number): Promise<Question | undefined>;
    findByQuestionnaire(questionnaireId: number): Promise<Question[]>;
    create(content: string, order: number, type: string, questionnaireId: number): Promise<Question>;
    update(id: number, content?: string, order?: number, type?: string): Promise<Question | undefined>;
    delete(id: number): Promise<boolean>;
    createOption(content: string, value: number, order: number, questionId: number): Promise<Option>;
    updateOption(id: number, content?: string, value?: number, order?: number): Promise<Option | undefined>;
    deleteOption(id: number): Promise<boolean>;
}
