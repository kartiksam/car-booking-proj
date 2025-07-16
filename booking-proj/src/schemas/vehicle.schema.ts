import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as moment from "moment";
import mongoose, { Types } from "mongoose";
import { VehicleType } from "src/enums/vehicle.type";

export type VehicleDocument = Vehicle & Document;

@Schema()
export class Vehicle {

    @Prop({ required: true })
    vehicleName: string;

    @Prop({ required: true })
    vehicleNumber: string;

    @Prop({ required: true })
    vehicleModel: string;

    @Prop()
    dailyRate?: number;

    @Prop({
        type: String,
        enum: Object.values(VehicleType),
        default: null
    })
    vehicleType: VehicleType;

    @Prop({
        type: mongoose.Schema.Types.ObjectId, ref: 'driver_Profile'
    })
    driverId?: Types.ObjectId;

    @Prop({ type: Number, default: moment().utc().valueOf() })
    created_at: number;

    @Prop({ type: Number, default: null })
    updated_at: number;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);