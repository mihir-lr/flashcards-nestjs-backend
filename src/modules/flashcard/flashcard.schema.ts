import * as mongoose from 'mongoose';

export const FlashcardSchema = new mongoose.Schema({
  title: String,
  question: String,
  answer: String,
  createdBy: String,
});

export interface FlashcardDocument extends mongoose.Document {
  question: string;
  answer: string;
  userId: string;
}
