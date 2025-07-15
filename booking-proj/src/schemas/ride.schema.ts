import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class RideSchema {
    @Prop({ required: true })
    pickupLocation: string;

    @Prop({ required: true })
    dropoffLocation: string;

    @Prop({ required: true })
    rideDate: Date;

    @Prop({ required: true })
    vehicleId: string; // Reference to VehicleSchema

    @Prop({ required: true })
    driverId: string; // Reference to UserSchema

    @Prop({ type: Number, default: null })
    created_at: number;

    @Prop({ type: Number, default: null })
    updated_at: number;
}