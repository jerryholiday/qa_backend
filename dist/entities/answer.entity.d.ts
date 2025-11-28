import { TestResult } from './test-result.entity';
import { Question } from './question.entity';
import { Option } from './option.entity';
export declare class Answer {
    id: number;
    testResult: TestResult;
    question: Question;
    option: Option;
    createdAt: Date;
    updatedAt: Date;
}
