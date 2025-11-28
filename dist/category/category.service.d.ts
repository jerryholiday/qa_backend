import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
export declare class CategoryService {
    private readonly categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    findAll(): Promise<Category[]>;
    findOne(id: number): Promise<Category | undefined>;
    create(name: string, description?: string): Promise<Category>;
    update(id: number, name?: string, description?: string): Promise<Category | undefined>;
    remove(id: number): Promise<boolean>;
}
