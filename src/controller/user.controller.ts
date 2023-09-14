import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { LoginDto } from 'src/dto/login.dto';
import { User } from 'src/model/user.model';
import { UserService } from 'src/service/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.createUser(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return await this.userService.login(loginDto);
  }
}
