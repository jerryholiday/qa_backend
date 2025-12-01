import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findByUsername(username: string): Promise<UserDocument | null> {
    const user = await this.userModel.findOne({ username }).exec();
    return user;
  }

  async createUser(username: string, password: string): Promise<UserDocument> {
    const createdUser = new this.userModel({ username, password });
    const savedUser = await createdUser.save();
    return savedUser;
  }
}
