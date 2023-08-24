// jwt-auth.guard.ts

import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenValidationService } from './token-validation.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly tokenValidationService: TokenValidationService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return false;
    }

    const token = this.extractTokenFromHeader(authHeader);

    try {
      const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET_KEY);
      request.user = decodedToken;
      return true;
    } catch (error) {
      return false;
    }
  }

  private extractTokenFromHeader(authHeader: string): string | null {
    const tokenParts = authHeader.split(' ');

    if (tokenParts.length === 2 && tokenParts[0] === 'Bearer') {
      return tokenParts[1];
    }

    return null;
  }
}
