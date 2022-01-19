import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { Repository } from 'typeorm';
import { Credential } from './entities/crediential.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Credential)
    private readonly credentialRepository: Repository<Credential>,
  ) {}

  async signIn(username: string, password: string): Promise<boolean> {
    const user = await this.credentialRepository.findOne(username);

    if (!user) {
      return false;
    }

    return await compare(password, user.password);
  }
}
