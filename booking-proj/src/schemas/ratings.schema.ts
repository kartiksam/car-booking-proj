import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class RatingSchema {

    @Prop({ required: true })
    rideId: string;

    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    driverId: string;

    @Prop({ required: true })
    rating: number;

    @Prop({ required: true })
    review: string;




}