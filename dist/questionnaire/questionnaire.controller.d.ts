import { Response } from 'express';
import { QuestionnaireService } from './questionnaire.service';
export declare class QuestionnaireController {
    private readonly questionnaireService;
    constructor(questionnaireService: QuestionnaireService);
    getAllQuestionnaires(res: Response): Promise<Response<any, Record<string, any>>>;
    getActiveQuestionnaires(res: Response): Promise<Response<any, Record<string, any>>>;
    getQuestionnaireById(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    createQuestionnaire(body: any, res: Response): Promise<Response<any, Record<string, any>>>;
    updateQuestionnaire(id: string, body: any, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteQuestionnaire(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
