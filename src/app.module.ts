import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { FlashcardModule } from './modules/flashcard/flashcard.module';

@Module({
  imports: [AuthModule, UserModule, FlashcardModule], // Import both modules
})
export class AppModule {}
