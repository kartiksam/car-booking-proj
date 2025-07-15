import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import moment from "moment";

export type VehicleDocument = Vehicle & Document;

@Schema()
export class Vehicle {

    @Prop({ required: true })
    vehicleName: string;

    @Prop({ required: true })
    vehicleNumber: string;

    @Prop({ required: true })
    vehicleModel: string;

    @Prop({ required: true })
    dailyRate: number;

    @Prop({ required: true })
    vehicleType: string;

    @Prop({ required: true })
    driverId: string; // Reference to DriverSchema

    @Prop({ type: Number, default: moment().utc().valueOf() })
    created_at: number;

    @Prop({ type: Number, default: null })
    updated_at: number;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);