import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { LoginDto } from 'src/dto/login.dto';
import { UserRepository } from 'src/repository/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    if (await this.userRepository.getUserByEmail(createUserDto.email)) {
      throw new ConflictException('Email already exists');
    }

    return await this.userRepository.createUser(createUserDto);
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const user = await this.userRepository.getUserByEmail(loginDto.email);

    if (!user) {
      throw new NotFoundException('Email does not exist');
    }

    const isMatch = await bcrypt.compare(loginDto.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Password does not match');
    }

    const payload = { email: user.email, sub: user.id };
    const token = await this.jwtService.signAsync(payload);

    return { token: token };
  }
}
