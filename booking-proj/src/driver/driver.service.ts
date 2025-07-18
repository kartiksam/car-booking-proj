import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { driver_Profile, DriverProfileDocument } from 'src/schemas/driver_profile.schema';
import { Model } from 'mongoose';
import { toRegisterDriver } from 'src/mapper/profile.mapper';
import { DriverResponseDto } from './dtos/driver.response';
import { DriverStatus } from 'src/enums/driver.status';
@Injectable()
export class DriverService {
    constructor(@InjectModel(driver_Profile.name) private driverProfileModel: Model<DriverProfileDocument>) { }

    async registerDriver(req: Request, dto: any): Promise<driver_Profile> {
        const { phoneNumber, licenseNumber, status, location } = dto;
        console.log('Registering driver with data:', dto);
        const userId = (req as any).user?.id;
        if (!phoneNumber || !licenseNumber) {
            throw new Error('Phone number and license number are required');
        }
        const profile = await new this.driverProfileModel({
            phoneNumber,
            licenseNumber,
            status, userId, location
        })
        console.log('Creating driver profile:', profile);
        await profile.save();
        return toRegisterDriver(profile);
    }


    async getAvailableDrivers(): Promise<DriverResponseDto[]> {
        const drivers = await this.driverProfileModel.find({ status: 'AVAILABLE' });
        return drivers.map(driver => ({
            id: driver._id.toString(),
            status: driver.status,
            isOnline: driver.isOnline,
            location: driver.location,
            vehicleId: driver.vehicleId?.toString(),
        }));

    }

    async updateDriver(req: Request): Promise<string> {
        const userId = (req as any).user?.id;
        console.log('Updating driver for user ID:', userId);
        const driver = await this.driverProfileModel.findOne({ userId });
        if (!driver) {
            console.log('Driver not found for user ID:', userId);
            return "Driver not found";
        }
        console.log('Current driver status:', driver.status);
        driver.status = driver.status == DriverStatus.AVAILABLE ? DriverStatus.UNAVAILABLE : DriverStatus.AVAILABLE;
        console.log('Updated driver status:', driver.status);
        await driver.save();
        console.log('Driver updated successfully');
        return "Driver updated successfully";
    }





}