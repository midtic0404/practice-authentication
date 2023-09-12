import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';

@Injectable()
export class UserService {
  async createUser(createUserDto: CreateUserDto) {
    console.log(createUserDto);
  }
}
