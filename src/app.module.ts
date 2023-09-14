import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserRepository } from './repository/user.repository';
import { User } from './model/user.model';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    AuthModule,
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: './db.sqlite3',
      autoLoadModels: true,
      synchronize: true,
    }),
    SequelizeModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class AppModule {}
