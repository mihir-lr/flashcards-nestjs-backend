import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FlashcardController } from './flashcard.controller';
import { FlashcardService } from './flashcard.service';
import { FlashcardSchema } from './flashcard.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Flashcard', schema: FlashcardSchema }]),
  ],
  controllers: [FlashcardController],
  providers: [FlashcardService],
  exports: [FlashcardService],
})
export class FlashcardModule {}
