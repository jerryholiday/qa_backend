import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User, UserDocument } from '../../schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findAll(): Promise<UserDocument[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  async findOne(id: string | ObjectId): Promise<UserDocument | null> {
    const user = await this.userModel.findById(id).exec();
    return user;
  }

  async findByUsername(username: string): Promise<UserDocument | null> {
    const user = await this.userModel.findOne({ username }).exec();
    return user;
  }

  async create(username: string, password: string, role?: string): Promise<UserDocument> {
    // 检查用户名是否已存在
    const existingUser = await this.findByUsername(username);
    if (existingUser) {
      throw new Error('Username already exists');
    }

    const createdUser = new this.userModel({
      username,
      password,
      role: role || 'user',
    });
    const savedUser = await createdUser.save();
    return savedUser;
  }

  async update(
    id: string | ObjectId,
    username?: string,
    password?: string,
    role?: string,
  ): Promise<UserDocument | null> {
    const updateData: Partial<UserDocument> = {};
    
    if (username) {
      // 检查新用户名是否已被其他用户使用
      const existingUser = await this.findByUsername(username);
      if (existingUser && existingUser._id.toString() !== id.toString()) {
        throw new Error('Username already exists');
      }
      updateData.username = username;
    }
    
    if (password) updateData.password = password;
    if (role) updateData.role = role;

    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    
    return updatedUser;
  }

  async remove(id: string | ObjectId): Promise<boolean> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    return result !== null;
  }
}
