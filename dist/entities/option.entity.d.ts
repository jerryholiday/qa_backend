import { Question } from './question.entity';
import { Answer } from './answer.entity';
export declare class Option {
    id: number;
    content: string;
    value: number;
    order: number;
    question: Question;
    answers: Answer[];
    createdAt: Date;
    updatedAt: Date;
}
