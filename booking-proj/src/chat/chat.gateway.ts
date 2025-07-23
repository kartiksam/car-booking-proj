import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ChatService } from "./chat.service";
import { sendMessageDto } from "./dto/create-chat.dto";
import { AuthService } from "src/auth/auth.service";
import { BookingService } from "src/booking/booking.service";
import { BookingDocument } from "src/schemas/booking.schema";

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    server: Server;

    private socketUserMap = new Map<string, string>(); // socketId -> userId

    constructor(
        private readonly chatService: ChatService,
        private readonly authService: AuthService,
        private readonly bookingService: BookingService
    ) { }

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
                throw new Error('Invalid token payload, userId missing');
            }

            this.socketUserMap.set(socket.id, userId);
            console.log(`✅ User connected | userId: ${userId} | socketId: ${socket.id}`);
        } catch (error) {
            console.error("❌ Connection error:", error.message);
            socket.disconnect();
        }
        console.log("Connected user map:", this.socketUserMap);

    }

    handleDisconnect(socket: Socket) {
        this.socketUserMap.delete(socket.id);
        console.log(`⚠️ User disconnected | socketId: ${socket.id}`);
    }

    @SubscribeMessage("sendMessage")
    async handleMessage(
        @MessageBody() messageText: string,
        @ConnectedSocket() socket: Socket
    ) {
        const senderId = this.socketUserMap.get(socket.id);

        if (!senderId) {
            console.warn("❌ Sender not recognized. No mapping found.");
            return;
        }

        try {
            let booking: BookingDocument | null =
                await this.bookingService.findActiveBookingByUserId(senderId);

            if (!booking) {
                booking = await this.bookingService.findActiveBookingByDriverId(senderId);
            }

            if (!booking || !booking.userId || !booking.driverId) {
                throw new Error("Active booking with both user and driver not found");
            }

            const receiverId =
                booking.driverId

            console.log(`📨 Message received | from: ${senderId} to: ${receiverId} | text: "${messageText}"`);

            const message = await this.chatService.saveMessage({
                senderId,
                receiverId,
                message: messageText,
                bookingId: booking._id.toString()
            });

            const receiverSocketId = [...this.socketUserMap.entries()]
                .find(([_, uid]) => uid === receiverId)?.[0];

            if (receiverSocketId) {
                this.server.to(receiverSocketId).emit("receiveMessage", message);
                console.log(`📤 Message sent to receiver | socketId: ${receiverSocketId}`);
            } else {
                console.warn("⚠️ Receiver is not connected");
            }

        } catch (error) {
            console.error("❌ Error sending message:", error.message);
        }
    }
}





// {
//     "pickupLocation": {
//         "lat": 12.9720,
//             "lng": 77.5950
//     },
//     "dropLocation": {
//         "lat": 12.9260,
//             "lng": 77.6762
//     },
//     "rideDate": "2025-07-22T10:00:00.000Z"
// }
