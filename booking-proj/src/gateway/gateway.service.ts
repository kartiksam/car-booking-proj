import { forwardRef, Inject } from "@nestjs/common";
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "http";
import { Socket } from "socket.io";
import { BookingService } from "src/booking/booking.service";

@WebSocketGateway({
    cors: {
        origin: '*',
    }
})
export class BookingGateway implements OnGatewayConnection, OnGatewayDisconnect {

    // constructor(private readonly bookingService: BookingService) { }
    constructor(
        @Inject(forwardRef(() => BookingService))
        private readonly bookingService: BookingService
    ) { }
    @WebSocketServer()
    server: Server

    private clients: Map<String, Socket> = new Map();


    handleConnection(client: Socket) {
        const rawUserId = client.handshake.query.userId;
        const userId = Array.isArray(rawUserId) ? rawUserId[0] : rawUserId;
        if (typeof userId === 'string') {
            this.clients.set(userId, client);
            console.log('Client connected:', userId);

        }

    }


    handleDisconnect(client: Socket) {
        // convert into array for easy searching
        const userId = [...this.clients.entries()]
            .find(([__, socket]) => socket.id === client.id)?.[0];;

        if (userId) {
            this.clients.delete(userId);
            console.log('Client disconnected:', userId);
        }

    }

    emitBookingToDriver(driverId: string, bookingData: any) {

        const socket = this.clients.get(driverId);
        if (socket) {
            socket.emit('booking', bookingData);
            console.log('Booking data sent to driver:', driverId, bookingData);
        } else {
            console.log('No socket found for driver:', driverId);
        }


    }


    @SubscribeMessage('acceptBooking')
    async handleAcceptMessage(@MessageBody() data: any) {
        const { bookingId, userId } = data;
        // const updated = await this.bookingService.acceptBooking(bookingId, userId);


    }


















}