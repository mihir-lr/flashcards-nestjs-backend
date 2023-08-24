import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShareController } from './share.controller';
import { ShareService } from './share.service';
import { ShareLinkSchema } from './share-link.schema';
import { FlashcardModule } from '../flashcard/flashcard.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'ShareLink', schema: ShareLinkSchema }]),
    FlashcardModule,
  ],
  controllers: [ShareController],
  providers: [ShareService],
})
export class ShareModule {}
