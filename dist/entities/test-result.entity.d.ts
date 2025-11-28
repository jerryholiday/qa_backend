import { Questionnaire } from './questionnaire.entity';
import { Answer } from './answer.entity';
export declare class TestResult {
    id: number;
    userId: string;
    totalScore: number;
    resultText: string;
    questionnaire: Questionnaire;
    answers: Answer[];
    createdAt: Date;
    updatedAt: Date;
}
