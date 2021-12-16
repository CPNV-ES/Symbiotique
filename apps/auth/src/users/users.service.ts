import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = createUserDto.name;
    user.password = createUserDto.password;

    return this.usersRepository.save(user);
  }

  async findOne(name: string) {
    const user = await this.usersRepository.findOne({
      where: {
        name,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async update(name: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(name);

    return await this.usersRepository.update(user, updateUserDto);
  }
}
