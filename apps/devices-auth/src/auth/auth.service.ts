import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Credential } from './entities/crediential.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Credential)
    private readonly credentialRepository: Repository<Credential>,
  ) {}

  async findOne(): Promise<Credential> {
    return await this.credentialRepository.findOne();
  }
}
