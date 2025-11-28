import { Questionnaire } from './questionnaire.entity';
import { Option } from './option.entity';
import { Answer } from './answer.entity';
export declare class Question {
    id: number;
    content: string;
    order: number;
    type: string;
    questionnaire: Questionnaire;
    options: Option[];
    answers: Answer[];
    createdAt: Date;
    updatedAt: Date;
}
