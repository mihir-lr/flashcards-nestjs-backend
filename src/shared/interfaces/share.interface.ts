import { Document } from 'mongoose';

export interface ShareLink extends Document {
  token: string;
  flashcardIds: string[];
  userId: string; // IDs of the flashcards being shared
}
