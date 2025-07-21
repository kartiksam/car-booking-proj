import { forwardRef, Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingSchema, Booking } from 'src/schemas/booking.schema';
import { AuthModule } from 'src/auth/auth.module';
import { DriverModule } from 'src/driver/driver.module';
import { VehicleModule } from 'src/vehicle/vehicle.module';
import { GatewayModule } from 'src/gateway/gateway.module';


@Module({
  imports: [MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]), AuthModule, DriverModule, VehicleModule, forwardRef(() => GatewayModule)],
  controllers: [BookingController],
  providers: [BookingService],
  exports: [BookingService]
})
export class BookingModule { }
