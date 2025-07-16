import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Vehicle, VehicleDocument } from 'src/schemas/vehicle.schema';
import { Model } from 'mongoose';
import { VehicleDto } from './dtos/vehicle.dto';
import { driver_Profile, DriverProfileDocument } from 'src/schemas/driver_profile.schema';
@Injectable()
export class VehicleService {

    constructor(@InjectModel(Vehicle.name) private readonly vehicleModel: Model<VehicleDocument>, @InjectModel(driver_Profile.name) private readonly driverModel: Model<DriverProfileDocument>) { }

    async regsiterVehicle(dto: VehicleDto, req: Request): Promise<Vehicle> {

        const userId = (req as any).user?.id;
        console.log('User ID from vehcile service:', userId);
        if (!userId) {
            throw new Error('User not authenticated');
        }

        const driverProfileId = await this.driverModel.findOne({ userId });
        if (!driverProfileId) {
            throw new Error('Driver profile not found for the user');
        }

        console.log('Driver Profile ID:', driverProfileId._id);
        const { vehicleName, vehicleNumber, vehicleModel, vehicleType } = dto;
        const newVehicle = new this.vehicleModel({
            vehicleModel,
            vehicleNumber,
            vehicleName,
            vehicleType,
            driverId: driverProfileId._id // Assigning the driver's profile ID to the vehicle
        })

        await newVehicle.save();
        return newVehicle;
    }
}
