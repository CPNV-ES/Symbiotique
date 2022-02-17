import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async signIn(name: string, password: string): Promise<boolean> {
    const user = await this.userService.findOne(name);

    if (!user) {
      return false;
    }

    return await compare(password, user.password);
  }
}
