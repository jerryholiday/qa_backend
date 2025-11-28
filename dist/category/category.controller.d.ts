import { Response } from 'express';
import { CategoryService } from './category.service';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    getAllCategories(res: Response): Promise<Response<any, Record<string, any>>>;
    getCategoryById(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    createCategory(body: {
        name: string;
        description?: string;
    }, res: Response): Promise<Response<any, Record<string, any>>>;
    updateCategory(id: string, body: {
        name?: string;
        description?: string;
    }, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteCategory(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
