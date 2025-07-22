import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {

    @Prop({ required: true })
    senderId: string;

    @Prop({ required: true })
    receiverId: string;

    @Prop({ required: true })
    message: string;


    @Prop({ required: true })
    bookingId: string;


}

export const ChatSchema = SchemaFactory.createForClass(Chat);