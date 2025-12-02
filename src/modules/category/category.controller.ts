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
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('categories')
@Controller('api/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: '获取所有分类' })
  @ApiResponse({ status: 200, description: '成功获取所有分类' })
  async getAllCategories(@Res() res: Response) {
    const categories = await this.categoryService.findAll();
    return res.json(categories);
  }

  @Get(':id')
  @ApiOperation({ summary: '根据ID获取分类' })
  @ApiParam({
    name: 'id',
    description: '分类ID',
    example: '60d0fe4f5311236168a109ca',
  })
  @ApiResponse({ status: 200, description: '成功获取分类' })
  @ApiResponse({ status: 404, description: '分类不存在' })
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
  @ApiOperation({ summary: '创建新分类' })
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({ status: 201, description: '成功创建分类' })
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @Res() res: Response,
  ) {
    const { name, description } = createCategoryDto;
    const category = await this.categoryService.create(name, description);
    return res.status(HttpStatus.CREATED).json(category);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新分类' })
  @ApiParam({
    name: 'id',
    description: '分类ID',
    example: '60d0fe4f5311236168a109ca',
  })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiResponse({ status: 200, description: '成功更新分类' })
  @ApiResponse({ status: 404, description: '分类不存在' })
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Res() res: Response,
  ) {
    const { name, description } = updateCategoryDto;
    const category = await this.categoryService.update(id, name, description);
    if (!category) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Category not found' });
    }
    return res.json(category);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除分类' })
  @ApiParam({
    name: 'id',
    description: '分类ID',
    example: '60d0fe4f5311236168a109ca',
  })
  @ApiResponse({ status: 204, description: '成功删除分类' })
  @ApiResponse({ status: 404, description: '分类不存在' })
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
