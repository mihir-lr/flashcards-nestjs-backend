// jwt-auth.module.ts
import { Module } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { TokenValidationModule } from './token-validation.module';

@Module({
  imports: [TokenValidationModule],
  providers: [JwtAuthGuard],
})
export class JwtAuthModule {}
