import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as moment from "moment";
import { UserRole } from "src/enums/user.role";

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({
        type: String,
        enum: Object.values(UserRole),
        default: null
    })
    role: UserRole;

    @Prop({ type: Boolean, default: false })
    isVerified: boolean;

    @Prop({ type: Number, default: () => moment().utc().valueOf() })
    created_at: number;

    @Prop({ type: Number, default: null })
    updated_at: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
