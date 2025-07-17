import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Booking, BookingDocument } from 'src/schemas/booking.schema';
import { Model } from 'mongoose';
import { BookingDto } from './dtos/booking.dto';
import { driver_Profile, DriverProfileDocument } from 'src/schemas/driver_profile.schema';
import { Vehicle, VehicleDocument } from 'src/schemas/vehicle.schema';
@Injectable()
export class BookingService {

    constructor(@InjectModel(Booking.name) private bookingModel: Model<BookingDocument>, @InjectModel(driver_Profile.name) private driverModel: Model<DriverProfileDocument>, @InjectModel(Vehicle.name) private vehicleModel: Model<VehicleDocument>) { }


    async createBooking(req: Request, dto: BookingDto): Promise<Booking> {
        const userId = (req as any).user?.id;
        const { pickupLocation, dropLocation, rideDate } = dto;


        const availableDrivers = await this.driverModel.find({
            status: 'AVAILABLE',
            isOnline: true,
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [pickupLocation.lng, pickupLocation.lat]


                    },
                    $maxDistance: 5000
                }
            }
        });
        console.log('Available Drivers:', availableDrivers);

        let selectedDriver: DriverProfileDocument | null = null;
        let selectedVehicle: VehicleDocument | null = null;


        for (const driver of availableDrivers) {
            const vehicle = await this.vehicleModel.findOne({
                _id: driver.vehicleId,
                status: 'available'
            });

            if (vehicle) {
                selectedDriver = driver;
                selectedVehicle = vehicle;
                break;
            }
        }
        console.log('Selected Driver:', selectedDriver);
        console.log('Selected Vehicle:', selectedVehicle);

        if (!selectedDriver || !selectedVehicle) {
            throw new NotFoundException('No available driver or vehicle at this time.');
        }


        const booking = await this.bookingModel.create({

            driverId: selectedDriver._id,
            vehicleId: selectedVehicle._id,
            pickupLocation,
            dropLocation,
            rideDate


        });


        await this.driverModel.findByIdAndUpdate(selectedDriver._id, { status: 'ON_RIDE' });
        await this.vehicleModel.findByIdAndUpdate(selectedVehicle._id, { status: 'in_use' });

        return booking;
    }

}
