import { forwardRef, Module } from '@nestjs/common';
// import { OtpsController } from './otps.controller';
import { OtpsService } from './otps.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Otp, OtpSchema } from './otp.schema';
import { UsersModule } from 'src/users/users.module';
import { EmailModule } from 'src/email/email.module';


@Module({
  imports: [MongooseModule.forFeature([{ name: Otp.name, schema: OtpSchema }]), forwardRef(() => UsersModule), EmailModule],
  controllers: [],
  providers: [OtpsService],
  exports: [OtpsService]
})
export class OtpsModule { }
