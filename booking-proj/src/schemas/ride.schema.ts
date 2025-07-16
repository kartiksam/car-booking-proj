import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as moment from "moment";
export type BookingDocument = Booking & Document;

@Schema()
export class Booking {
    @Prop({ required: true })
    pickupLocation: string;

    @Prop({ required: true })
    dropoffLocation: string;

    @Prop({ required: true })
    rideDate: Date;

    @Prop({ required: true })
    vehicleId: string;

    @Prop({ required: true })
    driverId: string;

    @Prop({ default: null })
    lat_lng?: string;

    @Prop({ default: null })
    fare?: number;

    @Prop({ type: Number, default: moment().utc().valueOf() })
    created_at: number;

    @Prop({ type: Number, default: null })
    updated_at: number;
}
export const BookingSchema = SchemaFactory.createForClass(Booking);