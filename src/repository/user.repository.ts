import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User } from 'src/model/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );

    return await this.userModel.create({
      username: createUserDto.username,
      email: createUserDto.email,
      password: hashedPassword,
    });
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({
      where: {
        email: email,
      },
    });
  }
}
