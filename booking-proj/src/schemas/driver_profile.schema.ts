import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as  moment from "moment";
import { DriverStatus } from "src/enums/driver.status";
import mongoose, { HydratedDocument, Types } from "mongoose";
import { raw } from '@nestjs/mongoose';

export type DriverProfileDocument = HydratedDocument<driver_Profile>;


@Schema({ collection: 'driver_profile' })
export class driver_Profile {

    @Prop({ required: true })
    phoneNumber: string;

    @Prop({ required: true })
    licenseNumber: string;

    @Prop({
        type: String,
        enum: Object.values(DriverStatus),
        default: DriverStatus.AVAILABLE

    })
    status: DriverStatus;

    @Prop({ type: Boolean, default: true })
    isOnline: boolean;

    @Prop({
        type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true
    })
    userId?: Types.ObjectId;

    @Prop({
        type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle'
    })
    vehicleId?: Types.ObjectId;



    @Prop(raw({
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    }))
    location: {
        type: 'Point';
        coordinates: [number, number];
    };

    @Prop({ type: Number, default: moment().utc().valueOf() })
    created_at: number;

    @Prop({ type: Number, default: null })
    updated_at: number;
}

export const DriverProfileSchema = SchemaFactory.createForClass(driver_Profile);
DriverProfileSchema.index({ location: '2dsphere' });
