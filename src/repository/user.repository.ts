import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User } from 'src/model/user.model';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from 'src/dto/update-user.dto';

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

  async getUserById(id: number): Promise<User> {
    return await this.userModel.findOne({
      where: {
        id: id,
      },
    });
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({
      where: {
        email: email,
      },
    });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const affectedRow: number = await this.userModel.update(updateUserDto, {
      where: { id },
      returning: true,
    })[1];

    if (affectedRow === 0) {
      throw new Error('No user is updated');
    }

    const updatedUser = await this.getUserById(id);
    return updatedUser;
  }
}
