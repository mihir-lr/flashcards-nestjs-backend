import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShareLink } from '../../shared/interfaces/share.interface';
import { v4 as uuidv4 } from 'uuid';
import { FlashcardService } from '../flashcard/flashcard.service';

@Injectable()
export class ShareService {
  constructor(
    @InjectModel('ShareLink') private readonly shareLinkModel: Model<ShareLink>,
    private readonly flashcardService: FlashcardService,
  ) {}

  async generateShareLink(userId: string, flashcardId: string): Promise<any> {
    const token = uuidv4(); // Generate a unique token
    const shareLink = new this.shareLinkModel({
      token,
      flashcardIds: [flashcardId],
      userId, // Store the user ID
    });
    const savedShareLink = await shareLink.save();

    // Create a full http:// link using the hostname from your configuration
    const link = `${process.env.DOMAIN_URL}/share-links/${savedShareLink.token}`;

    return { userId, link }; // Return the user ID and generated link
  }

  async getSharedFlashcards(token: string, userId?: string): Promise<any> {
    const shareLink = await this.shareLinkModel.findOne({ token }).exec();
    if (!shareLink) {
      return { message: 'Share link not found' };
    }
    // Check if the authenticated user (if any) matches the user who created the share link
    if (!userId) {
      return { message: 'You do not have permission to view this link.' };
    }
    // Fetch and return flashcard data associated with the link
    const flashcardIds = shareLink.flashcardIds;
    const flashcards = await Promise.all(
      flashcardIds.map(async (flashcardId) => {
        // Fetch the flashcard details based on flashcardId
        const flashcard = await this.flashcardService.findById(flashcardId); // You need to implement this method in FlashcardService
        return flashcard;
      }),
    );
    return flashcards;
  }
}
