import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'mySuperSecretKey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  exports: [JwtModule],
})
export class AuthModule {}
