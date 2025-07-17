import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { driver_Profile, DriverProfileDocument } from 'src/schemas/driver_profile.schema';
import { Model } from 'mongoose';
import { toRegisterDriver } from 'src/mapper/profile.mapper';
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

  
     async 






}