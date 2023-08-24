// token-validation.module.ts
import { Module } from '@nestjs/common';
import { TokenValidationService } from './token-validation.service';

@Module({
  providers: [TokenValidationService],
})
export class TokenValidationModule {}
