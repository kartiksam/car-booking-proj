import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io"; // ✅ Correct import
import { ChatService } from "./chat.service";
import { sendMessageDto } from "./dto/create-chat.dto";
import { AuthService } from "src/auth/auth.service";
import { Request } from 'express';
import { BookingService } from "src/booking/booking.service";
import { BookingDocument } from "src/schemas/booking.schema";

@WebSocketGateway({ cors: { origin: '*' } }) // Port 3002 if you're running it separately
export class ChatGateway implements OnGatewayConnection {

    constructor(private readonly chatService: ChatService, private readonly authService: AuthService, private readonly bookingService: BookingService) { }

    private socketUserMap = new Map<string, string>();


    @WebSocketServer()
    server: Server;


    async handleConnection(socket: Socket) {
        try {

            const authHeader = socket.handshake.headers.authorization;
            if (!authHeader?.startsWith('Bearer')) {
                throw new Error('Invalid Authorization header');
            }
            const token = authHeader.replace("Bearer ", "");
            const payload = await this.authService.verifyToken(token);
            const userId = payload.id;
            if (!userId) {
                console.log("❌ Token verified but no userId found in payload:", payload);
                throw new Error('Invalid token payload');
            }
            // save mapping
            this.socketUserMap.set(socket.id, userId);

            console.log(`connected user: ${socket.id}`);
        } catch (error) {
            console.error("Error during connection:", error);
            socket.disconnect();
        }
    }

    @SubscribeMessage("sendMessage")
    async handleMessage(
        @MessageBody() messageText: string,
        @ConnectedSocket() socket: Socket
    ) {
        try {

            const senderId = this.socketUserMap.get(socket.id);
            console.log("senderId is", senderId);
            if (!senderId) {
                throw new Error("Sender not recognized");
            }

            const booking: BookingDocument | null = await this.bookingService.findActiveBookingByUserId(senderId);
            if (!booking) {
                throw new Error("No active booking found");
            }
            const receiverId =
                booking.driverId.toString() === senderId
                    ? booking.userId.toString()
                    : booking.driverId.toString();

            console.log(`📨 Message from  ${messageText}`);

            // Save message
            const message = await this.chatService.saveMessage({
                senderId,
                receiverId,
                message: messageText,
                bookingId: booking._id.toString()
            });


            // Find receiver's socket
            const receiverSocketId = [...this.socketUserMap.entries()].find(([_, uid]) => uid === receiverId)?.[0];

            if (receiverSocketId) {
                this.server.to(receiverSocketId).emit("receiveMessage", message);
            } else {
                console.warn("Receiver not connected");
            }



        } catch (error) {
            console.error(" Error sending message:", error);
        }
    }

    handleDisconnect(socket: Socket) {
        this.socketUserMap.delete(socket.id);
        console.log(`⚠️ User disconnected: ${socket.id}`);
    }

}
