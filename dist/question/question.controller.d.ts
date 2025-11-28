import { Response } from 'express';
import { QuestionService } from './question.service';
export declare class QuestionController {
    private readonly questionService;
    constructor(questionService: QuestionService);
    getAllQuestions(res: Response): Promise<Response<any, Record<string, any>>>;
    getQuestionById(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    getQuestionsByQuestionnaire(questionnaireId: string, res: Response): Promise<Response<any, Record<string, any>>>;
    createQuestion(body: any, res: Response): Promise<Response<any, Record<string, any>>>;
    updateQuestion(id: string, body: any, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteQuestion(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    createOption(questionId: string, body: {
        content: string;
        value: number;
        order: number;
    }, res: Response): Promise<Response<any, Record<string, any>>>;
    updateOption(optionId: string, body: {
        content?: string;
        value?: number;
        order?: number;
    }, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteOption(optionId: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
