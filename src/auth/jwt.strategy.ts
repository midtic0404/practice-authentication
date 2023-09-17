import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../model/user.model';
import { UserRepository } from 'src/repository/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'mySuperSecretKey',
    });
  }

  async validate(payload: any): Promise<User> {
    const { sub } = payload;
    const user = await this.userRepository.getUserById(sub);

    if (!user) {
      throw new UnauthorizedException('JWT user unauthorized.');
    }

    return user;
  }
}
