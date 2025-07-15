import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class paymentSchema {

    @Prop({ required: true })
    userId: string; // Reference to UserSchema

    @Prop({ required: true })
    rideId: string; // Reference to RideSchema

    @Prop({ required: true })
    amount: number;

    @Prop({ required: true })
    paymentMethod: string; // e.g., 'credit_card', 'cash'

    @Prop({ type: Date, default: Date.now })
    created_at: Date;

    @Prop({ type: Date, default: null })
    updated_at: Date;
}