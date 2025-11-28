import { Response } from 'express';
import { TestResultService } from './test-result.service';
export declare class TestResultController {
    private readonly testResultService;
    constructor(testResultService: TestResultService);
    getAllTestResults(res: Response): Promise<Response<any, Record<string, any>>>;
    getTestResultById(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    getTestResultsByUserId(userId: string, res: Response): Promise<Response<any, Record<string, any>>>;
    submitTest(body: any, res: Response): Promise<Response<any, Record<string, any>>>;
}
