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
import { UserService } from './user.service';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('users')
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: '获取所有用户' })
  @ApiResponse({ status: 200, description: '成功获取所有用户' })
  async findAll(@Res() res: Response) {
    const users = await this.userService.findAll();
    return res.json(users);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取单个用户' })
  @ApiParam({
    name: 'id',
    description: '用户ID',
    example: '60d0fe4f5311236168a109ca',
  })
  @ApiResponse({ status: 200, description: '成功获取用户' })
  @ApiResponse({ status: 404, description: '用户不存在' })
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const user = await this.userService.findOne(id);
    if (!user) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'User not found' });
    }
    return res.json(user);
  }

  @Post()
  @ApiOperation({ summary: '创建用户' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: '成功创建用户' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const createdUser = await this.userService.create(
        createUserDto.username,
        createUserDto.password,
        createUserDto.role,
      );
      return res.status(HttpStatus.CREATED).json(createdUser);
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Put(':id')
  @ApiOperation({ summary: '更新用户' })
  @ApiParam({
    name: 'id',
    description: '用户ID',
    example: '60d0fe4f5311236168a109ca',
  })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: '成功更新用户' })
  @ApiResponse({ status: 404, description: '用户不存在' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    try {
      const updatedUser = await this.userService.update(
        id,
        updateUserDto.username,
        updateUserDto.password,
        updateUserDto.role,
      );
      if (!updatedUser) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'User not found' });
      }
      return res.json(updatedUser);
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除用户' })
  @ApiParam({
    name: 'id',
    description: '用户ID',
    example: '60d0fe4f5311236168a109ca',
  })
  @ApiResponse({ status: 200, description: '成功删除用户' })
  @ApiResponse({ status: 404, description: '用户不存在' })
  async remove(@Param('id') id: string, @Res() res: Response) {
    const result = await this.userService.remove(id);
    if (!result) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'User not found' });
    }
    return res.json({ message: 'User deleted successfully' });
  }
}
