import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateUserDto,
  LoginUserDto,
} from '../../shared/dtos/create-user.dto.js';
// import { User } from '../../shared/interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jwt-simple';
import { User, UserDocument } from './user.schema'; // Import User and UserDocument

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {} // Use User.name

  async register(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    newUser.password = await this.hashPassword(newUser.password);
    return newUser.save();
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userModel.findOne({ email: loginUserDto.email });
    if (!user) {
      return { message: 'User not found' };
    }
    const isPasswordValid = await this.validatePassword(
      loginUserDto.password,
      user.password,
    );
    if (isPasswordValid) {
      return { token: this.generateToken(user) };
    } else {
      return { message: 'Invalid password' };
    }
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async validatePassword(
    plainText: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainText, hashedPassword);
  }

  generateToken(user: UserDocument): string {
    const payload = { sub: user._id };
    return jwt.encode(payload, process.env.JWT_SECRET_KEY); // Replace with your secret key
  }
  async findByUsername(username: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }
  async validateToken(token: string): Promise<{ sub: string }> | null {
    try {
      const payload = jwt.decode(token, process.env.JWT_SECRET_KEY);
      return payload as { sub: string };
    } catch (error) {
      console.log('error: ', error);
      return null; // Invalid or expired token
    }
  }
}
