import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { LoginDto } from 'src/dto/login.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
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

  @UseGuards(AuthGuard('jwt'))
  @Post('update/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const jwtUser = req.user;

    if (jwtUser.id !== id) {
      throw new UnauthorizedException(
        `You can't update another user's profile.`,
      );
    }

    const updatedUser = await this.userService.updateUser(id, updateUserDto);

    return updatedUser;
  }
}
