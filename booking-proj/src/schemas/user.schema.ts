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
        enum: Object.values(UserRole), // ✅ Use enum values as allowed strings
        default: null
    })
    role: UserRole;

    @Prop({ type: String, default: null })
    isVerified: string;

    @Prop({ type: Number, default: () => moment().utc().valueOf() }) // ✅ wrap in function
    created_at: number;

    @Prop({ type: Number, default: null })
    updated_at: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
