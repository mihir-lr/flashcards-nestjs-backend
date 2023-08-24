import * as mongoose from 'mongoose';

export const ShareLinkSchema = new mongoose.Schema({
  token: String,
  flashcardIds: [String],
});
