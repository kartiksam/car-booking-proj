import { Module } from '@nestjs/common';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { DriverModule } from 'src/driver/driver.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Vehicle, VehicleSchema } from 'src/schemas/vehicle.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Vehicle.name, schema: VehicleSchema }]), DriverModule, AuthModule],
  controllers: [VehicleController],
  providers: [VehicleService]
})
export class VehicleModule { }
