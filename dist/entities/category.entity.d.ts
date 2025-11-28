import { Questionnaire } from './questionnaire.entity';
export declare class Category {
    id: number;
    name: string;
    description: string;
    questionnaires: Questionnaire[];
    createdAt: Date;
    updatedAt: Date;
}
