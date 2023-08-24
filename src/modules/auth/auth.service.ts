// auth.service.ts
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service'; // Import UserService

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    console.log('user: ', user);

    if (user && user.password === password) {
      return user;
    }

    return null;
  }

  // Other methods related to authentication and user management...
}
