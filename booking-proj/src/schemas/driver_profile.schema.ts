import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as  moment from "moment";
import { DriverStatus } from "src/enums/driver.status";
import mongoose, { Types } from "mongoose";

export type DriverProfileDocument = driver_Profile & Document;

@Schema()
export class driver_Profile {

    @Prop({ required: true })
    phoneNumber: string;

    @Prop({ required: true })
    licenseNumber: string;

    @Prop({
        type: String,
        enum: Object.values(DriverStatus),
        default: null
    })
    status: DriverStatus;

    @Prop({ type: Boolean, default: true })
    isOnline: boolean;

    @Prop({
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    })
    userId?: Types.ObjectId;

    @Prop({
        type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle'
    })
    vehicleId?: Types.ObjectId;


    @Prop({
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        }
    })
    location: {
        type: 'Point',
        coordinates: [number, number]
    };


    @Prop({ type: Number, default: moment().utc().valueOf() })
    created_at: number;

    @Prop({ type: Number, default: null })
    updated_at: number;
}

export const DriverProfileSchema = SchemaFactory.createForClass(driver_Profile);