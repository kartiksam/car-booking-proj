import { Module } from '@nestjs/common';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { OtpsModule } from './otps/otps.module';
import { EmailModule } from './email/email.module';
import { LoginModule } from './login-logmodule/login-logmodule.module';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/cab'), UsersModule, AuthModule, OtpsModule, EmailModule, OtpsModule, LoginModule, ConfigModule.forRoot({ isGlobal: true }), ScheduleModule.forRoot()],
  controllers: [],
  providers: [AppService],
})
export class AppModule { }
