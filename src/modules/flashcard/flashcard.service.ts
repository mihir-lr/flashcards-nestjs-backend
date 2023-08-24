import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateFlashcardDto,
  UpdateFlashcardDto,
} from '../../shared/dtos/flashcard.dto';
import { Flashcard } from '../../shared/interfaces/flashcard.interface';

@Injectable()
export class FlashcardService {
  constructor(
    @InjectModel('Flashcard') private readonly flashcardModel: Model<Flashcard>,
  ) {}

  async findAll(userId: string) {
    return this.flashcardModel.find({ createdBy: userId }).exec();
  }

  async create(createFlashcardDto: CreateFlashcardDto, userId: string) {
    const newFlashcard = new this.flashcardModel({
      ...createFlashcardDto,
      createdBy: userId,
    });
    return newFlashcard.save();
  }

  async update(id: string, updateFlashcardDto: UpdateFlashcardDto) {
    return this.flashcardModel
      .findByIdAndUpdate(id, updateFlashcardDto, { new: true })
      .exec();
  }

  async delete(id: string) {
    return this.flashcardModel.findByIdAndDelete(id).exec();
  }
  async findById(id: string): Promise<Flashcard> {
    return this.flashcardModel.findById(id).exec();
  }
}
