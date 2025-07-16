import { Module } from '@nestjs/common';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { MongooseModule } from '@nestjs/mongoose';
import { driver_Profile, DriverProfileSchema } from 'src/schemas/driver_profile.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: driver_Profile.name, schema: DriverProfileSchema }]), AuthModule],
  controllers: [DriverController],
  providers: [DriverService],
  exports: [MongooseModule]
})
export class DriverModule { }
