import { forwardRef, Module } from '@nestjs/common';
import { UserDetailsService } from './user-details.service';
import { UserDetailsController } from './user-details.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserProfile, UserProfileSchema } from 'src/schemas/user_profile.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: UserProfile.name, schema: UserProfileSchema }]), forwardRef(() => AuthModule)],
  controllers: [UserDetailsController],
  providers: [UserDetailsService],
  exports: [MongooseModule]
})
export class UserDetailsModule { }
