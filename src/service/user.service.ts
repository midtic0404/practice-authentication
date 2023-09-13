import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserRepository } from 'src/repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async createUser(createUserDto: CreateUserDto) {
    if (await this.userRepository.getUserByEmail(createUserDto.email)) {
      throw new ConflictException('Email already exists');
    }

    return await this.userRepository.createUser(createUserDto);
  }
}
