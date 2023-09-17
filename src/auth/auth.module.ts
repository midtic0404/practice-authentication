import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from 'src/repository/user.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/model/user.model';

@Module({
  imports: [
    JwtModule.register({
      secret: 'mySuperSecretKey',
      signOptions: { expiresIn: '1h' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    SequelizeModule.forFeature([User]),
  ],
  providers: [JwtStrategy, UserRepository],
  exports: [JwtModule, PassportModule, UserRepository],
})
export class AuthModule {}
