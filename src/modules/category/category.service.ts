import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Category, CategoryDocument } from '../../schemas/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async findAll(): Promise<CategoryDocument[]> {
    const categories = await this.categoryModel
      .find()
      .populate('questionnaires')
      .exec();
    return categories;
  }

  async findOne(id: string | ObjectId): Promise<CategoryDocument | null> {
    const category = await this.categoryModel
      .findById(id)
      .populate('questionnaires')
      .exec();
    return category;
  }

  async create(name: string, description?: string): Promise<CategoryDocument> {
    const createdCategory = new this.categoryModel({ name, description });
    const savedCategory = await createdCategory.save();
    return savedCategory;
  }

  async update(
    id: string | ObjectId,
    name?: string,
    description?: string,
  ): Promise<CategoryDocument | null> {
    const updateData: Partial<CategoryDocument> = {};
    if (name) updateData.name = name;
    if (description !== undefined) updateData.description = description;

    const updatedCategory = await this.categoryModel
      .findByIdAndUpdate(id, { $set: updateData }, { new: true })
      .exec();
    return updatedCategory;
  }

  async remove(id: string | ObjectId): Promise<boolean> {
    const result = await this.categoryModel.findByIdAndDelete(id).exec();
    return result !== null;
  }
}
