import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find({
      relations: ['questionnaires'],
    });
  }

  async findOne(id: number): Promise<Category | undefined> {
    return this.categoryRepository.findOne({
      where: { id },
      relations: ['questionnaires'],
    }) as Promise<Category | undefined>;
  }

  async create(name: string, description?: string): Promise<Category> {
    const category = this.categoryRepository.create({ name, description });
    return this.categoryRepository.save(category);
  }

  async update(
    id: number,
    name?: string,
    description?: string,
  ): Promise<Category | undefined> {
    const category = await this.findOne(id);
    if (!category) return undefined;

    if (name) category.name = name;
    if (description !== undefined) category.description = description;

    return this.categoryRepository.save(category);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.categoryRepository.delete(id);
    return (
      result.affected !== null &&
      result.affected !== undefined &&
      result.affected > 0
    );
  }
}
