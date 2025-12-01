import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { CategoryService } from './category.service';

@Controller('api/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategories(@Res() res: Response) {
    const categories = await this.categoryService.findAll();
    return res.json(categories);
  }

  @Get(':id')
  async getCategoryById(@Param('id') id: string, @Res() res: Response) {
    const category = await this.categoryService.findOne(id);
    if (!category) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Category not found' });
    }
    return res.json(category);
  }

  @Post()
  async createCategory(
    @Body() body: { name: string; description?: string },
    @Res() res: Response,
  ) {
    const { name, description } = body;
    const category = await this.categoryService.create(name, description);
    return res.status(HttpStatus.CREATED).json(category);
  }

  @Put(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() body: { name?: string; description?: string },
    @Res() res: Response,
  ) {
    const { name, description } = body;
    const category = await this.categoryService.update(id, name, description);
    if (!category) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Category not found' });
    }
    return res.json(category);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string, @Res() res: Response) {
    const result = await this.categoryService.remove(id);
    if (!result) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Category not found' });
    }
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
