import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as moment from "moment";

export type UserProfileDocument = UserProfile & Document;

@Schema()
export class UserProfile {
    @Prop({ required: true })
    address: string;

    @Prop({ required: true })
    contact: number;

    @Prop({ required: true })
    dateOfBirth: Date;

    @Prop({ required: true })
    imageUrl: string;

    @Prop({ required: true })
    status: string;

    @Prop({ required: true })
    userId: string; // Reference to UserSchema

    @Prop({ type: Number, default: moment().utc().valueOf() })
    created_at: number;

    @Prop({ type: Number, default: null })
    updated_at: number;

}
export const UserProfileSchema = SchemaFactory.createForClass(UserProfile);