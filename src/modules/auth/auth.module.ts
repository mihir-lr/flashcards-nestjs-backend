// auth.module.ts
import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module'; // Make sure UserModule is imported
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { FlashcardModule } from '../flashcard/flashcard.module';
import { ShareModule } from '../share/share.module';

@Module({
  imports: [UserModule, FlashcardModule, ShareModule], // Make sure UserModule is imported
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService], // Export AuthService if needed
})
export class AuthModule {}
