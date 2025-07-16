import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Booking, BookingDocument } from 'src/schemas/ride.schema';
import { Model } from 'mongoose';
import { BookingDto } from './dtos/booking.dto';
import { toCreateBookingMapper } from 'src/mapper/booking.mapper';
@Injectable()
export class BookingService {

    constructor(@InjectModel(Booking.name) private bookingModel: Model<BookingDocument>) { }


    async createBooking(body: BookingDto): Promise<Booking> {

        const { pickupLocation, dropoffLocation, rideDate, vehicleId, driverId } = body;
        const booking = new this.bookingModel({
            pickupLocation,
            dropoffLocation,
            rideDate,
            vehicleId,
            driverId,
        });

        await booking.save();
        return toCreateBookingMapper(booking);
    }
}