import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class RatingSchema {

    @Prop({ required: true })
    rideId: string; // Reference to RideSchema

    @Prop({ required: true })
    userId: string; // Reference to UserSchema

    @Prop({ required: true })
    driverId: string; // Reference to UserSchema for the driver

    @Prop({ required: true })
    rating: number; // Rating value, e.g., 1 to 5

    @Prop({ required: true })
    review: string; // Optional comment about the ride




}