import { Module } from '@nestjs/common';
import { UserDetailsService } from './user-details.service';
import { UserDetailsController } from './user-details.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserProfile, UserProfileSchema } from 'src/schemas/user_profile.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: UserProfile.name, schema: UserProfileSchema }])],
  controllers: [UserDetailsController],
  providers: [UserDetailsService],
})
export class UserDetailsModule { }
