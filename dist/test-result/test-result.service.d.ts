import { Repository } from 'typeorm';
import { TestResult } from '../entities/test-result.entity';
import { Answer } from '../entities/answer.entity';
import { Option } from '../entities/option.entity';
export declare class TestResultService {
    private readonly testResultRepository;
    private readonly answerRepository;
    private readonly optionRepository;
    constructor(testResultRepository: Repository<TestResult>, answerRepository: Repository<Answer>, optionRepository: Repository<Option>);
    findAll(): Promise<TestResult[]>;
    findOne(id: number): Promise<TestResult | undefined>;
    findByUserId(userId: string): Promise<TestResult[]>;
    submitTest(userId: string, questionnaireId: number, answers: {
        questionId: number;
        optionId: number;
    }[]): Promise<TestResult>;
}
