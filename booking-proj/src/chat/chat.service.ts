import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chat, ChatDocument } from './entities/chat.entity';
import { Model } from 'mongoose';
import { sendMessageDto } from './dto/create-chat.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
  ) { }

  async saveMessage(data: sendMessageDto): Promise<Chat> {
    const { senderId, receiverId, message, bookingId } = data;

    const newMessage = new this.chatModel({
      senderId,
      receiverId,
      message,
      bookingId,
      timestamp: new Date(), // Optional
    });

    return await newMessage.save();
  }
}
