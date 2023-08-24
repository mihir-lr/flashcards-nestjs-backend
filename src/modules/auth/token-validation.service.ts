// token-validation.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenValidationService {
  async validateToken(token: string): Promise<any> {
    try {
      const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET_KEY);
      return decodedToken;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
