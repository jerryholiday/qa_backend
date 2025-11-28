import { Category } from './category.entity';
import { Question } from './question.entity';
import { TestResult } from './test-result.entity';
export declare class Questionnaire {
    id: number;
    title: string;
    description: string;
    coverImage: string;
    totalQuestions: number;
    isActive: boolean;
    category: Category;
    questions: Question[];
    testResults: TestResult[];
    createdAt: Date;
    updatedAt: Date;
}
