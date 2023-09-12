import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: './db.sqlite3',
      autoLoadModels: true,
      synchronize: true,
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
